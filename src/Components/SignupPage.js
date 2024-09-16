import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerUserMutation } from '../Store/services/Auth';
import validator from 'validator';

const { width, height } = Dimensions.get('window');

const SignupPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!firstName) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validator.isEmail(email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include a number and a special character';
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleButton = async () => {
    if (validate()) {
      setLoading(true);
      console.log("RegisterUser variables:", {
        email,
        password,
        firstname: firstName || "",
        lastname: lastName || "",
        userType: "CONSUMER",
      });

      try {
        const result = await registerUserMutation({
          email,
          password,
          firstname: firstName || "",
          lastname: lastName || "",
          userType: "CONSUMER",
        });
        console.log("Result:", result);

        if (result?.register?.success) {
        //   navigation.navigate("SplashScreen");
        //   setTimeout(() => {
            navigation.navigate("LoginPage");
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        //   }, 2000);
        } else if (result?.register?.errors) {
          const { email, password2, ...restErrors } = result.register.errors;
          setErrors(prevErrors => ({
            ...prevErrors,
            email: email?.[0]?.message || prevErrors.email,
            password: password2?.[0]?.message || prevErrors.password,
            confirmPassword: password2?.[0]?.message || prevErrors.confirmPassword,
            ...restErrors
          }));
        }
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#FF6B15' barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
          <Text style={styles.text_footer}>Sign Up Account</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#6b7280" style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              placeholder="First Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#6b7280" style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              placeholder="Last Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#6b7280" style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="Email / Phone Number"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#6b7280" style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#6b7280" style={styles.icon} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              secureTextEntry={true}
              placeholder="Re-type Password"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleButton}>
            <Text style={styles.loginButtonText}> {loading ? 'Signing Up...' : 'SignUp'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6B15'
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop:'5%'
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
        marginBottom: 25,
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
    loginButton: {
        backgroundColor: '#FF6B15',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 10,
    },
    scrollViewContainer: {
        flexGrow: 1,
    }
});

export default SignupPage;
