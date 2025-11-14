import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

interface Props {
  style?: Object;
}

const Logo: FC<Props> = ({ style }) => {
  return (
    <Animated.View style={[styles.logoContainer, style]}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <LinearGradient
        colors={colors.logoGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBox}
      >
        <Text style={styles.logoText}>Ipsum</Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default Logo;

const BOX_HEIGHT = 48;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: colors.logoColor,
    elevation: 4,
    height: BOX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBox: {
    height: BOX_HEIGHT - 10,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    textAlign: 'center',
  },
});
