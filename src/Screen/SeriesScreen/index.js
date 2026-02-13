// SeriesScreen

import React, { useCallback, useEffect, useState, useRef } from "react";
import { ActivityIndicator, Keyboard, View, TouchableOpacity, FlatList, Text } from 'react-native'
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../../Component/BackHeader";
import { clearSeriesData, clearSearchSeriesData, fetchFreeTvSeries, fetchFreeTvSeriesCategories, FreeTvSeriesSelector } from "../../redux/slice/freeTvSeriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DeviceInfo from "react-native-device-info";
import { COLORS } from "../../utils/color";
import { State } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { setSelectedCategoriesId } from "../../redux/slice/commonAction";
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets';


const isTablet = DeviceInfo.isTablet();

const SeriesScreen = () => {
    const [search, setSearch] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState(0);
    const [selectCategoriesIndex, setSelectCategoriesIndex] = useState(0);
    const [showCategories, setShowCategories] = useState(false);
    const { seriesData, searchSeriesData, SeriesNextPage, SeriesPage, FreeTvSeriesData } = useAppSelector(FreeTvSeriesSelector)
    const { selectedCategoriesId, selectedGenreId } = useAppSelector((State) => State.commonReducer);
    const languageData = [{ name: "All" }]
    const flatListRef = useRef(null);
    const dispatch = useAppDispatch()
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        dispatch(fetchFreeTvSeriesCategories()).then((res) => {
            dispatch(clearSeriesData())
            const id = res.payload.data.results[0].id
            const data = {
                id,
                page: 1
            }
            dispatch(fetchFreeTvSeries(data))
        })
    }, [])


    const onMovieDetailHandler = useCallback((item) => {
        navigation.navigate('MovieDetail', { item });
    }, [])
    // const combinegenreCategories = [...languageData, ...FreeTvSeriesAction];



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

    const loadSearchMore = useCallback(() => {
        const detail = {
            name: search,
            page: SeriesPage,
            cid: selectedCategoriesId,
            gid: selectedGenreId ? selectedGenreId : 0
        }
        dispatch(fetchFreeTvSeries(detail)).finally(() => {
            setLoading(false);
        });
    }, [])

    const openDrawer = useCallback(() => {
        setShowCategories(!showCategories)
    }, [showCategories])

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator
            style={{ marginVertical: 20 }}
            size="large"
            color={COLORS.yellow} />;
    };

    const loadMore = useCallback(() => {
        if (!hasScrolled || loading || !SeriesNextPage) return;
        setLoading(true);
        const detail = {
            id: selectedCategoriesId,
            page: SeriesPage
        };

        dispatch(fetchFreeTvSeries(detail)).finally(() => {
            setLoading(false);
            setHasScrolled(false); // ✅ Reset scroll trigger after API call
        });
    }, [hasScrolled, loading, SeriesNextPage, selectedCategoriesId, SeriesPage]);

    const onBackHandler = useCallback(() => {
        navigation.goBack()
    }, [])

    useEffect(() => {
        setHasScrolled(false);
    }, [selectLanguage, selectCategoriesIndex]);

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
                name: search,
                page: 1,
                cid: selectedCategoriesId,
                gid: selectedGenreId ? selectedGenreId : 0
            }
            dispatch(fetchFreeTvSeries(detail))
        }
        else {
            dispatch(clearSearchSeriesData())
        }
    }, [search])

    const onSelectCategories = useCallback((id, index) => {
        // dispatch(setSelectedCategoriesId(null))
        setSelectCategoriesIndex(index)
        setSelectLanguage(0)
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }

        if (selectCategoriesIndex !== index) {
            dispatch(clearSeriesData());
            dispatch(setSelectedCategoriesId(id))
            const detail = {
                id: id,
                page: 1
            }
            dispatch(fetchFreeTvSeries(detail));
            setShowCategories(false)
        }
    }, [selectCategoriesIndex])


    const onLanguageHandler = useCallback((item, index) => {
        setShowCategories(false)
        setSelectLanguage(index)
        dispatch(clearSeriesData())
        if (item.name === 'All') {
            if (selectedCategoriesId) {
                const detail = {
                    id: selectedCategoriesId,
                    page: 1
                };
                dispatch(fetchFreeTvSeries(detail))
            }
            else {
                dispatch(fetchFreeTvSeriesCategories()).then((res) => {
                    const detail = {
                        id: res?.payload?.data?.results[0]?.id,
                        page: 1
                    };
                    dispatch(fetchFreeTvSeries(detail))
                })
            }
        }
        else {
            if (selectedCategoriesId) {
                const detail = {
                    cid: selectedCategoriesId,
                    gid: item.id
                };
                dispatch(fetchFreeTvSeriesCategories(detail))
            }
            else {
                dispatch(fetchFreeTvSeriesCategories()).then((res) => {
                    const detail = {
                        cid: res?.payload?.data?.results[0]?.id,
                        gid: item.id
                    };
                    dispatch(fetchFreeTvSeriesCategories(detail))
                })
            }

        }
    }, [selectLanguage, selectedCategoriesId])


    const renderLanguage = useCallback(({ item, index }) => {
        const activeIndex = selectLanguage === index
        return (
            <TouchableOpacity
                onPress={() => onLanguageHandler(item, index)}
                style={[styles.languageBoxView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]}>{item.name}</Text>
            </TouchableOpacity>
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


    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = selectCategoriesIndex === index
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSelectCategories(item.id, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    <Text style={styles.categoriesName} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }, [selectCategoriesIndex])

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
                        data={searchSeriesData}
                        keyExtractor={(item, index) => `SeriesSearch-${index.toString()}`}
                        renderItem={renderSearchCinema}
                        numColumns={isTablet ? 3 : 2}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                        onEndReached={loadSearchMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View> :
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
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
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
                            <TouchableOpacity style={styles.dropdownMenu}
                                onPress={openDrawer}>
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> */}
                            </TouchableOpacity>
                            <FlatList
                                data={FreeTvSeriesData}
                                keyExtractor={(item, index) => `series-${index.toString()}`}
                                renderItem={renderCategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>}
                        <View style={styles.channelListView}>

                            <FlatList
                                ref={flatListRef}
                                data={seriesData}
                                keyExtractor={(item, index) => `series-${index.toString()}`}
                                renderItem={renderCinema}
                                numColumns={isTablet ? 3 : 2}
                                showsVerticalScrollIndicator={false}
                                columnWrapperStyle={styles.columnWrapper}
                                // style={{ marginBottom: isTablet ? 82 : 57 }}
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
}

export default SeriesScreen