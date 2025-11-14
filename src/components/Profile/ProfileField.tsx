import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../global/Icon';

interface Props {
  label: string;
  value: string;
  icon: string;
}

const ProfileField: FC<Props> = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      <Icon iconFamily='Ionicons' name={icon} size={20} color="#0B1F4A" />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E6EB',
  },
  label: {
    fontSize: 12,
    color: '#7A7D85',
  },
  value: {
    fontSize: 16,
    color: '#0B1F4A',
    fontWeight: '600',
  },
});
