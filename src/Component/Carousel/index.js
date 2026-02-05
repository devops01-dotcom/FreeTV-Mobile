import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { HEIGHT, WIDTH } from '../../utils/dimension';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const CarouselViewItem = React.memo(({ imageUri }) => {
  return (
    <View focusable={false}>
      <FastImage
        style={{ height: '95%', width: '100%', alignSelf: 'center', marginTop: '2%' }}
        source={{ uri: imageUri }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </View>
  );
});

const CarouselView = React.memo(({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const [slideTime, setSlideTime] = useState(5000);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextSlide = (activeSlide + 1) % (images ? images?.length : 0);
      setActiveSlide(nextSlide);
      handleAutoScroll(nextSlide);
      if (carouselRef.current) {
        carouselRef.current.scrollTo(nextSlide); // Updated to use scrollTo method from Reanimated carousel
      }
    }, slideTime);

    return () => clearInterval(intervalId);
  }, [activeSlide, images, slideTime]);

  const handleAutoScroll = (nextSlide) => {
    const nextSlideDuration = images[nextSlide]?.add_time * 1000 || 5000; // Default to 5 seconds if duration is not provided
    setSlideTime(nextSlideDuration);

  };

  const _renderItem = useCallback(({ item }) => {
    return <CarouselViewItem imageUri={item.image_url} />;
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={_renderItem}
        width={WIDTH.w320}
        height={isTablet ? HEIGHT.h30 : HEIGHT.h25} // Adjust the height ratio according to your design
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={true}
        scrollEnabled={autoScrollEnabled}
        autoPlay={true}
        autoPlayInterval={slideTime} 
      />
    </View>
  );
});

export default CarouselView;
