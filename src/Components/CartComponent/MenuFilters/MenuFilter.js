import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';

const MenuFilter = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Filter Options</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Filter settings go here</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    footerText: {
        color: '#000',
        fontSize: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#FF6B15',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MenuFilter;
