// Favourites.js
import React,{useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image,TouchableOpacity ,FlatList,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import CustomImageCarousel from '../Common/CustomImageCarousel';
import CarouselIcon from 'react-native-vector-icons/FontAwesome';
import Location from 'react-native-vector-icons/Entypo';
const carouselData = [
    {
        id: '1',
        image: require('../../../assets/Veg1.jpg'),
        name: 'Image 1',
        location: 'San Francisco, CA',
        rating: 4.5,
        price: '$100',
    },
    {
        id: '2',
        image: require('../../../assets/veg2.jpg'),
        name: 'Image 2',
        location: 'Los Angeles, CA',
        rating: 4.0,
        price: '$120',
    },
    {
        id: '3',
        image: require('../../../assets/veg3.jpg'),
        name: 'Image 3',
        location: 'San Francisco, CA',
        rating: 5.5,
        price: '$100',
    }]
    const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.9; 
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
                    <CarouselIcon name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity style={styles.heartIconContainer} onPress={toggleHeart}>
                        <CarouselIcon /*name={isHeartFilled ? "heart" : "heart-o"}*/ size={24} /*color={isHeartFilled ? "#FF0000" : "#000"}*/ color={'#FF0000'} name={'heart'} />
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            snapToAlignment="start"
            snapToInterval={itemWidth + 20} 
            decelerationRate="fast"
        />
    );
};
const Favourites = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconContainer}>
                    <Icon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favourites</Text>
            </View>
            {/* <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/gravy.png')}
                        style={styles.userImage}
                    />
                </View>
                <Text style={styles.title}>Find your favourites</Text>
                <Text style={styles.contentTitle}>
                    Lorem ipsum dolor sit amet{'\n'}
                    consectetur adipiscing elit.
                </Text>
            </View> */}
                <CustomImageCarousel data={carouselData} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between', // Adjust space between icon and title
    },
    iconContainer: {
        flex: 1, // Allows the icon to align to the start
    },
    headerTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
        flex:20, // Allows the title to center
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    userImage: {
        width: 200,
        height: 200,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        color: "#FF6B15",
    },
    contentTitle: {
        marginTop: 20,
        fontSize: 15,
        color: "#5E6978",
    },

    carouselContainer: {
        paddingVertical: 10,
        paddingLeft: 10,
        gap:10
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

export default Favourites;
