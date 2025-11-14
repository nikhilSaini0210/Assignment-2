import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { Slides } from '../../types/interfaces';

const { width } = Dimensions.get('window');

interface SlideProps {
  item: Slides;
}

const OnboardingSlide: FC<SlideProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
};

export default OnboardingSlide;

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 70,
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: Fonts.RobotoRegular,
    textAlign: 'center',
    lineHeight: 20,
  },
});
