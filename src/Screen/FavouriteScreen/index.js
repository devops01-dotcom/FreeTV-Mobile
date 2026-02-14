import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import Header from '../../Component/Header';
import CustomDrawerContent from '../../Component/DrawerScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CategoriesSelector, fetchFavLiveTvCategories, fetchFilterChannels, fetchLiveTvCategories } from '../../redux/slice/liveTvCategories';
import { AddlaunchSelector, fetchAddlaunch } from '../../redux/slice/addlaunch';
import CarouselView from '../../Component/Carousel';
import FastImage from 'react-native-fast-image';
import ChannelList from '../../Component/ChannelList';
import { fetchCinema, fetchCinemaCategories, MoviesSelector } from '../../redux/slice/moviesSlice';
import { DevotionalSelector, fetchDevotionalCategories, fetchDevotionallivecontent, fetchDevotionalSubCategories } from '../../redux/slice/devotionalSlice';
import commonStyle from '../../utils/commonStyle';
import { fetchMusic, fetchMusicCategories, MusicSelector } from '../../redux/slice/musicSlice';
import { EducationSelector, fetchEducationalCategories, fetchEducationalcontent, fetchEducationalSubCategories } from '../../redux/slice/educationSlice';
import Orientation from 'react-native-orientation-locker';
import { navigateTo } from '../../utils/navigateTo';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";
import BackHeader from '../../Component/BackHeader';
import { useFocusEffect } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';



const FavouriteScreen = ({ navigation }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const dispatch = useAppDispatch();
      const [loaded, setLoaded] = useState(false);
  const addLaunch = useAppSelector(AddlaunchSelector)?.data || [];
  const { filterData, data, FavChannelListData } = useAppSelector(CategoriesSelector) || []
  const { cinemaData } = useAppSelector(MoviesSelector) || []
  const { musicFilterData } = useAppSelector(MusicSelector) || []
  const { devotional } = useAppSelector(DevotionalSelector) || []
  const { educational } = useAppSelector(EducationSelector) || []
  const isNavigating = useRef(false);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const elevation = useSharedValue(10); // Floating effect

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
      shadowOffset: { width: rotateY.value * 1.5, height: rotateX.value * 1.5 },
      shadowOpacity: 0.5,
      shadowRadius: elevation.value,
    };
  });

  const onBackHandler = useCallback(() => {
    // navigation.navigate('Home');
     navigation.goBack()
  }, [])


  const handleGesture = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    rotateY.value = withSpring(-translationX / 15);
    rotateX.value = withSpring(translationY / 15);
    elevation.value = withSpring(20); // Increased elevation when moved
  };

  useEffect(() => {
    Orientation.lockToPortrait(); 

    return () => {
      Orientation.unlockAllOrientations(); 
    };
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchAddlaunch());
      dispatch(fetchFavLiveTvCategories())
    }, [navigation])
  );
  

  const showMoreHandler = () => {
    navigation.navigate('LiveTV', { url: FavChannelListData[0]?.cacheurl, selectedindex: 0, selectedType: 'Favourite' });

  }
  const onEducationHandler = (item, index) => {
    const filteredData = data.filter(item => item.name === 'Favourite');
    dispatch(fetchFilterChannels(filteredData[0]?.id))
    navigation.navigate('LiveTV', { url: item.cacheurl, selectedindex: index, selectedType: 'Favourite' });

  }

  // const renderLiveTV = useCallback(({ item, index }) => {
  //   return (
  //     // <GestureHandlerRootView>
  //     //   <PanGestureHandler onGestureEvent={handleGesture}>
  //     //     <Animated.View style={[styles.imageContainer, animatedStyle]}>
  //           <TouchableOpacity onPress={() => onEducationHandler(item, index)}>
  //             <FastImage
  //               source={{ uri: item.channel_image_url || item.channel_image }}
  //               style={styles.liveTvIcon}
  //               resizeMode={FastImage.resizeMode.cover}
  //             />
  //           </TouchableOpacity>
  //     //     </Animated.View>
  //     //   </PanGestureHandler>
  //     // </GestureHandlerRootView>

  //   )
  // })

    const renderLiveTV = useCallback(({ item, index }) => {
    const { channels, channel_image_url, channel_image, name } = item || {}
    return (
      <TouchableOpacity onPress={() => onEducationHandler(item, index)}>
        {channels ?
          <FastImage
            source={{
              uri: channels.channel_image || channels.channel_image_url,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.center}
            style={styles.liveTvIcon} />
          :
          <FastImage
            source={{
              uri: channel_image_url || channel_image,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.center}
            style={styles.liveTvIcon} />
        }
      </TouchableOpacity>
    )
  })

  return (
    <View style={styles.container}>
      <BackHeader onBackHandler={onBackHandler}  onlyBack={true}/>
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
                    <BannerAd
                        unitId={TestIds.BANNER}
                        size={BannerAdSize.BANNER}
                        onAdLoaded={() => {
                            setLoaded(true);
                        }}
                        onAdFailedToLoad={(e) => {
                            setLoaded(false);
                        }}
                    />
                </View>
                {/* {loaded && ( <View style={{ alignItems: 'center', marginVertical: 5 }}>
                              <BannerAd
                                unitId="/23338335975/FreeTVMob_Home_Banner"
                                size={BannerAdSize.BANNER}
                                onAdLoaded={() => {
                                  setLoaded(true);
                                }}
                                onAdFailedToLoad={(e) => {
                                  setLoaded(false);
                                }}
                              />
                              </View>)} */}

                {/* Keeps layout stable */}
                {!loaded && (
                    <CarouselView images={addLaunch} />
                )}

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        <View style={styles.liveTVCategoriesBox}>
          <View style={commonStyle.spaceRow}>
            <Text style={styles.categoriesText}>Live TV</Text>
            <TouchableOpacity style={styles.liveTvIconBox} onPress={showMoreHandler}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={FavChannelListData}
            horizontal
            contentContainerStyle={{ marginTop: 5 }}
            keyExtractor={(item, index) => `liveTV-${index.toString()}`}
            renderItem={renderLiveTV}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {showDrawer && <CustomDrawerContent setShowDrawer={setShowDrawer} />}
    </View>
  );
};

export default FavouriteScreen;
