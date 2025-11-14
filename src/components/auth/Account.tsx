import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import TouchableText from '../global/TouchableText';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { hp, rf, wp } from '../../scale/responsive';

interface Props {
  title: string;
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const Account: FC<Props> = ({ title, label, onPress, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableText
        label={label}
        onPress={onPress}
        labelStyle={styles.label}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(1.3),
    paddingVertical: hp(2),
  },
  title: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: rf(12),
    color: colors.primaryText,
  },
  label: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: rf(12),
    color: colors.green,
  },
});
