import { FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { TabBarIconProps } from '../types/interfaces';
import { Routes } from './Routes';
import Icon from '../components/global/Icon';

const TabBarIcon: FC<TabBarIconProps> = ({ name, color, size, focused }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused, scaleAnim]);

  const renderIcon = () => {
    switch (name) {
      case Routes.Home:
        return (
          <Icon
            iconFamily="MaterialIcons"
            name="home"
            color={color}
            size={size}
          />
        );
      case Routes.Default:
        return (
          <Icon
            iconFamily="MaterialIcons"
            name="groups"
            color={color}
            size={size}
          />
        );
      case Routes.DefaultB:
        return (
          <Icon
            iconFamily="Ionicons"
            name="add-circle-outline"
            color={color}
            size={size}
          />
        );
      case Routes.DefaultC:
        return (
          <Icon
            iconFamily="Ionicons"
            name="search-sharp"
            color={color}
            size={size}
          />
        );
      case Routes.Profile:
        return (
          <Icon
            iconFamily="Ionicons"
            name="person-circle-outline"
            color={color}
            size={size}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {renderIcon()}
    </Animated.View>
  );
};

export default TabBarIcon;
