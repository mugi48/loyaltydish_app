import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodDeliveryScreen = () => {

    const [rating, setRating] = useState(0);

    const reviewTexts = [
        "It is Disappointing",
        "Could be Better",
        "It's Okay",
        "Pretty Good",
        "Awesome",
    ];

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Food delivery</Text>
                <Text style={styles.subtitle}>We delivered your food in 25 min</Text>
                <Image
                    source={require('../../assets/food-delivery.png')} // replace with your image path
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.reviewContainer}>
                    <Image
                        source={require('../../assets/food-delivered.png')} // replace with your image path
                        style={styles.avatar}
                        resizeMode="contain"
                    />
                    <View style={styles.reviewTextContainer}>
                        <Text style={styles.reviewTitle}>Food Delivered</Text>
                        <Text style={styles.reviewSubtitle}>Enjoy your meal</Text>
                        <Text style={styles.reviewDescription}>
                            {rating > 0 ? reviewTexts[rating - 1] : "Rate the delivery service"}
                        </Text>
                        <View style={styles.stars}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                                    <Icon
                                        name={index < rating ? "star" : "star-o"}
                                        size={30}
                                        color={index < rating ? "#f57c00" : "#f57c00"} 
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 2, // For Android shadow
        shadowColor: '#d8d8d0', // For iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        borderWidth: 2,
        borderColor: '#d8d8d0',
    },
    title: {
        fontSize: 24,
        color:'#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 20,
    },
    reviewTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    reviewSubtitle: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
    },
    reviewDescription: {
        fontSize: 14,
        color: '#000',
        marginBottom: 10,
    },
    stars: {
        flexDirection: 'row',
    },
});

export default FoodDeliveryScreen;
