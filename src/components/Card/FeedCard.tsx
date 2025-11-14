import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import Icon from '../global/Icon';
import { Fonts } from '../../styles/fonts';

const FeedCard:FC = () => {
  return (
    <LinearGradient colors={colors.cardGardient} style={styles.card}>
      <View style={styles.imageBox} />

      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Icon
            iconFamily="Ionicons"
            name="location-outline"
            size={16}
            color="white"
          />
          <Text style={styles.locationText}>San Francisco, CA</Text>
        </View>

        <Text style={styles.title}>
          Wonderful building near London Big Ben...
        </Text>

        <TouchableOpacity style={styles.connectBtn}>
          <Text style={styles.connectBtnText}>Connect</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.userRow}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.userName}>Olivia Redman</Text>
              <Text style={styles.time}>2 minutes ago</Text>
            </View>
          </View>

          <View style={styles.icons}>
            <Icon
              iconFamily="Ionicons"
              name="heart-outline"
              size={20}
              color="white"
            />
            <Icon
              iconFamily="Ionicons"
              name="paper-plane-outline"
              size={20}
              color="white"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  card: {
    width: 260,
    marginRight: 16,
    borderRadius: 18,
    padding: 12,
    marginBottom: 50,
  },
  imageBox: {
    height: 250,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    color: colors.white,
    marginLeft: 6,
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontFamily: Fonts.PoppinsSemiBold,
    marginBottom: 8,
  },
  connectBtn: {
    borderWidth: 1,
    borderColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  connectBtnText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: colors.secondaryText,
    marginRight: 10,
  },
  userName: {
    color: colors.white,
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
  },
  time: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: Fonts.RobotoRegular,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
