import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import Icon from '@react-native-vector-icons/ionicons';
import { AddlaunchSelector } from '../../redux/slice/addlaunch';
import { useAppSelector } from '../../redux/hooks';
import CarouselView from '../../Component/Carousel';
import commonStyle from '../../utils/commonStyle';
import { COLORS } from '../../utils/color';
import BackHeader from '../../Component/BackHeader';

const MovieDetailScreen = ({ route, navigation }) => {
    const [search, setSearch] = useState('')
    const addLaunch = useAppSelector(AddlaunchSelector)?.data || {};

    const onBackHandler = useCallback(() => {
        navigation.goBack()
    }, [])

    const onPlatVideo = useCallback(async () => {
        const url = movieDetail.content_url;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            await Linking.openURL(url);
        }
    }, [])

    const movieDetail = route?.params?.item
    return (
        <View style={styles.container}>
            <BackHeader onBackHandler={onBackHandler}
                name={search}
                placeholder='Search'
                onChangeText={setSearch}
                style={styles.input}
                onlyBack={true}
            />
            <View style={styles.videoBox}>
                <FastImage
                    source={{ uri: movieDetail.content_image || movieDetail.content_image_url }}
                    style={styles.backgroundImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <TouchableOpacity onPress={onPlatVideo} style={styles.platButton}>
                    <Icon name="play" size={100} color={COLORS.yellow} />
                </TouchableOpacity>
            </View>

            <View style={styles.movieDetailBox}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.movieName}>{movieDetail?.name}</Text>
                    {movieDetail?.year && <View style={[commonStyle.row, { marginVertical: 5 }]}>
                        <View style={styles.movieHeadingBox}>
                            <Text style={styles.movieDetail}>Year</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.movieDetail}>: </Text>
                        </View>
                        <View style={styles.movieTitleBox}>
                            <Text style={styles.movieDetail}>{movieDetail?.year}</Text>
                        </View>
                    </View>}
                    {movieDetail?.language?.length > 0 && <View style={styles.row}>
                        <View style={styles.movieHeadingBox}>
                            <Text style={styles.movieDetail}>Language</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.movieDetail}>: </Text>
                        </View>
                        <View style={styles.movieTitleBox}>
                            <Text style={styles.movieDetail}>{movieDetail?.language?.map((lang) => lang.name).join(', ')}</Text>
                        </View>
                    </View>}
                    {movieDetail.director && <View style={styles.row}>
                        <View style={styles.movieHeadingBox}>
                            <Text style={styles.movieDetail}>Director</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.movieDetail}>: </Text>
                        </View>
                        <View style={styles.movieTitleBox}>
                            <Text style={styles.movieDetail}>{movieDetail.director}</Text>
                        </View>
                    </View>}
                    {movieDetail.cast && <View style={styles.row}>
                        <View style={styles.movieHeadingBox}>
                            <Text style={styles.movieDetail}>Stars</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.movieDetail}>: </Text>
                        </View>
                        <View style={styles.movieTitleBox}>
                            <Text style={styles.movieDetail}>{movieDetail.cast}</Text>
                        </View>
                    </View>}
                    {movieDetail.rate && <View style={styles.row}>
                        <View style={styles.movieHeadingBox}>
                            <Text style={styles.movieDetail}>Rating</Text>
                        </View>
                        <View style={styles.centerView}>
                            <Text style={styles.movieDetail}>: </Text>
                        </View>
                        <View style={styles.movieTitleBox}>
                            <Text style={styles.movieDetail}>
                                {`${parseFloat(movieDetail.rate).toFixed(1)} / 10`}
                            </Text>
                        </View>
                    </View>}
                    {movieDetail?.description && <Text style={styles.movieDescription}>
                        <Text style={styles.movieDescriptionHeading}>Description - </Text>
                        <Text style={styles.descriptionText}>{movieDetail.description}</Text>
                        </Text>}
                </ScrollView>

            </View>

            <View style={styles.addsBox}>
                <CarouselView images={addLaunch} />
            </View>

        </View>
    )
};


export default MovieDetailScreen;
