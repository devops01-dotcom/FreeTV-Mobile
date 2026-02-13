import React, { useState, useCallback, memo, useEffect } from 'react';
import { View, SectionList, FlatList, TouchableOpacity, BackHandler, Alert, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CarouselView from '../../Component/Carousel';
import FastImage from 'react-native-fast-image';
import ChannelList from '../../Component/ChannelList';
import Header from '../../Component/Header';
import CustomDrawerContent from '../../Component/DrawerScreen';
import styles from './styles';
import useHomeData from '../../Hooks/useHomeData';
import Section from '../../Component/Section';
import { CategoriesSelector } from '../../redux/slice/liveTvCategories';
import { MoviesSelector } from '../../redux/slice/moviesSlice';
import { MusicSelector } from '../../redux/slice/musicSlice';
import { DevotionalSelector } from '../../redux/slice/devotionalSlice';
import { EducationSelector } from '../../redux/slice/educationSlice';
import { AddlaunchSelector } from '../../redux/slice/addlaunch';
import { setShowHomeAds } from '../../redux/slice/commonAction';
import { useFocusEffect } from '@react-navigation/native';
import { BootupAdViewSelector } from '../../redux/slice/bootupadview';
import { HEIGHT } from '../../utils/dimension';
import CustomAlert from '../../Component/CustomAlert';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppTVSelector } from '../../redux/slice/appTvSlice';
const BootupAds = React.lazy(() => import('../../Component/bootupAd'));

const HomeScreen = ({ navigation }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [progressing, setProgressing] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch()

  useHomeData();
  const { bootupData } = useAppSelector(BootupAdViewSelector);
  const { allChannelList } = useAppSelector(CategoriesSelector) || [];
  const { cinemaData, movieData } = useAppSelector(MoviesSelector) || [];
  const { musicFilterData } = useAppSelector(MusicSelector) || [];
  const { devotional } = useAppSelector(DevotionalSelector) || [];
  const { educational } = useAppSelector(EducationSelector) || [];
  const addLaunch = useAppSelector(AddlaunchSelector)?.data || [];
  const { AppTvDataFilter, AppTvData, } = useAppSelector(AppTVSelector) || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressing(false)
      dispatch(setShowHomeAds(false))
    }, 30000,);
    return () => clearTimeout(timer); // cleanup timer
  }, [bootupData]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Hold on!',
          'Are you sure you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [])
  );

  const onLiveTvHandler = useCallback(
    (item, index) => {
      if (progressing) return setShowAlert(true)
      else navigation.navigate('LiveTV', { url: item?.cacheurl, selectedindex: index });
    }, [progressing]
  );

  const navigateToScreen = useCallback(
    (screenName) => {
      if (progressing) return setShowAlert(true)
      else navigation.navigate(screenName);
    }, [progressing]
  );

  const renderLiveTV = useCallback(
    ({ item, index }) => {
      const { channels, channel_image_url, channel_image } = item || {};
      const imageUrl =
        channels?.channel_image ||
        channels?.channel_image_url ||
        channel_image_url ||
        channel_image;

      return (
        <TouchableOpacity
          onPress={() => onLiveTvHandler(item, index)}
          activeOpacity={0.8}
          delayPressIn={50}
        >
          <FastImage
            source={{ uri: imageUrl, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.liveTvIcon}
          />
        </TouchableOpacity>
      );
    },
    [onLiveTvHandler]
  );

  const sections = [
    { title: 'Live TV', data: allChannelList?.slice(0, 20) || [], type: 'LiveTVScreen' },
    { title: 'App TV', data: AppTvDataFilter?.slice(0, 20) || [], type: 'AppTVScreen' },
    { title: 'FreeTV Cinema', data: cinemaData?.slice(0, 20) || [], type: 'CinemaScreen' },
    { title: 'FreeTV Movie', data: movieData?.slice(0, 20) || [], type: 'MovieScreen' },
    { title: 'FreeTv Series', data: movieData?.slice(0, 20) || [], type: 'SeriesScreen' },
    { title: 'FreeTV Music', data: musicFilterData?.slice(0, 20) || [], type: 'MusicScreen' },
    { title: 'Devotional', data: devotional?.slice(0, 20) || [], type: 'DevotionalScreen' },
    { title: 'Education', data: educational?.slice(0, 20) || [], type: 'EducationScreen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {!showDrawer && <Header setShowDrawer={setShowDrawer} showHeader={progressing} setShowAlert={setShowAlert} />}

      {showDrawer ? (
        <CustomDrawerContent setShowDrawer={setShowDrawer} />
      ) : (
        <SectionList
          sections={sections}
          // keyExtractor={(item, index) => item.id || index.toString()}
          keyExtractor={(item, index) => `section-item-${index}`}
          renderItem={() => null} // ignore vertical renderItem
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={
            (progressing && bootupData?.ad_url) ?
              <View style={{ height: HEIGHT.h25, marginBottom: 20 }}>
                <BootupAds setProgressing={setProgressing} bootupData={bootupData} />
              </View>
              :
              <View style={{ marginBottom: 20 }}>
                <CarouselView images={addLaunch} />
              </View>
          }
          contentContainerStyle={{ paddingBottom: 10 }}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionContainer}>
              <Section
                title={section.title}
                onPress={() => navigateToScreen(section.type)}
              />
              <FlatList
                data={section.data}
                horizontal
                renderItem={({ item, index }) =>
                  section.type === 'LiveTVScreen' || section.type === 'AppTVScreen' ? (
                    renderLiveTV({ item, index })
                  ) : (
                    <ChannelList data={[item]} type={section.type} progressing={progressing} setShowAlert={setShowAlert} />
                  )
                }
                keyExtractor={(item, index) => `${section.type}-${index}`}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                windowSize={5}
              />
            </View>
          )}
        />
      )}
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </SafeAreaView>
  );
};

export default memo(HomeScreen);
