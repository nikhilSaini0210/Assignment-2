import React, { FC, ReactNode } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  dismissKeyboard?: boolean;
}

const CustomSafeAreaView: FC<Props> = ({
  children,
  style,
  dismissKeyboard = true,
}) => {
  return dismissKeyboard ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </TouchableWithoutFeedback>
  ) : (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
});
