import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet ,PermissionsAndroid} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

const EditProfile = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleImagePicker = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permission to access gallery',
                    message: 'We need your permission to access your photo gallery',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permission denied');
                return;
            }
        }

        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const source = { uri: response.assets[0].uri };
                setProfileImage(source);
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <ArrowIcon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={{ padding: 20 }}>
            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
            {profileImage ? (
                <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
            ) : (
                <View style={styles.placeholderImage}>
                    <Icon name="user" size={50} color="#ccc" />
                </View>
            )}
            <View style={styles.addIcon}>
                <Icon name="plus-circle" size={24} color="#FF6600" />
            </View>
        </TouchableOpacity>
                <Text style={styles.lable}>First Name</Text>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#FF6600" />
                    <TextInput
                        style={styles.inputControl}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="First Name"
                    />
                </View>
                <Text style={styles.lable}>Last Name</Text>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#FF6600" />
                    <TextInput
                        style={styles.inputControl}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Last Name"
                    />
                </View>
                <Text style={styles.lable}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#FF6600" />
                    <TextInput
                        style={styles.inputControl}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                </View>
                <Text style={styles.lable}>Password</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#FF6600" />
                    <TextInput
                        style={styles.inputControl}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
                <Text style={styles.lable}>Retype password</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#FF6600" />
                    <TextInput
                        style={styles.inputControl}
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                        placeholder="Re-Type Password"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.updateButton} >
                    <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
        flex: 20,
        textAlign: 'center',
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        position: 'absolute',
        bottom: -10,
    },
    lable: {
        marginBottom: 5
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
        marginBottom: 15,
    },
    inputControl: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        fontSize: 15,
    },
    updateButton: {
        backgroundColor: '#FF6600',
        padding: 15,
        alignItems: 'center',
        borderRadius: 12,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfile;
