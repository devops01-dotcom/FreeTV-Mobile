import React from "react";
import VideoPlayer from "../Video";

const withVideoControls = (Component) => {
    return ({ isPlaying, channel_url, resizeMode, ...props }) => {
        // Additional logic or context could be added here
        return (
            <Component
                isPlaying={isPlaying}
                channel_url={channel_url}
                resizeMode={resizeMode}
                {...props}
            />
        );
    };
};

export default withVideoControls;
