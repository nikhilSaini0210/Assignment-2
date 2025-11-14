import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';
import { rf } from '../../scale/responsive';

interface Props {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  isRemember?: boolean;
}

const TouchableText: FC<Props> = ({
  onPress,
  label,
  containerStyle,
  labelStyle,
  isRemember = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={containerStyle}
    >
      {isRemember && <View style={styles.checkBox} />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TouchableText;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: rf(14),
    color: colors.secondaryText,
    textAlign: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.secondaryText,
  },
});
