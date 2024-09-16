import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

function AlertModal({ isVisible, setIsVisible, handleYes, handleNo, store, item }) {
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Replace items already in the cart</Text>
                <Text style={styles.message}>
                    Your cart contains dishes from {store?.name}. Do you want to discard the selection
                    and add dishes from {item?.stores?.edges[0]?.node?.name}?
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleNo}>
                        <Text style={styles.buttonText}>NO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleYes}>
                        <Text style={styles.buttonText}>YES</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AlertModal;
