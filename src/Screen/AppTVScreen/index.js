import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS } from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';
// import { clearCinemaData, clearSearchMoviesData, fetchCinema, fetchCinemaCategories, fetchGenreCategories, fetchSearchAppTv, MoviesSelector } from '../../redux/slice/moviesSlice';
import { useNavigation } from '@react-navigation/native';
import { clearGenreDetail, setSelectedCategoriesId } from '../../redux/slice/commonAction';
import BackHeader from '../../Component/BackHeader';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../../Component/SlideText';
import DeviceInfo from 'react-native-device-info';
import { AppTVSelector, clearAppTvData, clearSearchAppTvData, fetchAppTv, fetchSearchAppTv } from '../../redux/slice/appTvSlice';

const isTablet = DeviceInfo.isTablet();
const AppTVScreen = () => {
    const [search, setSearch] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState(0)
    const [selectCategoriesIndex, setSelectCategoriesIndex] = useState(0)
    const [showCategories, setShowCategories] = useState(false)
    const languageData = [{ name: "All" }]
    const dispatch = useAppDispatch()
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { AppTvDataFilter, AppTvData, searchAppTvData, appTvNextPage, appTvPage, appTvCount, searchAppTvPage, SearchAppTvCount, totalSearchAppTvCount, searchAppTvNextPage } = useAppSelector(AppTVSelector)
    const { selectedCategoriesId, searchQuery, selectedGenreId } = useAppSelector((state) => state.commonReducer);
    const flatListRef = useRef(null);
    // const combinegenreCategories = [...languageData, ...genreCategories]
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        setHasScrolled(false);
    }, [selectLanguage, selectCategoriesIndex]);

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
        if (search?.length >= 3) {
            const detail = {
                name: searchQuery.trim(),
                page: 1,
                id: selectedCategoriesId
            }
            dispatch(fetchSearchAppTv(detail))
        }
        else {
            dispatch(clearSearchAppTvData())
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
        // dispatch(setSelectedCategoriesId(null))
        setSelectCategoriesIndex(index)
        setSelectLanguage(0)
        // dispatch(clearGenreDetail())
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }

        if (selectCategoriesIndex !== index) {
            dispatch(clearAppTvData());
            dispatch(setSelectedCategoriesId(id))
            const detail = {
                id: id,
                page: 1
            }
            dispatch(fetchAppTv(detail));
            setShowCategories(false)
        }
    }, [selectCategoriesIndex])

    // const loadMore = () => {
    //     if (loading || !appTvNextPage) return; // prevent multiple calls

    //     setLoading(true);

    //     const detail = {
    //         id: selectedCategoriesId,
    //         page: appTvPage
    //     };

    //     dispatch(fetchCinema(detail)).finally(() => {
    //         setLoading(false);
    //     });

    // };


    const loadMore = useCallback(() => {
        if (!hasScrolled || loading || !appTvNextPage) return;
        setLoading(true);
        const detail = {
            id: selectedCategoriesId,
            page: appTvPage
        };

        dispatch(fetchAppTv(detail)).finally(() => {
            setLoading(false);
            setHasScrolled(false); // ✅ Reset scroll trigger after API call
        });
    }, [hasScrolled, loading, appTvNextPage, selectedCategoriesId, appTvPage]);

    const loadSearchMore = useCallback(() => {
        const detail = {
            name: searchQuery,
            page: searchAppTvPage,
            id: selectedCategoriesId
        }
        dispatch(fetchSearchAppTv(detail)).finally(() => {
            setLoading(false);
        });
    }, [])

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator
            style={{ marginVertical: 20 }}
            size="large"
            color={COLORS.yellow} />;
    };


    // const onLanguageHandler = useCallback((item, index) => {
    //     setShowCategories(false)
    //     setSelectLanguage(index)
    //     dispatch(clearCinemaData())
    //     if (item.name === 'All') {
    //         if (selectedCategoriesId) {
    //             const detail = {
    //                 id: selectedCategoriesId,
    //                 page: 1
    //             };
    //             dispatch(fetchCinema(detail))
    //         }
    //         else {
    //             dispatch(fetchCinemaCategories()).then((res) => {
    //                 const detail = {
    //                     id: res?.payload?.data?.results[0]?.id,
    //                     page: 1
    //                 };
    //                 dispatch(fetchCinema(detail))
    //             })
    //         }
    //     }
    //     else {
    //         if (selectedCategoriesId) {
    //             const detail = {
    //                 cid: selectedCategoriesId,
    //                 gid: item.id
    //             };
    //             dispatch(fetchGenreAppTvData(detail))
    //         }
    //         else {
    //             dispatch(fetchCinemaCategories()).then((res) => {
    //                 const detail = {
    //                     cid: res?.payload?.data?.results[0]?.id,
    //                     gid: item.id
    //                 };
    //                 dispatch(fetchGenreAppTvData(detail))
    //             })
    //         }

    //     }
    // }, [selectLanguage, selectedCategoriesId])


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
                    <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]}>{item.name}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }, [selectLanguage])

    const renderCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.channel_image_url || item.channel_image }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        )

    }, [])

    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = selectCategoriesIndex === index
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSelectCategories(item.id, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    {/* <Text style={styles.categoriesName} numberOfLines={1}>{item.name}</Text> */}
                    <SlidingText text={item.name} style={styles.categoriesName} />

                </View>
            </TouchableOpacity>
        )
    }, [selectCategoriesIndex])

    const renderSearchCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
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
                        data={searchAppTvData}
                        keyExtractor={(item, index) => `apptvSearch-${index.toString()}`}
                        renderItem={renderSearchCinema}
                        numColumns={isTablet ? 3 : 2}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadSearchMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
                :
                <>
                    <View style={styles.adBox}>
                            <FastImage
                                source={{ uri: 'https://media.istockphoto.com/id/2152960546/photo/young-woman-using-digital-tablet-at-home.jpg?s=1024x1024&w=is&k=20&c=27V7LRjvBh65_Zv0F5SNnHBh-_HAutLlkX-KXUgUmxk=' }}
                                style={styles.backgroundImage}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                    </View>
                    <View style={styles.mainBox}>

                        <View style={styles.languageBox}>
                            <TouchableOpacity style={styles.dropdownMenu}
                                onPress={openDrawer}>
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar}/>
                            </TouchableOpacity>
                            {/* <FlatList
                                data={combinegenreCategories}
                                horizontal
                                keyExtractor={(item, index) => `language-${index.toString()}`}
                                renderItem={renderLanguage}
                                showsHorizontalScrollIndicator={false}
                            /> */}
                        </View>
                        {showCategories && <View style={styles.drawerMenu}>
                            <TouchableOpacity style={styles.dropdownCloseMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> */}
                                <FastImage source={IMAGES.menu}  resizeMode={FastImage.resizeMode.contain} style={styles.menubar}/>
                            </TouchableOpacity>
                            <FlatList
                                data={AppTvData}
                                keyExtractor={(item, index) => `apptvcat-${index.toString()}`}
                                renderItem={renderCategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>}
                        <View style={styles.channelListView}>

                            <FlatList
                                ref={flatListRef}
                                data={AppTvDataFilter}
                                keyExtractor={(item, index) => `appTv-${index.toString()}`}
                                renderItem={renderCinema}
                                numColumns={isTablet ? 4 : 3}
                                showsVerticalScrollIndicator={false}
                                columnWrapperStyle={styles.columnWrapper}
                                style={{ marginBottom: isTablet ? 82 : 57}}
                                ListFooterComponent={renderFooter}
                                onScrollBeginDrag={() => setHasScrolled(true)} // Set true on user scroll
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                    </View>
                </>
            }
        </SafeAreaView>
    )
};


export default AppTVScreen;

