

import TextTicker from 'react-native-text-ticker';

const SlidingText = ({
  text,
  style,
}) => {
  return (
    <TextTicker
      style={[style, { textAlignVertical: 'center', height: 42}]}
      loop
      bounce={false}
      shouldAnimateTreshold={40}
      // repeatSpacer={100}
      // marqueeDelay={100}
      bounceDelay={0}
      duration={5000}
      repeatSpacer={100}
      marqueeDelay={1000}

    >
      {text}
    </TextTicker>
  );
}

export default SlidingText;