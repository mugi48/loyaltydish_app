import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo3.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text style={styles.text}>Loading...</Text> */}
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B15', 
  },
  logo: {
    width: 100, 
    height: 100,
  },
  text: {
    marginTop: '10%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
