import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Tab from '../TabComponent/Tab.js';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            isActive={index === activeTab}
            onPress={() => setActiveTab(index)}
          />
        ))}
      </View>
      <View style={styles.contentContainer}>
        {tabs[activeTab].content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default Tabs;
