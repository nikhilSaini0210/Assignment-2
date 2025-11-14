import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../styles/colors';
import Icon from '../global/Icon';
import { Fonts } from '../../styles/fonts';

const HomeHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Icon
        iconFamily="Ionicons"
        name="grid-outline"
        size={28}
        color={colors.primaryText}
      />

      <Text style={styles.headerTitle}>Activity</Text>

      <View style={styles.headerRight}>
        <Icon
          iconFamily="Ionicons"
          name="search-outline"
          size={24}
          color={colors.secondaryText}
        />
        <View style={styles.notification}>
          <Icon
            iconFamily="Ionicons"
            name="notifications-outline"
            size={24}
            color={colors.primaryText}
          />
          <View style={styles.dot}>
            <Text style={styles.dotText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notification: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    right: -4,
    top: -6,
    backgroundColor: colors.green,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    fontSize: 10,
    fontFamily: Fonts.RobotoRegular,
    color: colors.white,
  },
});
