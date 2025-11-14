import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

export type RootStackParamList = {
  [Routes.Loader]: {
    routes?: string;
  };
  [Routes.Splash]: undefined;
  [Routes.OnBoarding]: undefined;
  [Routes.MainApp]: undefined;
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
  [Routes.Home]: undefined;
  [Routes.Default]: undefined;
  [Routes.DefaultB]: undefined;
  [Routes.DefaultC]: undefined;
  [Routes.Profile]: undefined;
};

export type LoaderScreenRouteProp = RouteProp<
  RootStackParamList,
  Routes.Loader
>;
