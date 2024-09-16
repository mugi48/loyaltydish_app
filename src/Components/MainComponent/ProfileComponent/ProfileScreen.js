import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, ScrollView,TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6B15' barStyle="light-content"/>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../../../assets/ProfileImage.png')} // Your profile image
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Maria Niaz</Text>
                    <Text style={styles.editProfile}>Edit Profile</Text>
                </View>
            </View>
            <ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('EditProfile')}}>
                    <FontAwesome name="user" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>My Profile</Text>
                        <Text style={styles.menuDescription}>Edit Profile Data / Picture</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="bell" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>Notifications</Text>
                        <Text style={styles.menuDescription}>Setup alerts for things</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="cog" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>Settings</Text>
                        <Text style={styles.menuDescription}>Manage profile settings</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="heart" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>Favorite</Text>
                        <Text style={styles.menuDescription}>View all favorited stores</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="question-circle" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>Help</Text>
                        <Text style={styles.menuDescription}>Get help from our team</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome name="file-text" size={20} color="#FF6B15" style={styles.menuIcon} />
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>Privacy Policy</Text>
                        <Text style={styles.menuDescription}>Read out privacy policy</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#5E6978" />
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#FF6B15',
        height: height * 0.3,
        borderBottomLeftRadius: width / 2,
        borderBottomRightRadius: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 24,
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
    },
    editProfile: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    footer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 1, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        borderWidth:1,
        borderColor:'#000'
    },
    menuIcon: {
        marginRight: 10,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#05375a',
    },
    menuDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
});

export default ProfileScreen;
