import React, { FC, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, FlatList } from 'react-native';
import LogoBox from '../../components/Logo/LogoBox';
import OnboardingSlide from '../../components/onBoarding/OnboardingSlide';
import DotIndicator from '../../components/onBoarding/DotIndicator';
import { colors } from '../../styles/colors';
import CustomButton from '../../components/global/CustomButton';
import { slides } from '../../utils/data';
import StorageService from '../../service/storage.service';
import { HAS_VISITED_TO_ONBOARDING } from '../../api/config';
import { Routes } from '../../navigation/Routes';
import { resetAndNavigate } from '../../utils/NavigationUtil';

const { width } = Dimensions.get('window');

const AUTO_SCROLL_INTERVAL = 3000;

const OnboardingScreen: FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex === slides.length) nextIndex = 0;

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      await StorageService.setItem(HAS_VISITED_TO_ONBOARDING, 'true');
      resetAndNavigate(Routes.Login);
    }
  };

  return (
    <View style={styles.container}>
      <LogoBox />
      <DotIndicator scrollX={scrollX} count={slides.length} />
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
      />
      <CustomButton
        onPress={handleNext}
        title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        containerStyle={styles.btn}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 100,
  },
  btn: {
    paddingHorizontal: 20,
  },
});
