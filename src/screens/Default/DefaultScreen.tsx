import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { Fonts } from '../../styles/fonts';
import { colors } from '../../styles/colors';

const DefaultScreen: FC = () => {
  return (
    <CustomSafeAreaView>
      <View style={styles.conatiner}>
        <Text style={styles.text}>Coming Soon...</Text>
      </View>
    </CustomSafeAreaView>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.PoppinsBold,
    fontSize: 30,
    color: colors.primaryText,
    textAlign: 'center',
  },
});
