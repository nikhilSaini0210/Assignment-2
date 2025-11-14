import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLoader from '../../assets/icons/AnimatedLoader';
import { colors } from '../../styles/colors';
import { LoaderScreenRouteProp } from '../../navigation/RouteParams';
import { Routes } from '../../navigation/Routes';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';

const FullScreenLoader: FC<{ route: LoaderScreenRouteProp }> = ({ route }) => {
  const navigateToRoute = route.params?.routes as Routes | undefined;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigateToRoute) {
        resetAndNavigate(navigateToRoute);
      } else {
        resetAndNavigate(Routes.Default);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigateToRoute]);

  return (
    <View style={styles.container}>
      <AnimatedLoader />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
