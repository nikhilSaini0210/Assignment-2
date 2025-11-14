import { Animated, StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

interface Props {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

const ProfileHeader: FC<Props> = ({ fadeAnim, slideAnim }) => {
  return (
    <Animated.View
      style={[
        styles.header,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.headerText}>Your Profile</Text>
    </Animated.View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.primaryText,
    alignItems: 'center',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 5,
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});
