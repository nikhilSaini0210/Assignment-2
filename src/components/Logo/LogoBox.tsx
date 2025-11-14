import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

const LogoBox: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <Text style={styles.text}>Logo</Text>
      </View>

      <LinearGradient
        colors={colors.logoGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.rightBox}
      >
        <Text style={styles.text}>Ipsum</Text>
      </LinearGradient>
    </View>
  );
};

export default LogoBox;

const BOX_HEIGHT = 48;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.logoColor,
    elevation: 4,
    height: BOX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  leftBox: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBox: {
    height: BOX_HEIGHT - 10,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    textAlign: 'center',
  },
});
