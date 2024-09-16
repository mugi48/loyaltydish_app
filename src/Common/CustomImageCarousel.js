//CustomImageCarousel.js
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Location from 'react-native-vector-icons/Entypo';


const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.8; 

const CustomImageCarousel = ({ data }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };
    const renderItem = ({ item }) => (
        <View style={[styles.carouselItem, { width: itemWidth }]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                <Location name="location-pin" size={16} color="#FF6B15" />
                <Text style={styles.location}>{item.location}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity style={styles.heartIconContainer} onPress={toggleHeart}>
                        <Icon name={isHeartFilled ? "heart" : "heart-o"} size={24} color={isHeartFilled ? "#FF0000" : "#000"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            snapToAlignment="start"
            snapToInterval={itemWidth + 20} 
            decelerationRate="fast"
        />
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingVertical: 10,
        paddingLeft: 10,
    },
    carouselItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 150,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    location: {
        fontSize: 14,
        color: '#9CA3AF',
        marginVertical: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 5,
        fontSize: 14,
        color:'#5E6978'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B15',
        marginRight: 10,
        flex: 1,
    },
    heartIconContainer: {
        marginLeft: 10,
    },
});

export default CustomImageCarousel;
