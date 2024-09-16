import React,{useState} from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const { width, height } = Dimensions.get('window');

const SignupWithEmailPage = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);

    const handleButtonPress = () => {
        navigation.navigate('Main');  
      };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6B15' barStyle="light-content" />
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
                <Text style={styles.text_footer}>
                    <Text style={styles.discover}>Discover</Text>
                    <Text style={styles.delight}> Delight</Text>
                    <Text style={styles.around}> Around</Text>
                    {"\n"}
                    <Text style={styles.every}>Every</Text>
                    <Text style={styles.corner}> Corner</Text>
                </Text>
                <Text style={styles.text_sideHeading}>
                    <Text>Lorem ipsum dolor sit amet consectetur,</Text>
                    {"\n"}
                    <Text> Quisque efficitur velit.</Text>
                </Text>
                <TouchableOpacity style={styles.loginButton}>
                    <Image
                        source={require('../../assets/facebook.png')}
                        resizeMode="contain"
                        style={styles.loginButtonImage}
                    />
                    <Text style={styles.loginButtonText}>Sign Up with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}>
                    <Image
                        source={require('../../assets/google.png')}
                        resizeMode="contain"
                        style={styles.loginButtonImage}
                    />
                    <Text style={styles.loginButtonText}>Sign Up with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}>
                    <Image
                        source={require('../../assets/apple1.png')}
                        resizeMode="contain"
                        style={styles.loginButtonImage}
                    />
                    <Text style={styles.loginButtonText}>Login with Apple</Text>
                </TouchableOpacity>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkboxText}>
                        By checking this box, I confirm that I have reviewed and agree to Jouncein's 
                        <Text style={styles.link}> Terms of Services</Text> and 
                        <Text style={styles.link}> Privacy Policy</Text>.
                    </Text>
                </View>
                <TouchableOpacity style={styles.signupWithEmailButton} onPress={handleButtonPress}>
                    <Text style={styles.signupWithEmailButtonText}>Sign Up With Email</Text>
                </TouchableOpacity>
            </View>
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
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    loginButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#2C2D2D',
        textAlign:'center'
    },
    loginButtonImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    loginButtonText: {
        color: '#000',
        textAlign:'center'
        // fontWeight: 'bold'
    },
    signupWithEmailButton: {
        backgroundColor: '#FF6B15',
        flexDirection: 'row',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
        textAlign:'center'
    },
    signupWithEmailButtonText: {
        color: '#fff',
        textAlign:'center',
        fontWeight: 'bold'
    },
    logo: {
        width: 75,
        height: 75,
        borderRadius: 10,
    },
    text_footer: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 25,
    },
    text_sideHeading: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '400',
        marginBottom: 10,
        color:'#5E6978'
    },
    discover: {
        color: 'black',
    },
    delight: {
        color: '#ffa400',
    },
    around: {
        color: '#ff5b00',
    },
    every: {
        color: '#F33A6A',
    },
    corner: {
        color: '#ffa400',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxText: {
        color: '#000',
    },
    link: {
        color: '#FF6B15',
    },
});

export default SignupWithEmailPage;
