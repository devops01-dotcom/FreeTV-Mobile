import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { FlatList, StatusBar, Text, Image, TouchableOpacity, View, Keyboard, SafeAreaView } from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    CategoriesSelector,
    fetchAddToFavourite,
    fetchDeleteToFavourite,
    fetchFavLiveTvCategories,
    fetchFilterChannels,
    fetchGetLiveTVLanguage,
    fetchGetLiveTVLanguageList,
    fetchLiveTVChannelSearch
} from '../../redux/slice/liveTvCategories';
import DrawerList from '../../mockData/drawerName';
import { COLORS } from '../../utils/color';
import commonStyle from '../../utils/commonStyle';
import FastImage from 'react-native-fast-image';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useOrientation } from '../../utils/useOrientation';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from '../../Component/Video'
import BackHeader from '../../Component/BackHeader';
import { IMAGES } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../../Component/SlideText';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {MaterialIcons} from '@react-native-vector-icons/codemod'
// import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import DeviceInfo from 'react-native-device-info';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import { fetchWatchVideoView } from '../../redux/slice/watchVideo';
import BigList from "react-native-big-list";
import { ResizeMode } from 'react-native-video';

const isTablet = DeviceInfo.isTablet();

const LiveTVScreen = ({ route }) => {
    const [search, setSearch] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState(0);
    const [selectCategories, setSelectCategories] = useState(0);
    const [selectChannelIndex, setSelectChennelIndex] = useState(0);
    const [showList, setShowList] = useState(false);
    const [focusVideo, setFocusVideo] = useState('');
    const [selectedItem, setSelectedItem] = useState();
    const [selectedTabName, setSelectedTabName] = useState('');
    const [mergeListData, setMergeListData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showZoom, setShowZoom] = useState(true);
    const [favChannel, setFavChannel] = useState([]);
    const [showAddfav, setShowAddFav] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const timerRef = useRef(null);
    const bigListRef = useRef(null);
    const languageData = [{ name: "All" }];
    const scale = useSharedValue(1);

    const dispatch = useAppDispatch();
    const { data, allChannelList, liveTVlanguage, FavChannelListData } = useAppSelector(CategoriesSelector);
    const { userid } = useAppSelector(ProfileSelector).userProfile || {};
    const navigation = useNavigation();
    const orientation = useOrientation();

    const tvChannelLanguage = useMemo(() => [...languageData, ...liveTVlanguage], [liveTVlanguage]);


    useEffect(()=> {
   scale.value = 1;
    }, [orientation])

  useEffect(() => {
    if (bigListRef.current && selectChannelIndex >= 0) {
      bigListRef.current.scrollToIndex({
        index: selectChannelIndex,
        animated: true,
        viewPosition: 0.5, // 👈 item hamesha center me aayega
      });
    }
  }, [selectChannelIndex, showList]);

    /** 🔹 Keyboard listener */
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    /** 🔹 Reset on focus */
    useFocusEffect(
        useCallback(() => {
            setSelectedTabName('');
            setIsPlaying(false);
            return () => {
                setIsPlaying(true);
                setSelectCategories(0);
            };
        }, [])
    );

    /** 🔹 Initial data load */
    useEffect(() => {
        dispatch(fetchGetLiveTVLanguage());

        if (route.params) {
            if (route?.params?.selectedType) {
                const index = data.findIndex(item => item.name === 'Favourite');
                setSelectCategories(index);
                setSelectedTabName('Favourite');
                setFocusVideo(route?.params?.url);
                setSelectedItem(allChannelList[0]);
            } else {
                setFocusVideo(route?.params?.url);
                setSelectedItem(allChannelList[0]);
                setSelectChennelIndex(route?.params?.selectedindex);
            }
        } else {
            setFocusVideo(allChannelList[0]?.cacheurl);
            setSelectedItem(allChannelList[0]);
        }
    }, [route]);

    /** 🔹 Orientation handling */
    useFocusEffect(
        useCallback(() => {
            Orientation.unlockAllOrientations();
            return () => Orientation.lockToPortrait();
        }, [])
    );

    /** 🔹 Merge list based on tab */
    useFocusEffect(
        useCallback(() => {
            setMergeListData(selectedTabName === 'Favourite' ? FavChannelListData : allChannelList);
        }, [allChannelList, FavChannelListData, selectedTabName])
    );

    /** 🔹 Language selection */
    const selectLanguageHandler = useCallback((item, index) => {
        if (item.name === "All") {
            const detail = { id: data[0]?.id, page: 1 };
            dispatch(fetchFilterChannels(detail));
        } else {
            dispatch(fetchGetLiveTVLanguageList(item.id));
        }
        setSelectLanguage(index);
        setSearch('');
    }, [data]);

    /** 🔹 Favourite update when focusVideo changes */
    useEffect(() => {
        setShowAddFav(false);
        const filtered = mergeListData.filter(item => item.cacheurl === focusVideo);
        setFavChannel(filtered);
    }, [focusVideo, showAddfav, mergeListData]);

    /** 🔹 Video handlers */
    const onVideoTouch = useCallback(() => {
        setShowList(prev => !prev);
        setShowZoom(true);
    }, []);

    const onChannelFullScreebVideoHandler = useCallback((item, index) => {
        setFocusVideo(item.cacheurl);
        setSelectedItem(item);
        setShowList(false);
        setSelectChennelIndex(index);
    }, []);

    const onChannelVideoHandler = useCallback((item, index) => {
        setFocusVideo(item.cacheurl);
        setSelectedItem(item);
        setSelectChennelIndex(index);
    }, []);

    const onBackHandler = useCallback(() => navigation.goBack(), [navigation]);

    const zoomIn = () => { scale.value = withTiming(Math.min(scale.value + 0.2, 3)); };
    const zoomOut = () => { scale.value = withTiming(Math.max(scale.value - 0.2, 1)); };

    const onSelectCategoriesHandler = useCallback((item, index) => {
        setSelectCategories(index);
        setSelectedTabName(item.name);
        setSearch('');
        if (item.name === 'Favourite') {
            dispatch(fetchFavLiveTvCategories()).then(res => {
                if (res.payload?.data?.results) setMergeListData(res.payload.data.results);
            });
        } else {
            const detail = { id: item.id, page: 1 };
            dispatch(fetchFilterChannels(detail)).then(res => {
                if (res.payload?.data?.results) setMergeListData(res.payload.data.results);
            });
        }
    }, [dispatch]);

    /** 🔹 Search */
    useEffect(() => {
        if (search?.length > 1) {
            dispatch(fetchLiveTVChannelSearch(search));
        } else {
            if (route?.params?.selectedType) {
                const filteredData = data.filter(item => item.name === 'Favourite');
                const detail = { id: filteredData[0]?.id, page: 1 };
                dispatch(fetchFilterChannels(detail));
            } else {
                if(data?.length > 0) {
                const detail = { id: data[0]?.id, page: 1 };
                dispatch(fetchFilterChannels(detail));
                }
            }
        }
    }, [search, route, data, dispatch]);

    /** 🔹 Track video views */
    useEffect(() => {
        if (!selectedItem) return;
        const timeoutId = setTimeout(() => {
            dispatch(fetchWatchVideoView({ user: userid, live_channels: selectedItem?.id }));
        }, 60000);
        return () => clearTimeout(timeoutId);
    }, [selectedItem, userid, dispatch]);

    /** 🔹 Next/Prev */
    const onNextHandler = useCallback(() => {
        const ind = allChannelList.findIndex(x => x.cacheurl?.trim() === focusVideo?.trim());
        if (allChannelList?.length === 0) return;
        const nextIndex = ind === -1 || ind === allChannelList?.length - 1 ? 0 : ind + 1;
        const nextVideo = allChannelList[nextIndex];
        setFocusVideo(nextVideo.cacheurl);
        setSelectedItem(nextVideo);
    }, [allChannelList, focusVideo]);

    const onPreviousHandler = useCallback(() => {
        const ind = allChannelList.findIndex(x => x.cacheurl?.trim() === focusVideo?.trim());
        if (allChannelList?.length === 0) return;
        const prevIndex = ind <= 0 ? allChannelList?.length - 1 : ind - 1;
        const prevVideo = allChannelList[prevIndex];
        setFocusVideo(prevVideo.cacheurl);
        setSelectedItem(prevVideo);
    }, [allChannelList, focusVideo]);

    /** 🔹 Add/Remove Favourite */
    const addToFavourite = useCallback((item) => {
        if (!item) return;
        const data = { live_channels: item?.id };
        const isFav = item?.is_fav;
        const action = (selectedTabName === 'Favourite' || isFav) ? fetchDeleteToFavourite : fetchAddToFavourite;
        dispatch(action(data)).then(() => setShowAddFav(true));

        setMergeListData(prevList => (
            selectedTabName === 'Favourite'
                ? prevList.filter(channel => channel.id !== item.id)
                : prevList.map(channel =>
                    channel?.id === item?.id ? { ...channel, is_fav: !isFav } : channel
                )
        ));

        setFavChannel(prevList => {
            const exists = prevList.some(channel => channel.id === item.id);
            return exists
                ? prevList.filter(channel => channel.id !== item.id)
                : [...prevList, { ...item, is_fav: true }];
        });
    }, [selectedTabName, dispatch]);

    /** 🔹 Auto hide list + zoom */
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (!isScrolling) {
                setShowList(false);
                setShowZoom(false);
            }
        }, 10000);
    }, [isScrolling]);

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [resetTimer]);

    const handleScrollBegin = useCallback(() => {
        setIsScrolling(true);
        setShowList(true);
        resetTimer();
    }, [resetTimer]);

    const handleScrollEnd = useCallback(() => {
        setIsScrolling(false);
        resetTimer();
    }, [resetTimer]);

    /** 🔹 Render items */
    const renderChannelFullScreen = useCallback(({ item, index }) => {
        const activeIndex = selectChannelIndex === index;
        const { channels, channel_image_url, channel_image, name } = item || {};
        return (
            <TouchableOpacity
                onPress={() => onChannelFullScreebVideoHandler(item, index)}
                style={[styles.channelBoxViewFullScreen, activeIndex && { backgroundColor: COLORS.yellow }]}>
                <View style={styles.channelIcon}>
                    <FastImage
                        source={{
                            uri: channels?.channel_image || channels?.channel_image_url || channel_image_url || channel_image,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.center}
                        style={styles.channelLogoIcon}
                    />
                </View>
                <Text style={[styles.channelName, { width: '57%' }, activeIndex && { color: COLORS.black }]}>{name || channels?.name}</Text>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    {item?.is_fav && <Image source={IMAGES.activeFavouriteIcon} style={{ height: 15, width: 15 }} />}
                </View>
            </TouchableOpacity>
        );
    }, [selectChannelIndex]);

    const renderLanguage = useCallback(({ item, index }) => {
        const activeIndex = selectLanguage === index;
        return (
            <LinearGradient
                colors={[COLORS.lightPrimaryColor, COLORS.black]}
                start={{ x: 0, y: 1 }}
                end={{ x: 3, y: 0 }}
                style={styles.gradientBorder}>
                <TouchableOpacity
                    onPress={() => selectLanguageHandler(item, index)}
                    style={[styles.languageBoxView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]}>{item.name}</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }, [selectLanguage, selectLanguageHandler]);

    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = selectCategories === index;
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSelectCategoriesHandler(item, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    <SlidingText text={item.name} style={styles.categoriesName} />
                </View>
            </TouchableOpacity>
        );
    }, [selectCategories, onSelectCategoriesHandler]);

    const renderChannel = useCallback(({ item, index }) => {
        const activeIndex = selectChannelIndex === index;
        const isLastItem = index === DrawerList?.length - 1;
        const { channels, channel_image_url, channel_image, name } = item || {};
        return (
            <TouchableOpacity
                onPress={() => onChannelVideoHandler(item, index)}
                style={[
                    styles.channelBoxView,
                    activeIndex && { backgroundColor: COLORS.yellow },
                    isLastItem && { borderBottomWidth: 2, borderBottomColor: COLORS.borderColor }
                ]}>
                <View style={styles.row}>
                    <View style={styles.channelIcon}>
                        <FastImage
                            source={{
                                uri: channels?.channel_image || channels?.channel_image_url || channel_image_url || channel_image,
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable,
                            }}
                            resizeMode={FastImage.resizeMode.center}
                            style={styles.channelLogoIcon}
                        />
                    </View>
                    <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]} numberOfLines={1}>{name || channels?.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }, [selectChannelIndex, onChannelVideoHandler]);

    /** 🔹 UI */
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={orientation === 'landscape'} />

            {orientation !== 'landscape' && (
                <BackHeader
                    onBackHandler={onBackHandler}
                    name={search}
                    placeholder='Search'
                    onChangeText={setSearch}
                />
            )}

            {!keyboardVisible && (
                <View style={orientation === 'landscape' ? styles.fullvideoBox : styles.videoBox}>
                    <View style={orientation === 'landscape' && styles.videoContainer}>
                        <View style={[styles.videoView, orientation === 'landscape' && styles.landscapeVideoBoxView]}>
                            {focusVideo && (
                                <View style={styles.landScapeVideoView}>
                                    <VideoPlayer
                                        channel_url={focusVideo}
                                        isPlaying={isPlaying}
                                        setIsPlaying={setIsPlaying}
                                        onNext={onNextHandler}
                                        onPrevious={onPreviousHandler}
                                        scale={scale}
                                        setShowList={setShowList}
                                        setShowZoom={setShowZoom}
                                        showList={showList}
                                        showZoom={showZoom}
                                    />
                                </View>
                            )}
                        </View>

                        {orientation === 'landscape' && (
                            <TouchableOpacity style={[styles.listContainer, { backgroundColor: COLORS.transparent }]} onPress={onVideoTouch} />
                        )}

                        {(showList && orientation === 'landscape') && (
                            <View style={styles.listContainer}>
                                <BigList
                                    ref={bigListRef}
                                    keyExtractor={(item) => `VideochannelList-${item.id}`}
                                    data={mergeListData}
                                    onScroll={resetTimer}
                                    renderItem={renderChannelFullScreen}
                                    itemHeight={isTablet ? 78 : 55}
                                />
                            </View>
                        )}
                    </View>

                    {(orientation === 'landscape' && showZoom) && (
                        <View style={{ position: 'absolute', bottom: 60, left: 20 }}>
                            <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                                {/* <Icon name="zoom-in" size={isTablet ? 50 : 30} color="#fff" /> */}
                                <Image source={IMAGES.zoomin} style={{height: isTablet ? 50 : 30}} resizeMode={FastImage.resizeMode.contain} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                                {/* <Icon name="zoom-out" size={isTablet ? 50 : 30} color="#fff" /> */}
                                <Image source={IMAGES.zoomout} style={{height: isTablet ? 50 : 30}} resizeMode={FastImage.resizeMode.contain} />

                            </TouchableOpacity>
                        </View>
                    )}

                    {orientation !== 'landscape' ? (
                        favChannel[0] && (
                            <TouchableOpacity style={styles.addToFavBox} onPress={() => addToFavourite(favChannel[0])}>
                                <Image
                                    source={favChannel[0]?.is_fav ? IMAGES.activeFavouriteIcon : IMAGES.favouriteIcon}
                                    style={styles.favLogo}
                                />
                            </TouchableOpacity>
                        )
                    ) : (
                        !showList && favChannel[0] && (
                            <TouchableOpacity style={styles.addToFavLandScapeBox} onPress={() => addToFavourite(favChannel[0])}>
                                <Image
                                    source={favChannel[0]?.is_fav ? IMAGES.activeFavouriteIcon : IMAGES.favouriteIcon}
                                    style={styles.favLogo}
                                />
                            </TouchableOpacity>
                        )
                    )}
                </View>
            )}

            {orientation !== 'landscape' && (
                <View style={styles.languageBox}>
                    <FlatList
                        data={tvChannelLanguage}
                        horizontal
                        keyExtractor={(item, index) => `language-${index}`}
                        renderItem={renderLanguage}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            {orientation !== 'landscape' && (
                <View style={styles.channelListView}>
                    <View style={commonStyle.row}>
                        <View style={styles.channelCategoriesListBox}>
                            <FlatList
                                data={data}
                                keyExtractor={(item, index) => `categories-${index.toString()}`}
                                renderItem={renderCategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.channelListBox}>
                            <BigList
                                ref={bigListRef}
                                data={mergeListData}
                                keyExtractor={(item, index) => `channel-${index.toString()}`}
                                renderItem={renderChannel}
                                itemHeight={isTablet ? 63 : 45}
                                />
                        </View>
                    </View>
                </View>)}
        </SafeAreaView>
    )
};

export default LiveTVScreen;