import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CarouselIcon from 'react-native-vector-icons/FontAwesome';
import Location from 'react-native-vector-icons/Entypo';

// const carouselData = [
//     {
//         id: '1',
//         order_no:"4623",
//         image: require('../../../../../assets/Veg1.jpg'),
//         name: 'Image 1',
//         price: '$100',
//     },
//     {
//         id: '2',
//         order_no:"4623",
//         image: require('../../../../../assets/veg2.jpg'),
//         name: 'Image 2',
//         price: '$120',
//     },
//     {
//         id: '3',
//         order_no:"4623",
//         image: require('../../../../../assets/veg3.jpg'),
//         name: 'Image 3',
//         price: '$100',
//     }
// ];

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.9;

// const CustomImageCarousel = ({ data }) => {

//     const renderItem = ({ item }) => (
//         <View style={[styles.carouselItem, { width: itemWidth }]}>
//             <Image source={item.image} style={styles.image} />
//             <View style={styles.infoContainer}>
//             <Text style={styles.order_no}>Order#{item.order_no}</Text>
//                 <View style={styles.NameContainer}>
//                 <Text style={styles.name}>{item.name}</Text>
//                     <TouchableOpacity style={styles.CompleteContainer} >
//                         <Text style={styles.CompleteText}>Completed</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.priceContainer}>
//                     <Text style={styles.price}>{item.price}</Text>
//                 </View>
//                 <View style={styles.RecepitContainer}>
//                 <TouchableOpacity >
//                         <Text style={styles.RecepitText}>Reorder</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity >
//                         <Text style={styles.RecepitText}>View Recepit</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );

//     return (
//         <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.carouselContainer}
//             snapToAlignment="start"
//             snapToInterval={itemWidth + 20}
//             decelerationRate="fast"
//         />
//     );
// };

const Ongoing = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <CustomImageCarousel data={carouselData} /> */}
             <Text>Construction Going 🚧</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    contentTitle: {
        marginTop: 20,
        fontSize: 15,
        color: "#5E6978",
    },
    carouselContainer: {
        paddingVertical: 10,
        paddingLeft: 10,
        gap: 10
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
        color: '#5E6978'
    },
    order_no: {
        fontSize: 14,
        color: '#5E6978'
    },
    NameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    CompleteContainer:{
        backgroundColor:'#000',
        borderRadius:5,
        width:100,
        height:25
    },
    CompleteText:{
color:'#fff',
fontWeight:'bold',
textAlign:'center',
padding:2
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
    RecepitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-evenly'
    },
    RecepitText: {
        textDecorationLine:'underline',
    }

});

export default Ongoing;
