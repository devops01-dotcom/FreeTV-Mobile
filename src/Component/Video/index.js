import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, TouchableH, TouchableHighlight } from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import withVideoControls from '../HOC/withVideoControls';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   useAnimatedGestureHandler,
//   runOnJS,
// } from 'react-native-reanimated';
// import { PanGestureHandler } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, runOnJS } from 'react-native-reanimated';

const isTablet = DeviceInfo.isTablet();

const VideoPlayer = React.memo(
  ({
    isPlaying = false,
    channel_url = '',
    showList,
    showZoom,
    onNext,
    onPrevious,
    scale,
    setShowList,
    setShowZoom,
  }) => {
    const videoContainerRef = useRef(null);
    // const [errorMessage, setErrorMessage] = useState(null);
    const [orientation, setOrientation] = useState('portrait');
    const [landScape, setLandScape] = useState(false);
    const [showForwordView, setShowForwordView] = useState(true);

    DeviceInfo.isLandscape().then((isLandscape) => {
      setLandScape(isLandscape)
    });



    useEffect(() => {
      setShowForwordView(true)
      setShowList(true)
      setShowZoom(true)
      const timer = setTimeout(() => {
        setShowForwordView(false);
      }, 8000);

      // ✅ Clear timeout on component unmount
      return () => clearTimeout(timer);
    }, [orientation])


    // useEffect(() => {
    //   if (errorMessage && errorMessage.includes("Channel will resume")) {
    //     const retry = setTimeout(() => {
    //       setErrorMessage(null);
    //       videoContainerRef.current?.seek?.(0); // Retry
    //     }, 5000);

    //     return () => clearTimeout(retry);
    //   }
    // }, [errorMessage]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const panGesture = Gesture.Pan()
      .onEnd((event) => {
        if (event.translationX < -50) {
          runOnJS(onNext)(); // Swipe Left -> Next
        } else if (event.translationX > 50) {
          runOnJS(onPrevious)(); // Swipe Right -> Previous
        }
      });

    useEffect(() => {
      // setErrorMessage(null);
      if (videoContainerRef.current) {
        videoContainerRef.current.seek?.(0); // Restart from beginning
      }
    }, [channel_url, onNext, onPrevious]);

    useEffect(() => {
      const updateOrientation = () => {
        const { width, height } = Dimensions.get('window');
        setOrientation(width > height ? 'landscape' : 'portrait');
      };

      updateOrientation();
      const subscription = Dimensions.addEventListener('change', updateOrientation);
      return () => subscription.remove();
    }, []);


    const togglePlayPause = () => {
      // setIsPlaying(prev => !prev);
      setShowList(!showList)
      setShowZoom(!showZoom)
    };

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     // setShowPause(false);
    //   }, 3000);
    //   return () => clearTimeout(timeout);
    // }, [showPaused, isPlaying]);

    return (
      <View style={styles.videoContainer}>
        {/* {errorMessage ? (
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[styles.videoErrorContainer, animatedStyle]}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </Animated.View>
          </PanGestureHandler>

        ) : (
          <> */}
        {/* <PanGestureHandler onGestureEvent={panGesture}> */}
          <GestureDetector gesture={panGesture}>
          <Animated.View style={[orientation !== 'portrait' ? styles.backgroundVideoView : styles.backgroundVideo, animatedStyle]}>
            <TouchableHighlight onPress={togglePlayPause}>
              <Video
                ref={videoContainerRef}
                key={channel_url}
                source={{ uri: channel_url }}
                paused={isPlaying}
                resizeMode={(isTablet && orientation !== 'portrait') ? 'contain' : 'stretch'}
                // resizeMode={'contain'}
                controls={false}
                // style={{ aspectRatio: 16 / 9 }}
                style={{
                  width: '100%',
                  height: '100%',
                  // aspectRatio: 16 / 9, // optional if full screen
                }}


                onError={(error) => {
                  if (
                    error?.error?.errorString?.includes("BehindLiveWindowException") &&
                    videoContainerRef.current
                  ) {
                    // Try to jump to live window
                    videoContainerRef.current.seek?.(0); // Reset position (can also try seek to undefined)
                  }
                  // setErrorMessage("Sorry for the interruption.. Channel will resume shortly.");
                }}
                live={false}
                useTextureView={false}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000
                }}
                fullscreenOrientation='landscape'
              />
            </TouchableHighlight>
          </Animated.View>
        {/* </PanGestureHandler> */}
        </GestureDetector>
        {showForwordView && <View style={styles.playPauseButton}>
          <TouchableOpacity onPress={onPrevious}>
            <FastImage source={IMAGES.backword} style={{ height: '90%', width: 40 }} resizeMode={FastImage.resizeMode.contain} />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <FastImage source={IMAGES.fastForword} style={{ height: '90%', width: 40 }} resizeMode={FastImage.resizeMode.contain} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <FastImage source={IMAGES.forword} style={{ height: '90%', width: 40 }} resizeMode={FastImage.resizeMode.contain} />
          </TouchableOpacity>
        </View>}
        {/* </>
        )} */}
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.channel_url === nextProps.channel_url &&
    prevProps.resizeMode === nextProps.resizeMode &&
    prevProps.showPaused === nextProps.showPaused &&
    prevProps.showList === nextProps.showList &&
    prevProps.showZoom === nextProps.showZoom,

);

export default withVideoControls(VideoPlayer);
