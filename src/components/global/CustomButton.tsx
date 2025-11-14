import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { hp, wp, rf } from '../../scale/responsive';

interface CustomButtonProps {
  disabled?: boolean;
  title: string;
  onPress: () => Promise<void> | void;
  loading?: boolean;
  containerStyle?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  containerStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (!loading) onPress();
      }}
    >
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ scale: scaleAnim }] },
          containerStyle,
        ]}
      >
        <LinearGradient
          colors={colors.btnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator size={rf(24)} color={colors.white} />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  gradient: {
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    color: colors.white,
    fontSize: rf(14),
    fontFamily: Fonts.PoppinsSemiBold,
    textAlign: 'center',
  },
});

export default CustomButton;
