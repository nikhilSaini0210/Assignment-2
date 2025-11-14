import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import ProfileField from '../../components/Profile/ProfileField';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import CustomButton from '../../components/global/CustomButton';
import { showAlert } from '../../utils/AlertUtil';
import { ACCESS_TOKEN_KEY, endPoints } from '../../api/config';
import StorageService from '../../service/storage.service';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import { Routes } from '../../navigation/Routes';
import makeRequest from '../../api/interceptor';
import { User } from '../../types/interfaces';
import Icon from '../../components/global/Icon';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import AnimatedLoader from '../../assets/icons/AnimatedLoader';

const ProfileScreen: FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const { response } = await makeRequest({
        method: 'GET',
        url: endPoints.user,
      });

      if (response?.status === 200) {
        const { data } = response;
        setUserData(data);
      } else {
        showAlert({
          title: 'Failed',
          message:
            response?.data?.message ||
            'Unable to get user data. Please try again later.',
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
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      getUser();
    });
  }, []);

  const onLogout = async () => {
    showAlert({
      title: 'Logout',
      message: 'Do you want to Logout?',
      showCancel: true,
      cancelText: 'No',
      okText: 'Yes',
      onOkPress: async () => {
        await StorageService.removeItem(ACCESS_TOKEN_KEY);
        resetAndNavigate(Routes.Login);
      },
    });
  };

  return (
    <CustomSafeAreaView dismissKeyboard={false} style={styles.container}>
      <ProfileHeader fadeAnim={fadeAnim} slideAnim={slideAnim} />

      {loading ? (
        <View style={styles.loaderConatiner}>
          <AnimatedLoader />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Animated.View
            style={[
              styles.profileCard,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Icon
                  iconFamily="MaterialIcons"
                  name="person"
                  size={40}
                  color={colors.white}
                />
              </View>
              <Text style={styles.profileName}>
                {userData?.first_name} {userData?.last_name}
              </Text>
            </View>

            {userData?.first_name && (
              <ProfileField
                label="First Name"
                value={userData?.first_name}
                icon="person"
              />
            )}

            {userData?.last_name && (
              <ProfileField
                label="Last Name"
                value={userData?.last_name}
                icon="person"
              />
            )}

            {userData?.email && (
              <ProfileField label="Email" value={userData?.email} icon="mail" />
            )}

            {userData?.mobile_number && (
              <ProfileField
                label="Mobile Number"
                value={userData?.mobile_number}
                icon="keypad-outline"
              />
            )}
          </Animated.View>
          <CustomButton onPress={onLogout} title="Logout" />
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderConatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  profileCard: {
    backgroundColor: colors.profileCardBg,
    padding: 20,
    borderRadius: 18,
    elevation: 4,
    shadowColor: colors.black,
    marginBottom: 60,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryText,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
  },
});
