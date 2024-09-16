import React ,{useState,useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './src/Components/InitialScreen';
import LoginPage from './src/Components/LoginPage';
import SignupPage from './src/Components/SignupPage';
import { enableScreens } from 'react-native-screens';
import SplashScreen from './src/Common/SplashScreen';
import SignupWithEmailPage from './src/Components/SignupWithEmail';
// import HomeScreen from './src/Components/HomeScreen';
import FilterModel from './src/Components/FilterModel';
import BottomTabNavigator from './src/Common/BottomTabNavigator';
import ViewRecepit from './src/Components/MainComponent/HistoryComponent/SubMenus/viewRecepit';
import EditProfile from './src/Components/MainComponent/ProfileComponent/SubMenus/EditProfile';
import CartScreen from './src/Components/CartComponent/CartScreen';
import MenuFilter from './src/Components/CartComponent/MenuFilters/MenuFilter';
import StoreScreen from './src/Components/MainComponent/StoreScreen';
import CheckoutScreen from './src/Components/MainComponent/CheckoutScreen';
import FoodDeliveryScreen from './src/Components/FoodDeliveryScreen';
enableScreens();

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupWithEmailPage" component={SignupWithEmailPage} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={FilterModel} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}  />
        <Stack.Screen name="ViewRecepit" component={ViewRecepit} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name='CartScreen' component={CartScreen} options={{headerShown:false}}/>
        <Stack.Screen name='MenuFilter' component={MenuFilter} options={{headerShown:false}}/>
        <Stack.Screen name='StoreScreen' component={StoreScreen} options={{headerShown:false}}/>
        <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name='FoodDeliveryScreen' component={FoodDeliveryScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
