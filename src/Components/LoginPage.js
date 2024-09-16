import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoginMutation } from '../Store/services/Auth';
const { width, height } = Dimensions.get('window');

const LoginPage = ({ navigation }) => {
  // State variables for input fields and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async() => {
    let isValid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setAuthError('');

    // Basic email validation
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      try {
        setLoading(true);
        const result = await LoginMutation({ email, password });

        if (result.tokenAuth.success) {
            navigation.navigate('Main');
            setEmail('');
            setPassword('');
        } else {
          setAuthError('Invalid email or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setAuthError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignupPage');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6B15" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo4.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Welcome Back</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={20}
            color="#6b7280"
            style={styles.icon}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome
            name="lock"
            size={20}
            color="#6b7280"
            style={styles.icon}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
          />
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Authentication Error */}
        {authError ? <Text style={styles.authErrorText}>{authError}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <Text style={styles.signupText}>
          New user?{' '}
          <Text style={styles.signupLink} onPress={handleSignup}>
            Sign Up
          </Text>
        </Text>

        {/* Social Media Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/apple1.png')}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/google.png')}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/facebook.png')}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B15',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    marginBottom: 10,
  },
  inputControl: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 15,
  },
  icon: {
    padding: 10,
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 10,
  },
  authErrorText: {
    color: '#FF4D4F',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#FF6B15',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 20,
    color: '#5E6978',
    fontSize: 16,
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#FF6B15',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 40,
  },
  socialIcon: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 10,
  },
});

export default LoginPage;
