import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ViewRecepit = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Icon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Receipt of Order</Text>
            </View>

            <View style={styles.footercontainer}>
                <View style={styles.emptyheader}>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Order Details</Text>
                    <View style={styles.list}>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>1X Steak kabab</Text>
                            <Text style={styles.listItem}>$15.00</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>1X Veg kabab</Text>
                            <Text style={styles.listItem}>$15.00</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>Subtotal</Text>
                            <Text style={styles.listItem}>$30.00</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                    <View>
                <TouchableOpacity style={styles.ViewStoreButton}>
                    <Text style={styles.ViewStoreButtonText}>View Store</Text>
                </TouchableOpacity>
                </View>
                <View style={{marginTop:10}}>
                <TouchableOpacity style={styles.RestoreButton}>
                    <Text style={styles.RestoreButtonText}>Restore</Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
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
    footercontainer: {
        flex: 1,
        backgroundColor: '#',
    },
    emptyheader: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 1.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '500',
        marginBottom: 25,
        marginLeft: 10,
    },
    list: {
        marginLeft: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItem: {
        color: '#000',
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
        marginBottom: 10,
      },
      ViewStoreButton: {
        backgroundColor: '#263238',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    ViewStoreButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    RestoreButton: {
        backgroundColor: '#FF6B15',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    RestoreButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    button:{
        marginTop: 50,
    }
});

export default ViewRecepit;
