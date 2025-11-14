import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Routes } from './Routes';
import HomeScreen from '../screens/Home/HomeScreen';
import TabBarIcon from './TabBarIcon';
import DefaultScreen from '../screens/Default/DefaultScreen';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { hp, wp } from '../scale/responsive';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');

const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.green,
  tabBarInactiveTintColor: colors.secondaryText,
  tabBarStyle: {
    backgroundColor: colors.background,
    height: Platform.OS === 'ios' ? hp(9) : hp(8),
    paddingBottom: Platform.OS === 'ios' ? hp(2) : hp(1),
    paddingTop: hp(1),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarIcon: ({ color, focused }) => (
    <TabBarIcon
      name={route.name}
      color={color}
      size={width < 400 ? wp(8) : wp(10)}
      focused={focused}
    />
  ),
});

const HomeStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.mainBg}
        barStyle="dark-content"
        translucent={true}
      />
      <HomeScreen />
    </>
  );
};

const DefaultStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.mainBg}
        barStyle="dark-content"
        translucent={true}
      />
      <DefaultScreen />
    </>
  );
};

const ProfileStatus: FC = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.primaryText}
        barStyle="light-content"
        translucent={true}
      />
      <ProfileScreen />
    </>
  );
};

const MainApp: FC = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name={Routes.Home} component={HomeStatus} />
    <Tab.Screen name={Routes.Default} component={DefaultStatus} />
    <Tab.Screen name={Routes.DefaultB} component={DefaultStatus} />
    <Tab.Screen name={Routes.DefaultC} component={DefaultStatus} />
    <Tab.Screen name={Routes.Profile} component={ProfileStatus} />
  </Tab.Navigator>
);

export default MainApp;
