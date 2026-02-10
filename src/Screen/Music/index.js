import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS } from '../../utils/color';
import FastImage from 'react-native-fast-image';
import Icon from '@react-native-vector-icons/ionicons';
import { clearMusicData, clearSearchMusicData, fetchMusic, fetchMusicCategories, fetchMusicLanguage, fetchMusicLanguageFilterData, fetchSearchMusic, MusicSelector } from '../../redux/slice/musicSlice';
import BackHeader from '../../Component/BackHeader';
import { setSelectedMusicCategoriesId } from '../../redux/slice/commonAction';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../../Component/SlideText';
import DeviceInfo from 'react-native-device-info';
import { IMAGES } from '../../assets';

const isTablet = DeviceInfo.isTablet();

const MusicScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectCategoriesIndex, setSelectCategoriesIndex] = useState(0)
    const [selectLanguage, setSelectLanguage] = useState(0)
    const [showCategories, setShowCategories] = useState(false)
    const dispatch = useAppDispatch()
    const { musicFilterData, musicData, searchMusicData, musicPage, musicNextPage, musicLanguageList, searchMusicPage } = useAppSelector(MusicSelector) || {}
    const [loading, setLoading] = useState(false);
    const languageData = [{ name: "All" }]
    const { selectedMusicCategoriesId } = useAppSelector((state) => state.commonReducer);
    const flatListRef = useRef(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    // const tvChannelLanguage = [...languageData, ...musicLanguageList]
    const tvChannelLanguage = [
        ...(languageData ?? []),
        ...(musicLanguageList ?? []),
    ];


    //  Keyboard Listener
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        setHasScrolled(false);
    }, [selectLanguage, selectCategoriesIndex]);

    useEffect(() => {
        dispatch(fetchMusicLanguage())
    }, [])


    useEffect(() => {
        if (search?.length >= 2) {
            const detail = {
                name: search,
                page: 1,
                id: selectedMusicCategoriesId
            }
            dispatch(fetchSearchMusic(detail))
        }
        else {
            dispatch(clearSearchMusicData())
        }
    }, [search])

    const openDrawer = useCallback(() => {
        setShowCategories(!showCategories)
    }, [showCategories])

    const onBackHandler = useCallback(() => {
        navigation.navigate('Home');
    }, [])

    const onMovieDetailHandler = useCallback((item) => {
        navigation.navigate('MovieDetail', { item });
    }, [])

    const onSelectCategories = useCallback((id, index) => {
        setSelectCategoriesIndex(index)
        setSelectLanguage(0)
        dispatch(clearMusicData())

        // navigation.navigate('MovieDetail');
        dispatch(setSelectedMusicCategoriesId(id))
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
        const detail = {
            id: id,
            page: 1
        }
        dispatch(fetchMusic(detail));
        setShowCategories(false)
    }, [])


    const loadMore = useCallback(() => {
        if (!hasScrolled || loading || !musicNextPage) return; // Only load if user scrolled
        setLoading(true);
        const detail = {
            id: selectedMusicCategoriesId,
            page: musicPage
        };
        dispatch(fetchMusic(detail)).finally(() => {
            setLoading(false);
        });
    }, [hasScrolled, loading, musicNextPage, selectedMusicCategoriesId, musicPage]);

    const loadSearchMore = () => {
        // const detail = {
        //     name: search,
        //     page: searchCinemaPage,
        //     cid: selectedCategoriesId,
        //     gid: selectedGenreId ? selectedGenreId : 0
        // }
        // dispatch(fetchSearchCinema(detail)).finally(() => {
        //     setLoading(false);
        // });
        const detail = {
            name: search,
            // page: searchMusicPage,
            // cid: selectedCategoriesId,
            page: searchMusicPage,
            id: selectedMusicCategoriesId
        }
        dispatch(fetchSearchMusic(detail))
    }

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator
            style={{ marginVertical: 20 }}
            size="large"
            color={COLORS.yellow} />;
    };


    const onLanguageHandler = useCallback((item, index) => {
        setShowCategories(false)
        setSelectLanguage(index)
        dispatch(clearMusicData())
        if (item.name === 'All') {
            if (selectedMusicCategoriesId) {
                const detail = {
                    id: selectedMusicCategoriesId,
                    page: 1
                };
                dispatch(fetchMusic(detail))
            }
            else {
                dispatch(fetchMusicCategories()).then((res) => {
                    const detail = {
                        id: res?.payload?.data?.results[0]?.id,
                        page: 1
                    };
                    dispatch(fetchMusic(detail))
                })
            }

        }
        else {
            if (selectedMusicCategoriesId) {
                const data = {
                    cid: selectedMusicCategoriesId,
                    lid: item.id
                }
                dispatch(fetchMusicLanguageFilterData(data))
            }
            else {
                dispatch(fetchMusicCategories()).then((res) => {
                    const data = {
                        cid: res?.payload?.data?.results[0]?.id,
                        lid: item.id
                    }
                    dispatch(fetchMusicLanguageFilterData(data))
                })
            }
        }
    }, [selectLanguage, selectedMusicCategoriesId])


    const renderLanguage = useCallback(({ item, index }) => {
        const activeIndex = selectLanguage === index
        return (
            <LinearGradient
                colors={[COLORS.lightPrimaryColor, COLORS.black]}
                start={{ x: 0, y: 1 }}
                end={{ x: 3, y: 0 }}
                style={styles.gradientBorder}
            >
                <TouchableOpacity
                    onPress={() => onLanguageHandler(item, index)}
                    style={[styles.languageBoxView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    <Text style={[styles.channelName, selectLanguage === index && { color: COLORS.black }]}>{item.name}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }, [selectLanguage])

    const renderCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image_url || item.content_image }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        )

    }, [])

    const renderSearchCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image_url || item.content_image }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        )

    }, [])

    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = selectCategoriesIndex === index
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSelectCategories(item.id, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    {/* <Text style={styles.categoriesName}>{item.name}</Text> */}
                    <SlidingText text={item.name} style={styles.categoriesName} />
                </View>
            </TouchableOpacity>
        )
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <BackHeader onBackHandler={onBackHandler}
                name={search}
                placeholder='Search'
                onChangeText={setSearch}
            />
            {search?.length >= 2 || keyboardVisible ?
                <View style={styles.searchModal}>
                    <FlatList
                        data={searchMusicData}
                        keyExtractor={(item, index) => `cinemaSearch-${index.toString()}`}
                        renderItem={renderSearchCinema}
                        numColumns={isTablet ? 3 : 2}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={styles.columnWrapper}
                        onEndReached={loadSearchMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
                :
                <>
                    <View style={styles.adBox}>
                        <View style={styles.videoBox}>
                            <FastImage
                                source={{ uri: 'https://media.istockphoto.com/id/2152960546/photo/young-woman-using-digital-tablet-at-home.jpg?s=1024x1024&w=is&k=20&c=27V7LRjvBh65_Zv0F5SNnHBh-_HAutLlkX-KXUgUmxk=' }}
                                style={styles.backgroundImage}
                            />
                        </View>
                    </View>


                    <View style={styles.mainBox}>

                        <View style={styles.languageBox}>
                            <TouchableOpacity style={styles.dropdownMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={showCategories ? COLORS.transparent : COLORS.white} /> */}
                                {showCategories ?
                                    <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
                                    : null}
                            </TouchableOpacity>
                            <FlatList
                                data={tvChannelLanguage}
                                horizontal
                                keyExtractor={(item, index) => `language-${index.toString()}`}
                                extraData={selectLanguage}
                                renderItem={renderLanguage}
                            />
                        </View>
                        {showCategories && <View style={styles.drawerMenu}>
                            <TouchableOpacity style={styles.dropdownCloseMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> */}
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
                            </TouchableOpacity>
                            <FlatList
                                data={musicData}
                                keyExtractor={(item, index) => `cinema-${index.toString()}`}
                                renderItem={renderCategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>}
                        <View style={styles.channelListView}>

                            <FlatList
                                ref={flatListRef}
                                data={musicFilterData}
                                keyExtractor={(item, index) => `cinema-${index.toString()}`}
                                renderItem={renderCinema}
                                numColumns={isTablet ? 3 : 2}
                                showsVerticalScrollIndicator={false}
                                columnWrapperStyle={styles.columnWrapper}
                                contentContainerStyle={{ paddingBottom: 80 }}
                                onScrollBeginDrag={() => setHasScrolled(true)} // Set true on user scroll
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                                style={{ marginBottom: isTablet ? 82 : 57 }}
                            />
                        </View>
                    </View>
                </>
            }
        </SafeAreaView>
    )
};


export default MusicScreen;
