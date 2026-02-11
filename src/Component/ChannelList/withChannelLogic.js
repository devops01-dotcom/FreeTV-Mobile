// Component/ChannelList/withChannelLogic.js
import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { navigateTo } from '../../utils/navigateTo';
import { useAppDispatch } from '../../redux/hooks';
import { resetEducationData } from '../../redux/slice/educationSlice';
import { resetDevotionalData } from '../../redux/slice/devotionalSlice';

export function withChannelLogic(Wrapped) {
  return function ChannelListHOC({ data = [], type, progressing, setShowAlert }) {
    const dispatch = useAppDispatch();
    // Preload images
    useEffect(() => {
      if (data.length) {
        FastImage.preload(
          data
            .map(item => item.background_image || item.content_image || item.mobile_image)
            .filter(Boolean)
            .map(uri => ({ uri }))
        );
      }
    }, [data]);

    // Handlers
    const onPlayVideo = useCallback(
      (item) => {
        if (progressing) setShowAlert(true);
        else navigateTo('MovieDetail', { item });
      },
      [progressing, setShowAlert]
    );

   const onEducationHandler = useCallback(
  (selectedId) => {
    if (progressing) return setShowAlert(true);
    dispatch(resetEducationData());
    navigateTo('Education', { selectedCategory: selectedId });
  },
  [dispatch, progressing, setShowAlert]
);

const onDevotionalHandler = useCallback(
  (selectedId) => {
    if (progressing) return setShowAlert(true);
    dispatch(resetDevotionalData());
    navigateTo('Devotional', { selectedCategory: selectedId });
  },
  [dispatch, progressing, setShowAlert]
);
    // Render item
    const renderItem = useCallback(
      ({ item }) => {
        let imageUri = '';
        let onPressHandler = () => { };

        switch (type) {
          case 'EducationScreen':
            imageUri = item.background_image || item.logo || '';
            onPressHandler = () => onEducationHandler(item.id);
            break;
          case 'DevotionalScreen':
            imageUri = item.mobile_image || '';
            onPressHandler = () => onDevotionalHandler(item.id);
            break;
          default:
            imageUri = item.content_image || item.content_image_url ;
            onPressHandler = () => onPlayVideo(item);
            break;
        }

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={onPressHandler}
            activeOpacity={0.8}
          >
            <FastImage
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Text>{item.name}</Text> */}
          </TouchableOpacity>
        );
      },
      [type, onEducationHandler, onDevotionalHandler, onPlayVideo]
    );

    return <Wrapped data={data} type={type} renderItem={renderItem} />;
  };
}
