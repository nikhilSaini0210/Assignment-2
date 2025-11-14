import { StatusBar } from 'react-native';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { Routes } from './Routes';
import MainApp from './MainApp';
import { colors } from '../styles/colors';
import { RootStackParamList } from './RouteParams';
import FullScreenLoader from '../screens/Loader/FullScreenLoader';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.mainBg}
        barStyle="dark-content"
        translucent={true}
      />
      <LoginScreen />
    </>
  );
};

const RegisterStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.mainBg}
        barStyle="dark-content"
        translucent={true}
      />
      <RegisterScreen />
    </>
  );
};

const OnboardingStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.mainBg}
        barStyle="dark-content"
        translucent={true}
      />
      <OnboardingScreen />
    </>
  );
};

const SplashStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={true}
      />
      <SplashScreen />
    </>
  );
};

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Splash}
      >
        <Stack.Screen name={Routes.Splash} component={SplashStatus} />
        <Stack.Screen name={Routes.OnBoarding} component={OnboardingStatus} />
        <Stack.Screen name={Routes.Login} component={LoginStatus} />
        <Stack.Screen name={Routes.Register} component={RegisterStatus} />
        <Stack.Screen name={Routes.Loader} component={FullScreenLoader} />
        <Stack.Screen name={Routes.MainApp} component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
