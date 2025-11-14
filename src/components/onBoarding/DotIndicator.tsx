import React, { FC } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

interface DotProps {
  scrollX: Animated.Value;
  count: number;
}

const DotIndicator: FC<DotProps> = ({ scrollX, count }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1.4, 0.7],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ scale }], opacity }]}
          />
        );
      })}
    </View>
  );
};

export default DotIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
    marginHorizontal: 6,
  },
});
