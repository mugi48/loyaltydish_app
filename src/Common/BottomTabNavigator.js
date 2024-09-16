import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Components/MainComponent/HomeScreen';  // Adjust the import based on your file structure
import StoreScreen from '../Components/MainComponent/StoreScreen';
import Favourites from '../Components/MainComponent/FavouriteScreen'; // Adjust the import based on your file structure
import HistoryScreen from '../Components/MainComponent/HistoryComponent/HistoryScreen'; // Adjust the import based on your file structure
import ProfileScreen from '../Components/MainComponent/ProfileComponent/ProfileScreen'; // Adjust the import based on your file structure
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use different icons
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"  // Set the default tab to Home
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon name="home" size={25} color={focused ? '#FF6B15' : '#5E6978'} />
            <Text style={[styles.tabLabel, { color: focused ? '#FF6B15' : '#5E6978' }]}>Home</Text>
          </View>
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Store"
      component={StoreScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon name="shopping-basket" size={25} color={focused ? '#FF6B15' : '#5E6978'} />
            <Text style={[styles.tabLabel, { color: focused ? '#FF6B15' : '#5E6978' }]}>Store</Text>
          </View>
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Favourites"
      component={Favourites}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon name="heart" size={25} color={focused ? '#FF6B15' : '#5E6978'} />
            <Text style={[styles.tabLabel, { color: focused ? '#FF6B15' : '#5E6978' }]}>Favourites</Text>
          </View>
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />

<Tab.Screen
      name="History"
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon name="rotate-right" size={25} color={focused ? '#FF6B15' : '#5E6978'} />
            <Text style={[styles.tabLabel, { color: focused ? '#FF6B15' : '#5E6978' }]}>History</Text>
          </View>
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />

<Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon name="user-circle-o" size={25} color={focused ? '#FF6B15' : '#5E6978'} />
            <Text style={[styles.tabLabel, { color: focused ? '#FF6B15' : '#5E6978' }]}>Profile</Text>
          </View>
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0.5,
    elevation: 0,
    backgroundColor: '#fff',
    height: 60,
    paddingBottom: 5,
    borderColor:'#5E6978'
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default BottomTabNavigator;
