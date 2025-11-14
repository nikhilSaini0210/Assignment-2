import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import AuthHeader from '../../components/auth/AuthHeader';
import CustomInput from '../../components/global/CustomInput';
import Account from '../../components/auth/Account';
import CustomButton from '../../components/global/CustomButton';
import { navigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import { validateInput } from '../../utils/Valdations';
import makeRequest from '../../api/interceptor';
import { ACCESS_TOKEN_KEY, endPoints } from '../../api/config';
import StorageService from '../../service/storage.service';
import { showAlert } from '../../utils/AlertUtil';
import { hp, wp } from '../../scale/responsive';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen: FC = () => {
  const [fistName, setFisrtName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
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

  const validateFirstName = (text: string) => {
    setFisrtName(text);

    if (!text.trim()) {
      setFirstNameError('First Name is required');
    } else if (!/^[A-Za-z]{2,}$/.test(text)) {
      setFirstNameError('Enter valid name (letters only, min 2 chars)');
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = (text: string) => {
    setLastName(text);

    if (!text.trim()) {
      setLastNameError('Last Name is required');
    } else if (text.trim() && !/^[A-Za-z]+$/.test(text)) {
      setLastNameError('Last Name must contain only letters');
    } else {
      setLastNameError('');
    }
  };

  const validateMobile = (text: string) => {
    setMobileNumber(text);

    if (!text.trim()) {
      setMobileError('Mobile number is required');
    } else if (!/^[0-9]{10}$/.test(text)) {
      setMobileError('Enter valid 10-digit mobile number');
    } else {
      setMobileError('');
    }
  };

  const onRegister = async () => {
    validateFirstName(fistName);
    validateLastName(lastName);
    validateEmail(email);
    validatePassword(password);
    validateMobile(mobileNumber);

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      mobileError
    ) {
      return;
    }

    if (!fistName || !email || !password || !mobileNumber || !lastName) {
      showAlert({
        title: 'Error',
        message: 'Please fill all required fields.',
      });
      return;
    }
    setLoading(true);
    try {
      const data = {
        first_name: fistName,
        last_name: lastName,
        email: email,
        password: password,
        mobile_number: '+91' + mobileNumber,
      };

      const { response } = await makeRequest({
        method: 'POST',
        url: endPoints.register,
        data: data,
      });
      if (response?.data.success) {
        const { message } = response?.data;
        const { token, user } = response?.data?.data;
        console.log(user);
        await StorageService.setItem(ACCESS_TOKEN_KEY, token);
        showAlert({
          title: 'Success',
          message: message,
          onOkPress: () => {
            navigate(Routes.Loader, { routes: Routes.MainApp });
          },
        });
      } else {
        showAlert({
          title: 'Registration Failed',
          message:
            response?.data?.message ||
            'Unable to register. Please try again later.',
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

  const onLogin = () => {
    navigate(Routes.Login);
  };

  return (
    <CustomSafeAreaView dismissKeyboard={true}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid={true}
          extraScrollHeight={60}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <AuthHeader titile="Register" />

            <CustomInput
              label="First Name"
              value={fistName}
              onChangeText={validateFirstName}
              error={firstNameError}
              keyboardType="default"
              autoCapitalize="sentences"
            />

            <CustomInput
              label="Last Name"
              value={lastName}
              onChangeText={validateLastName}
              error={lastNameError}
              keyboardType="default"
              autoCapitalize="sentences"
            />

            <CustomInput
              label="Email"
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

            <CustomInput
              label="Mobile Number"
              value={mobileNumber}
              onChangeText={validateMobile}
              error={mobileError}
              maxLength={10}
              autoCapitalize="none"
              keyboardType="number-pad"
            />

            <CustomButton
              title="Register"
              onPress={onRegister}
              containerStyle={styles.btn}
              loading={loading}
            />

            <Account
              title="Already have an account?"
              label="Login here"
              onPress={onLogin}
              containerStyle={styles.account}
            />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: hp(3),
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  btn: {
    marginTop: hp(4),
  },
  account: {
    paddingVertical: hp(2),
  },
});
