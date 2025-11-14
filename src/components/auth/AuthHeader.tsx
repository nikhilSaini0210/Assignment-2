import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { hp, rf } from '../../scale/responsive';
import Logo from '../Logo/Logo';

interface Props {
  titile: string;
}

const AuthHeader: FC<Props> = ({ titile }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.content}>
        <Text style={styles.title}>{titile}</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(4),
  },
  title: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: rf(18),
    color: colors.primaryText,
    textAlign: 'center',
  },
  content: {
    paddingTop: hp(10),
  },
  appName: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: rf(30),
    color: colors.primaryText,
    textAlign: 'center',
  },
});
