import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS } from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { clearSearchDevotionalData, DevotionalSelector, fetchDevotionalCategories, fetchDevotionallivecontent, fetchDevotionalSubCategories, fetchSearchDevotional, resetDevotionalData } from '../../redux/slice/devotionalSlice';
import BootupWithoutSkipAdds from '../../Component/bootupWithoutSkipAdds';
import { BootupAdViewSelector, fetchBootupDevotionalAdView } from '../../redux/slice/bootupadview';
import BackHeader from '../../Component/BackHeader';
import { setSelectedDevotionalCategoriesId, setSelectedDevotionalSubCategoriesId, } from '../../redux/slice/commonAction';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../../Component/SlideText';
import DeviceInfo from 'react-native-device-info';
import { IMAGES } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';


const isTablet = DeviceInfo.isTablet();

const DevotionalSceen = ({ route }) => {
    const [search, setSearch] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectCategoriesIndex, setSelectCategoriesIndex] = useState(0)
    const [subCategoiesIndex, setSubCategoiesIndex] = useState(0)
    const [showCategories, setShowCategories] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const { bootupDevotionalData } = useAppSelector(BootupAdViewSelector)
    const [isPlaying, setIsPlaying] = useState(false)
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);
    const { selectedCategory } = route.params || {}
    const { devotional, devotionalSubcategories, devotionalChannelData, devotionalSearchData, devotionalNextPage, devotionalPage } = useAppSelector(DevotionalSelector)
    const { selectedDevotionalSubCategoriesId, searchQuery, selectedDevotionalCategoriesId, } = useAppSelector((state) => state.commonReducer);

    const navigation = useNavigation();
    const dispatch = useAppDispatch()

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
        if (selectedCategory !== undefined) {
            dispatch(fetchDevotionalCategories()).then((res) => {
                const categories = res.payload.data.results || [];
                const index = categories.findIndex(cat => cat.id === selectedCategory);
                setSelectCategoriesIndex(index >= 0 ? index : 0);
                const id = selectedCategory
                dispatch(setSelectedDevotionalCategoriesId(id))
                const data = {
                    id,
                    page: 1
                }
                dispatch(fetchDevotionalSubCategories(data)).then((res) => {
                    const subCategoryId = res.payload.data?.results[0]?.id;
                    dispatch(setSelectedDevotionalSubCategoriesId(subCategoryId))
                    const data = {
                        cid: id,
                        sid: subCategoryId,
                        page: 1
                    }
                    dispatch(fetchDevotionallivecontent(data))
                })
            })
        }
        return () => setSelectCategoriesIndex(0)
    }, [route, navigation])

    const openDrawer = useCallback(() => {
        setShowCategories(!showCategories)
    }, [showCategories])

    const onBackHandler = useCallback(() => {
        // navigation.navigate('Home');
        navigation.goBack()
    }, [])
    useEffect(() => {
        dispatch(fetchBootupDevotionalAdView())
    }, [])

    useEffect(() => {
        if (search?.length >= 3) {
            const detail = {
                cid: selectedDevotionalCategoriesId,
                sid: selectedDevotionalSubCategoriesId,
                name: search
            }
            dispatch(fetchSearchDevotional(detail))
        }
        else {
            dispatch(clearSearchDevotionalData())
        }
    }, [search])

    const onMovieDetailHandler = useCallback((item) => {
        navigation.navigate('MovieDetail', { item });
    }, [])

    const onSelectSubCategories = useCallback((id, index) => {
        dispatch(resetDevotionalData())
        dispatch(setSelectedDevotionalSubCategoriesId(id))
        setSubCategoiesIndex(index)
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
        const data = {
            cid: selectedDevotionalCategoriesId,
            sid: id,
            page: 1
        }
        dispatch(fetchDevotionallivecontent(data))
        setShowCategories(false)

    }, [subCategoiesIndex, selectedDevotionalCategoriesId])

    const loadMore = () => {
        if (loading || !devotionalNextPage || onEndReachedCalledDuringMomentum) return;

        setLoading(true);
        const data = {
            cid: selectedDevotionalCategoriesId,
            sid: selectedDevotionalSubCategoriesId,
            page: devotionalPage
        };
        dispatch(fetchDevotionallivecontent(data))
            .finally(() => {
                setLoading(false);
                setOnEndReachedCalledDuringMomentum(true); // prevent immediate re-trigger
            });
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator
            style={{ marginVertical: 20 }}
            size="large"
            color={COLORS.yellow} />;
    };

    const onSelectCategories = useCallback((id, index) => {
        setShowCategories(false)
        dispatch(resetDevotionalData())
        setSelectCategoriesIndex(index)
        dispatch(setSelectedDevotionalCategoriesId(id))
        const data = {
            id,
            page: 1
        }
        dispatch(fetchDevotionalSubCategories(data)).then((res) => {
            const subCategoryId = res.payload.data?.results[0]?.id;
            dispatch(setSelectedDevotionalSubCategoriesId(subCategoryId))
            const data = {
                cid: id,
                sid: subCategoryId,
                page: 1
            }
            dispatch(fetchDevotionallivecontent(data))
        })
        setSubCategoiesIndex(0)
    }, [selectCategoriesIndex, selectedDevotionalCategoriesId, selectedDevotionalSubCategoriesId])


    const renderLanguage = useCallback(({ item, index }) => {
        const activeIndex = selectCategoriesIndex === index
        return (
            <TouchableOpacity style={[styles.languageBoxView, activeIndex && { backgroundColor: COLORS.yellow }]}
                onPress={() => onSelectCategories(item.id, index)}>
                <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }, [selectCategoriesIndex, selectedDevotionalCategoriesId])

    const renderCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image || item.content_image_url }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {item.is_live && <View style={styles.liveButton}>
                    <Text style={styles.liveText}>Live</Text>
                </View>}
            </TouchableOpacity>
        )

    }, [dispatch])

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

    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = subCategoiesIndex === index
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSelectSubCategories(item.id, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    <Text style={styles.categoriesName} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }, [subCategoiesIndex, selectedDevotionalCategoriesId])

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
                        data={devotionalSearchData}
                        keyExtractor={(item, index) => `devotionalSearch-${index.toString()}`}
                        renderItem={renderSearchCinema}
                        numColumns={isTablet ? 3 : 2}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                :
                <>
                    <View style={styles.adBox}>
                        {/* <View style={styles.videoBox}> */}
                            <BootupWithoutSkipAdds bootupData={bootupDevotionalData} isPlaying={isPlaying} />

                        {/* </View> */}
                    </View>
                    <View style={styles.mainBox}>
                        <View style={styles.languageBox}>
                            <TouchableOpacity style={styles.dropdownMenu}
                                onPress={openDrawer}>
                                {/* {!showCategories ? <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> : null} */}
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={showCategories ? COLORS.transparent : COLORS.white} /> */}
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
                            </TouchableOpacity>
                            <FlatList
                                data={devotional}
                                horizontal
                                keyExtractor={(item, index) => `devotionalCategories-${index.toString()}`}
                                renderItem={renderLanguage}
                                extraData={devotional}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        {showCategories && <View style={styles.drawerMenu}>
                            <TouchableOpacity style={styles.dropdownCloseMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> */}
                                <FastImage source={IMAGES.menu} resizeMode={FastImage.resizeMode.contain} style={styles.menubar} />
                            </TouchableOpacity>
                            <FlatList
                                data={devotionalSubcategories}
                                keyExtractor={(item, index) => `devotionalSubcategories-${index.toString()}`}
                                renderItem={renderCategories}
                                extraData={devotionalSubcategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>}
                        <View style={styles.channelListView}>
                            <FlatList
                                ref={flatListRef}
                                data={devotionalChannelData}
                                keyExtractor={(item, index) => `devotional-${index.toString()}`}
                                renderItem={renderCinema}
                                numColumns={isTablet ? 3 : 2}
                                extraData={devotionalChannelData}
                                columnWrapperStyle={styles.columnWrapper}
                                // style={{marginBottom: isTablet ? 82 : 57}}
                                contentContainerStyle={{ paddingBottom: 80 }}
                                showsVerticalScrollIndicator={false}
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                                onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)} // reset flag when user scrolls
                                ListFooterComponent={renderFooter}
                            />
                        </View>
                    </View>
                </>
            }
        </SafeAreaView>
    )
};

export default DevotionalSceen;