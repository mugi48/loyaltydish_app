import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tab = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF6B15',
  },
  tabText: {
    color: '#5E6978',
  },
  activeTabText: {
    color: '#000',
    fontWeight:'bold'
  },
});

export default Tab;
