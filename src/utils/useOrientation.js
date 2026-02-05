import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const getOrientation = () => {
  const dimensions = Dimensions.get("screen");
  return dimensions.height >= dimensions.width ? "portrait" : "landscape";
};

/**
 * A hook that returns device orientation.
 * @returns 'portrait' | 'landscape'
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ screen }) => {
      setOrientation(screen.height >= screen.width ? "portrait" : "landscape");
    });

    return () => subscription?.remove();
  }, []);

  return orientation;
};
