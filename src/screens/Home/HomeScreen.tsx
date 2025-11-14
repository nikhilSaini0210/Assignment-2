import React, { FC, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FeedCard from '../../components/Card/FeedCard';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import HomeHeader from '../../components/Home/HomeHeader';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

const tabs = ['Popular', 'Latest', 'Following'];

const HomeScreen:FC = () => {
  const activeTab = useRef(new Animated.Value(0)).current;
  const [selectedTab, setSelectedtab] = useState(0);

  const handleTabPress = (index: number) => {
    setSelectedtab(index);
    Animated.spring(activeTab, {
      toValue: index,
      useNativeDriver: false,
    }).start();
  };

  return (
    <CustomSafeAreaView>
      <HomeHeader />

      <View style={styles.tabsContainer}>
        {tabs.map((t, i) => (
          <TouchableOpacity key={i} onPress={() => handleTabPress(i)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === i && styles.activeTabText,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatliastContent}
        renderItem={() => <FeedCard />}
      />
    </CustomSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingBottom: 15,
  },
  tabText: {
    fontSize: 16,
    color: colors.secondaryText,
    fontFamily: Fonts.RobotoRegular,
  },
  activeTabText: {
    fontSize: 16,
    color: colors.primaryText,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  flatliastContent: {
    paddingLeft: 10,
    paddingBottom: 30,
  },
});
