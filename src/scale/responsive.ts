import {
  widthPercentageToDP as wpBase,
  heightPercentageToDP as hpBase,
} from 'react-native-responsive-screen';

export const wp = (value: number | string): number => {
  return typeof value === 'number' ? wpBase(`${value}%`) : wpBase(value);
};

export const hp = (value: number | string): number => {
  return typeof value === 'number' ? hpBase(`${value}%`) : hpBase(value);
};

export const rf = (size: number): number => {
  const guidelineBaseHeight = 680;
  return hpBase(`${(size * 100) / guidelineBaseHeight}%`);
};
