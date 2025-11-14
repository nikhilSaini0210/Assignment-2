import React, { useState, useRef, ReactNode, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { hp, rf, wp } from '../../scale/responsive';
import Icon from './Icon';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  errorStyle?: TextStyle;
  showError?: boolean;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<Props> = ({
  label,
  error,
  errorStyle,
  showError = true,
  value,
  secureTextEntry = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(!!secureTextEntry);
  const animatedLabel = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const underlineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(underlineAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    if (error && showError) {
      Animated.spring(errorAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 40,
      }).start();
    } else {
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [error, errorAnimation, showError]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const labelStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -6],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    fontFamily: isFocused ? Fonts.PoppinsSemiBold : Fonts.RobotoRegular,
    color: isFocused ? colors.primaryText : colors.secondaryText,
  };

  const underlineStyle = {
    borderBottomColor: underlineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.secondaryText, colors.primaryText],
    }),
  };

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-hp(1.5), 0],
  });

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={hidePassword}
          cursorColor={colors.primaryText}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.iconWrapper}
          >
            <Icon
              iconFamily="Ionicons"
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.secondaryText}
            />
          </TouchableOpacity>
        )}
      </View>

      <Animated.View style={[styles.underline, underlineStyle]} />
      {showError && error && (
        <Animated.View
          style={[
            styles.errorContainer,
            {
              opacity: errorOpacity,
              transform: [{ translateY: errorTranslateY }],
            },
          ]}
        >
          <Text style={[styles.errorText, errorStyle]}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  label: {
    position: 'absolute',
    left: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: Fonts.RobotoRegular,
  },
  underline: {
    marginTop: 4,
    height: 1,
    borderBottomWidth: 1.5,
  },
  iconWrapper: {
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  errorContainer: {
    marginTop: hp(0.5),
    paddingHorizontal: wp(1),
  },
  errorText: {
    fontSize: rf(13),
    color: colors.error,
    fontFamily: Fonts.RobotoRegular,
  },
});

export default CustomInput;
