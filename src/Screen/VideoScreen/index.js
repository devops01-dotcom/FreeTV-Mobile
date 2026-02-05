import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import Orientation, {LANDSCAPE} from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {useAppSelector} from '../../redux/hooks';
import {CategoriesSelector} from '../../redux/slice/liveTvCategories';
import FastImage from 'react-native-fast-image';

const VideoScreen = ({route, navigation}) => {
  const propsUrl = route?.params?.url;
  const [focusVideo, setFocusVideo] = useState(propsUrl);
  const [showList, setShowList] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const {filterData} = useAppSelector(CategoriesSelector);

  useEffect(() => {
    Orientation.lockToLandscape();
    const backAction = () => {
      navigation.goBack(); // Navigate back immediately
      return true; // Prevent the default back action (white screen)
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    // Clean up on unmount
    return () => {
      Orientation.lockToPortrait();
      // Orientation.unlockAllOrientations();
      backHandler.remove();
    };
  }, [navigation]);

  const onVideoTouch = () => {
    setShowList(prev => !prev);
  };

  const onChannelVideoHandler = useCallback(
    (item, index) => {
      setFocusVideo(item.cacheurl);
    },
    [focusVideo],
  );

  useEffect(() => {
    // setPaused(isPlaying)
    setErrorMessage('jjnvd');
  }, [focusVideo]);

  const renderChannel = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onChannelVideoHandler(item)}
        style={styles.channelBoxView}>
        <FastImage
          source={{uri: item.channel_image_url}}
          style={styles.channelIcon}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.channelName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);


  return (
    <TouchableWithoutFeedback onPress={onVideoTouch}>
      <View style={styles.container}>
        {errorMessage ? (
          <View style={styles.videoErrorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.videoContainer}>
            <Video
              source={{uri: focusVideo}}
              controls
              style={styles.video}
              fullscreenOrientation={LANDSCAPE}
              hideShutterView={true}
              onError={error => {
                setErrorMessage(
                  'Sorry for the interruption.. Channel will resume shortly.',
                );
              }}
              fullscreen={LANDSCAPE}
            />
          </View>
        )}
        {showList && (
          <View style={styles.listContainer}>
            <FlatList
              data={filterData}
              keyExtractor={(item, index) =>
                `VideochannelList-${index.toString()}`
              }
              renderItem={renderChannel}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoScreen;
