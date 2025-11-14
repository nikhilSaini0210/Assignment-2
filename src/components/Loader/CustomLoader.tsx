import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLoader from '../../assets/icons/AnimatedLoader';
import { colors } from '../../styles/colors';

const CustomLoader: FC = () => {
  return (
    <View style={styles.container}>
      <AnimatedLoader />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
