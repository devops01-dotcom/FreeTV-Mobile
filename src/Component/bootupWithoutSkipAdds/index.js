import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import VideoPlayer from '../../Component/Video'
import Video from 'react-native-video';

const BootupWithoutSkipAdds = ({ bootupData, isPlaying }) => {

    const handleVideoEnd = () => {
        setProgressing(false)
    };
    const handleVideoError = (error) => {
        setProgressing(false)
    };

    return (
        <View style={styles.container}>
            {bootupData?.urltype === 'Image' ?
                <Image source={{ uri: bootupData?.video_url }} style={styles.bootupAdds} resizeMode='contain' />
                :
                // <Video source={{ uri: bootupData?.video_url }}
                //     controls={false}
                //     style={styles.backgroundVideo}
                // />
                // <VideoPlayer channel_url={bootupData?.video_url} isPlaying={isPlaying} />
                <Video
                source={{ uri: bootupData?.ad_url }}
                style={styles.video}
                repeate
                // onEnd={handleVideoEnd}
                // onError={(er) => {
                //     console.log('object video err', er)
                //      handleVideoError
                //     }}
                adTagUrl={bootupData?.googlead_url} 
            />
            }
        </View>
    );
};

export default BootupWithoutSkipAdds;

