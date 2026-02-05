import React, { memo, useCallback, useEffect } from 'react';
import Video from 'react-native-video';
import { useAppDispatch } from '../../redux/hooks';
import styles from './styles';
import { setShowHomeAds } from '../../redux/slice/commonAction';


const BootupAds = ({ setProgressing, bootupData }) => {
    const dispatch = useAppDispatch()
    const handleVideoEnd = useCallback(() => {
        setProgressing(false)
        dispatch(setShowHomeAds(false))
    }, [setProgressing]);

    const handleVideoError = useCallback((error) => {
        setProgressing(false)
        dispatch(setShowHomeAds(false))
    }, [setProgressing]);

    return (
        <Video
            source={{ uri: bootupData?.ad_url }}
            style={styles.video}
            onEnd={handleVideoEnd}
            repeat
            onError={(er) => {
                // console.log('object video err', er)
                handleVideoError
            }}
            adTagUrl={bootupData?.googlead_url}
        />
    );
};


// export default BootupAds;
export default memo(BootupAds);

