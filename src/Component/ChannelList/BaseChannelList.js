// Component/ChannelList/BaseChannelList.js
import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';


// Keep item width for getItemLayout perf
const ITEM_WIDTH = 120;


const BaseChannelList = ({
    data,
    type,
    renderItem,
    keyExtractor: keyExtractorProp,
}) => {
    const getItemLayout = useCallback(
        (_, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }),
        [],
    );

    const keyExtractor = keyExtractorProp || ((_, index) => `${type}-${index}`);

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={8}
            maxToRenderPerBatch={10}
            windowSize={7}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
        />
    );
};


export default memo(BaseChannelList);