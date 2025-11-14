import React, { FC, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { colors } from '../../styles/colors';
import CustomInput from '../../components/global/CustomInput';
import { validateInput } from '../../utils/Valdations';
import CustomButton from '../../components/global/CustomButton';
import { navigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import AuthHeader from '../../components/auth/AuthHeader';
import TouchableText from '../../components/global/TouchableText';
import Account from '../../components/auth/Account';
import makeRequest from '../../api/interceptor';
import StorageService from '../../service/storage.service';
import { ACCESS_TOKEN_KEY, endPoints } from '../../api/config';
import { showAlert } from '../../utils/AlertUtil';
import { hp, wp } from '../../scale/responsive';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (text: string) => {
    setEmail(text.trim());
    if (!text.trim()) {
      setEmailError('Email is required');
    } else if (!validateInput('email', text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text.trim());
    if (!text.trim()) {
      setPasswordError('Password is required');
    } else if (!validateInput('password', text)) {
      setPasswordError(
        'Password must be at least 8 characters with letters and numbers',
      );
    } else {
      setPasswordError('');
    }
  };

  const onLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError) return;

    if (!email || !password) {
      setEmailError(!email ? 'Email is required' : '');
      setPasswordError(!password ? 'Password is required' : '');
      return;
    }

    setLoading(true);
    try {

      const data = {
        email: email,
        password: password,
        remember_me: true,
      }

      const { response } = await makeRequest({
        method: 'POST',
        url: endPoints.login,
        data: data,
      });

      console.log(response)

      if (response?.data.success) {
        const { message } = response?.data;
        const { token, user } = response?.data?.data;
        console.log(user);
        await StorageService.setItem(ACCESS_TOKEN_KEY, token);
        showAlert({
          title: 'Success',
          message,
          onOkPress: () => navigate(Routes.Loader, { routes: Routes.MainApp }),
        });
      } else {
        showAlert({
          title: 'Login Failed',
          message:
            response?.data?.message ||
            'Unable to Login. Please try again later.',
        });
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        'Something went wrong. Please check your internet connection.';
      showAlert({ title: 'Error', message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const onForgetPassword = () => {
    console.log('Forgot password');
  };

  const onRegister = () => {
    navigate(Routes.Register);
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp(7) : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <AuthHeader titile="Log In" />

            <CustomInput
              label="Email / Phone number"
              value={email}
              onChangeText={validateEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={validatePassword}
              error={passwordError}
              autoCapitalize="none"
              secureTextEntry
            />
            <View style={styles.remCont}>
              <TouchableText
                label="Remember me"
                onPress={onForgetPassword}
                labelStyle={styles.forgot}
                isRemember={true}
                containerStyle={styles.remBtn}
              />

              <TouchableText
                label="Forgot Password?"
                onPress={onForgetPassword}
                labelStyle={styles.forgot}
              />
            </View>

            <CustomButton
              loading={loading}
              title="Log In"
              onPress={onLogin}
              containerStyle={styles.btn}
            />

            <Account
              title={`Don't Have an Account?`}
              label={'Register Now!'}
              onPress={onRegister}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: hp(3),
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: colors.mainBg,
  },
  btn: {
    marginTop: hp(4),
  },
  remCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  forgot: {
    color: colors.secondaryText,
    textAlign: 'center',
  },
});
