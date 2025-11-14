import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, {
  Circle,
  G,
  Mask,
  Path,
  Defs,
  ClipPath,
  Rect,
  Image,
  Pattern,
  Use,
} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedLoader:FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 7, 0.3],
  });

  const transform = [{ translateY }];

  return (
    <Svg width={149} height={149} viewBox="0 0 149 149" fill="none">
      <G clipPath="url(#clip0)">
        <Circle
          cx={74.5}
          cy={74.5}
          r={48.6667}
          stroke="#47C2C4"
          strokeWidth={2}
        />

        <Mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x={37}
          y={37}
          width={75}
          height={75}
        >
          <Circle cx={74.5} cy={74.5} r={37.25} fill="#141414" />
        </Mask>

        <G mask="url(#mask0)">
          <AnimatedPath
            d="M24.8333 80.7083H26.814C31.6443 80.7083 36.4171 79.66 40.8028 77.6358L47.9852 74.3209C55.8931 70.6711 65.2209 72.143 71.6207 78.0505C80.5559 86.2984 94.5429 85.5193 102.507 76.3301L108.755 69.1206C112.629 64.651 118.252 62.0833 124.167 62.0833V111.75H24.8333V80.7083Z"
            fill="#47C2C4"
            transform={transform as any}
          />
        </G>
      </G>

      <Defs>
        <Pattern
          id="pattern0_7_885"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_7_885" />
        </Pattern>
        <ClipPath id="clip0_7_885">
          <Rect
            width={99.3333}
            height={99.3333}
            fill="white"
            transform="translate(24.8333 24.8333)"
          />
        </ClipPath>
        <Image
          id="image0_7_885"
          width={1}
          height={1}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
};

export default AnimatedLoader;
