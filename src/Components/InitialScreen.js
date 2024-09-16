import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const InitialScreen = ({ navigation }) => {
  const [loginPressed, setLoginPressed] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);

  const handleLoginPress = () => {
    setLoginPressed(true);
    setSignupPressed(false);
    navigation.navigate('LoginPage');  
  };

  const handleSignupPress = () => {
    setSignupPressed(true);
    setLoginPressed(false);
    navigation.navigate('SignupPage');  
  };

  const Box = () => {
    return (
      <View style={styles.boxContainer}>
        <View style={[styles.box, styles.firstBox]}>
          <Image
            source={require('../../assets/pancake.jpg')}
            style={[styles.image, { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}
            resizeMode="cover"
          />
        </View>

        <View style={styles.box}>
          <Image
            source={require('../../assets/veg2.jpg')}
            style={[styles.image, { borderTopRightRadius: 10, borderTopLeftRadius: 10 }]}
            resizeMode="cover"
          />
          <Image
            source={require('../../assets/veg3.jpg')}
            style={[styles.image, { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }]}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box />
      <View>
          <Text style={{color:'#5E6978',textAlign:'justify',padding: 5,alignItems:'center',fontWeight:"bold"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur velit at odio fringilla, a fermentum dolor varius .</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={[
            styles.footerButton,
            { backgroundColor: loginPressed ? '#FF6B15' : 'white', borderColor: '#FF6B15', borderWidth: 1 },
          ]}
        >
          <Text style={[styles.footerButtonText, { color: loginPressed ? 'white' : '#FF6B15', fontWeight: 'bold' }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignupPress}
          style={[
            styles.footerButton,
            { backgroundColor: signupPressed ? '#FF6B15' : 'white', borderColor: '#FF6B15', borderWidth: 1 },
          ]}
        >
          <Text style={[styles.footerButtonText, { color: signupPressed ? 'white' : '#FF6B15', fontWeight: 'bold' }]}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between', 
  },
  boxContainer: {
    width: '100%',
    height: '70%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    width: '48%',
    height: '100%',
    backgroundColor: 'white'
  },
  firstBox: {
    marginRight: '4%', 
  },
  image: {
    flex: 1,
    width: '100%',
    height: '50%',
    borderRadius: 10,
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center', 
    marginBottom: 20,
  },
  footerButton: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default InitialScreen;
