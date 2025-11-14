import React, { FC, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { colors } from '../../styles/colors';
import StorageService from '../../service/storage.service';
import {
  ACCESS_TOKEN_KEY,
  HAS_VISITED_TO_ONBOARDING,
  setAppInitializing,
} from '../../api/config';
import Logo from '../../components/Logo/Logo';

const SplashScreen: FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const checkUserLogin = useCallback(async () => {
    try {
      const { success, data: token } = await StorageService.getItem(
        ACCESS_TOKEN_KEY,
      );
      if (success && token) {
        navigate(Routes.Loader, { routes: Routes.MainApp });
      } else {
        resetAndNavigate(Routes.Login);
      }
    } catch (error) {
      console.log('Splash check error:', error);
      resetAndNavigate(Routes.Login);
    }
  }, []);

  const initializeApp = useCallback(async () => {
    try {
      const { success, data: hasSeenOnboarding } = await StorageService.getItem(
        HAS_VISITED_TO_ONBOARDING,
      );
      setTimeout(() => {
        if (success && !hasSeenOnboarding) {
          resetAndNavigate(Routes.OnBoarding);
          setAppInitializing(false);
          return;
        } else {
          checkUserLogin();
          setAppInitializing(false);
        }
      }, 3000);
    } catch (error) {
      console.log('Error initializing app:', error);
      resetAndNavigate(Routes.Login);
      setAppInitializing(false);
    }
  }, [checkUserLogin]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      initializeApp();
    });
  }, [fadeAnim, initializeApp, slideAnim]);

  return (
    <View style={styles.container}>
      <Logo
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
