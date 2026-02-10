import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS } from '../../utils/color';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { clearSearchEducationData, EducationSelector, fetchEducationalCategories, fetchEducationalcontent, fetchEducationalSubCategories, fetchSearchEducational, resetEducationData } from '../../redux/slice/educationSlice';
import styles from './styles';
import { BootupAdViewSelector, fetchBootupEducationAdView } from '../../redux/slice/bootupadview';
import BootupWithoutSkipAdds from '../../Component/bootupWithoutSkipAdds';
import BackHeader from '../../Component/BackHeader';
import { setSelectedEducationCategoriesId, setSelectedEducationSubCategoriesId, } from '../../redux/slice/commonAction';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../../Component/SlideText';
import DeviceInfo from 'react-native-device-info';
import { IMAGES } from '../../assets';

const isTablet = DeviceInfo.isTablet();

const EducationScreen = ({ route }) => {
    const [search, setSearch] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [selectCategoriesIndex, setSelectCategoriesIndex] = useState(0)
    const [subCategoiesIndex, setSubCategoiesIndex] = useState(0)
    const [showCategories, setShowCategories] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const { bootupEducationData } = useAppSelector(BootupAdViewSelector)
    const { educational, educationalSubcategories, educationalChannelData, educationalSearchData, educationalPage, educationalNextPage } = useAppSelector(EducationSelector)
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);
    const { selectedCategory } = route.params || {}
    const { selectedEducationSubCategoriesId, selectedEducationCategoriesId, } = useAppSelector((state) => state.commonReducer);
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
            // setSelectCategoriesIndex(selectedCategory)
            dispatch(fetchEducationalCategories()).then((res) => {
                // const id = res.payload.data.results[selectedCategory ? selectedCategory : 0].id
                // setSelectedCategoriesId(id)
               const categories = res.payload.data.results || [];
                const index = categories.findIndex(cat => cat.id === selectedCategory);
                setSelectCategoriesIndex(index >= 0 ? index : 0);
                const id = selectedCategory;
                dispatch(setSelectedEducationCategoriesId(id))
                const data = {
                    id,
                    page: 1

                }
                dispatch(fetchEducationalSubCategories(data)).then((res) => {
                    const subCategoryId = res.payload.data?.results[0]?.id;
                    dispatch(setSelectedEducationCategoriesId(subCategoryId))
                    const data = {
                        cid: id,
                        sid: subCategoryId,
                        page: 1
                    }
                    dispatch(fetchEducationalcontent(data)).then(() => {
                        setLoading(false)
                    })
                })
            })
        }
        return () => setSelectCategoriesIndex(0)
    }, [route, navigation])

    useEffect(() => {
        dispatch(fetchBootupEducationAdView())
    }, []) //bootupEducationData

    useEffect(() => {
        if (search?.length >= 3) {
            const detail = {
                cid: selectedEducationCategoriesId,
                sid: selectedEducationSubCategoriesId,
                name: search
            }
            dispatch(fetchSearchEducational(detail))
        }
        else {
            dispatch(clearSearchEducationData())
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

    const onSubSelectCategories = useCallback((id, index) => {
        dispatch(resetEducationData())
        dispatch(setSelectedEducationSubCategoriesId(id))
        setSubCategoiesIndex(index)
        const data = {
            cid: selectedEducationCategoriesId,
            sid: id,
            page: 1
        }
        dispatch(fetchEducationalcontent(data)).then(() => {
            setLoading(false)
            setShowCategories(false)
        })
    }, [subCategoiesIndex, selectedEducationCategoriesId])

    const loadMore = () => {
    if (loading || !educationalNextPage || onEndReachedCalledDuringMomentum) return;

    setLoading(true);
    const data = {
        cid: selectedEducationCategoriesId,
        sid: selectedEducationSubCategoriesId,
        page: educationalPage
    };
    dispatch(fetchEducationalcontent(data)).finally(() => {
        setLoading(false);
        setOnEndReachedCalledDuringMomentum(true); // reset flag after fetch
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
        dispatch(resetEducationData())
        setSelectCategoriesIndex(index)
        // setSelectedCategoriesId(id)
        dispatch(setSelectedEducationCategoriesId(id))
        const data = {
            id,
            page: 1
        }
        dispatch(fetchEducationalSubCategories(data)).then((res) => {
            const subCategoryId = res.payload.data?.results[0]?.id;
            dispatch(setSelectedEducationSubCategoriesId(subCategoryId))

            const data = {
                cid: id,
                sid: subCategoryId,
                page: 1
            }
            dispatch(fetchEducationalcontent(data)).then(() => {
                setLoading(false)
            })
        })
        setSubCategoiesIndex(0)

    }, [selectCategoriesIndex, selectedEducationCategoriesId])

    const renderLanguage = useCallback(({ item, index }) => {
        const activeIndex = selectCategoriesIndex === index
        return (<LinearGradient
            colors={[COLORS.lightPrimaryColor, COLORS.black]}
            start={{ x: 0, y: 1 }}
            end={{ x: 3, y: 0 }}
            style={styles.gradientBorder}
        >
            <TouchableOpacity
                onPress={() => onSelectCategories(item.id, index)}
                style={[styles.languageBoxView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                <Text style={[styles.channelName, activeIndex && { color: COLORS.black }]}>{item.name}</Text>
            </TouchableOpacity>
        </LinearGradient>
        )
    }, [selectCategoriesIndex, selectedEducationCategoriesId])

    const renderCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image_url }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {item.is_live && <View style={styles.liveButton}>
                    <Text style={styles.liveText}>Live</Text>
                </View>}
            </TouchableOpacity>
        )

    }, [onMovieDetailHandler])

    const renderSearchCinema = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onMovieDetailHandler(item)} style={styles.movieDetailBox}>
                <FastImage
                    source={{ uri: item.content_image_url }}
                    style={styles.movieImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        )

    }, [])

    const renderCategories = useCallback(({ item, index }) => {
        const activeIndex = subCategoiesIndex === index
        return (
            <TouchableOpacity style={styles.categoriesBoxView} onPress={() => onSubSelectCategories(item.id, index)}>
                <View style={[styles.categoriesBoxListView, activeIndex && { backgroundColor: COLORS.yellow }]}>
                    {/* <Text style={styles.categoriesName} numberOfLines={1}>{item.name}</Text> */}
                    <SlidingText text={item.name} style={styles.categoriesName} />

                </View>
            </TouchableOpacity>
        )
    }, [subCategoiesIndex, selectedEducationCategoriesId])

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
                        data={educationalSearchData}
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
                        <View style={styles.videoBox}>
                            <BootupWithoutSkipAdds bootupData={bootupEducationData} isPlaying={isPlaying} />
                        </View>
                    </View>
                    <View style={styles.mainBox}>
                        <View style={styles.languageBox}>
                            <TouchableOpacity style={styles.dropdownMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={showCategories ? COLORS.transparent : COLORS.white} /> */}
                                <FastImage source={IMAGES.menu}  resizeMode={FastImage.resizeMode.contain} style={styles.menubar}/>
                            </TouchableOpacity>
                            <FlatList
                                data={educational}
                                horizontal
                                keyExtractor={(item, index) => `educationalCategories-${index.toString()}`}
                                renderItem={renderLanguage}
                                extraData={educational}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        {showCategories && <View style={styles.drawerMenu}>
                            <TouchableOpacity style={styles.dropdownCloseMenu}
                                onPress={openDrawer}>
                                {/* <Icon name='menu' size={isTablet ? 45 : 30} color={COLORS.white} /> */}
                                <FastImage source={IMAGES.menu}  resizeMode={FastImage.resizeMode.contain} style={styles.menubar}/>
                            </TouchableOpacity>
                            <FlatList
                                data={educationalSubcategories}
                                keyExtractor={(item, index) => `educationalSubcategories-${index.toString()}`}
                                renderItem={renderCategories}
                                extraData={educationalSubcategories}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>}
                        <View style={styles.channelListView}>
                            <FlatList
                                ref={flatListRef}
                                data={educationalChannelData}
                                keyExtractor={(item, index) => `education-${index.toString()}`}
                                renderItem={renderCinema}
                                numColumns={isTablet ? 3 : 2}
                                extraData={educationalChannelData}
                                showsVerticalScrollIndicator={false}
                                columnWrapperStyle={styles.columnWrapper}
                                 style={{marginBottom: isTablet ? 82 : 57}}
                                contentContainerStyle={{ paddingBottom: 80 }}
                                initialNumToRender={8}
                                maxToRenderPerBatch={8}
                                windowSize={7}
                                removeClippedSubviews={true}
                                getItemLayout={(data, index) => ({
                                    length: 200, // approx item height
                                    offset: 200 * index,
                                    index,
                                })}
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                                onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
                            />
                        </View>
                    </View>
                </>
            }
        </SafeAreaView>
    )
};


export default EducationScreen;

