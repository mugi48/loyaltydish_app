import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, FlatList, Dimensions, ScrollView } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import Close from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CarouselIcon from 'react-native-vector-icons/FontAwesome';
import Location from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import Quantity from 'react-native-vector-icons/FontAwesome';

const data = [
    "All",
    "Dosa",
    "Idly",
    "Chai",
    "Vada",
    "Juice",
    "Chocolate",
    "Sweets"
];

const carouselData = [
    {
        id: '1',
        image: require('../../../assets/grillchicken.jpg'),
        name: 'Grill Chicken',
        location: 'San Francisco, CA',
        rating: 4.5,
        price: '$100',
    },
    {
        id: '2',
        image: require('../../../assets/veg2.jpg'),
        name: 'Idly',
        location: 'Los Angeles, CA',
        rating: 4.0,
        price: '$120',
    },
    {
        id: '3',
        image: require('../../../assets/panner.png'),
        name: 'Sweet Panner',
        location: 'San Francisco, CA',
        rating: 5.5,
        price: '$100',
    },
    {
        id: '4',
        image: require('../../../assets/salad.jpg'),
        name: 'Salad',
        location: 'Los Angeles, CA',
        rating: 4.0,
        price: '$120',
    },
];

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.8;

const CustomImageCarousel = ({ data }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBoxChange = (newValue) => {
        setIsChecked(newValue);
    };

    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const renderItem = ({ item }) => (
        <View style={[styles.carouselItem, { width: itemWidth }]}>
            <CheckBox
                value={isChecked}
                tintColors={{ true: '#FF6B15', false: '#9CA3AF' }}
                onValueChange={handleCheckBoxChange}
                style={styles.checkbox}
            />
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.NameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <TouchableOpacity >
                        <Icon name="delete-outline" size={24} color="#FF6B15" />
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>
                    <Location name="location-pin" size={16} color="#FF6B15" />
                    <Text style={styles.location}>{item.location}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <CarouselIcon name="star" size={16} color="#FF6B15" />
                    <Text style={styles.rating}>{item.rating}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <TouchableOpacity style={styles.heartIconContainer} onPress={toggleHeart}>
                        <CarouselIcon name={isHeartFilled ? "heart" : "heart-o"} size={24} color={isHeartFilled ? "#FF0000" : "#FF6B15"} />
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


/////discount logics

const carouselDiscountData = [
    {
        id: '1',
        image: require('../../../assets/grillchicken.jpg'),
        name: 'Grill Chicken',
        quantity: '250g(1pcs)',
        price: '$25',
    },
    {
        id: '2',
        image: require('../../../assets/veg2.jpg'),
        name: 'Idly',
        quantity: '250g(1pcs)',
        price: '$60',
    },
    {
        id: '3',
        image: require('../../../assets/panner.png'),
        name: 'Sweet Panner',
        quantity: '250g(1pcs)',
        price: '$40',
    },
];

const CustomImageCarouselDiscount = ({ data }) => {
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckBoxChange = (itemId) => {
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = { ...prevCheckedItems };
            if (newCheckedItems[itemId]) {
                delete newCheckedItems[itemId];
                setSelectedQuantities(prevQuantities => {
                    const newQuantities = { ...prevQuantities };
                    delete newQuantities[itemId];
                    return newQuantities;
                });
            } else {
                newCheckedItems[itemId] = true;
            }
            return newCheckedItems;
        });
    };

    const handleIncrement = (itemId) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 0) + 1,
        }));
    };

    const handleDecrement = (itemId) => {
        setSelectedQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] > 0 ? prevQuantities[itemId] - 1 : 0),
        }));
    };

    const renderDiscountItem = ({ item }) => {
        const itemId = item.id;
        const quantity = selectedQuantities[itemId] || 0;
        const isChecked = !!checkedItems[itemId];

        return (
            <View style={[styles.carouselItem, { width: itemWidth }]}>
                <CheckBox
                    value={isChecked}
                    tintColors={{ true: '#FF6B15', false: '#9CA3AF' }}
                    onValueChange={() => handleCheckBoxChange(itemId)}
                    style={styles.checkbox}
                />
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                    <View style={styles.NameContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.location}>{item.quantity}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                        <View style={styles.containerquantity}>
                            <TouchableOpacity
                                style={[styles.buttonquantity, styles.decrementButton]}
                                onPress={() => handleDecrement(itemId)}
                            >
                                <Quantity name="minus" size={15} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity
                                style={[styles.buttonquantity, styles.incrementButton]}
                                onPress={() => handleIncrement(itemId)}
                            >
                                <Quantity name="plus" size={15} color="#000" />
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderDiscountItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            snapToAlignment="start"
            snapToInterval={itemWidth + 20}
            decelerationRate="fast"
        />
    );
};




const CartScreen = ({ navigation }) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemChange, setItemChange] = useState(false);
    const [selectedButton, setSelectedButton] = useState('All');

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => handleItemClick(item)}>
            <Text style={styles.listItemText}>{item}</Text>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        console.log(`Selected item: ${item}`);
        setSelectedButton(item)
        setItemChange(true);
        setSelectedItem(item);
        setFilterVisible(false);
    };

    const renderCarousel = () => {
        if (selectedButton === 'Discount') {
            return <CustomImageCarouselDiscount data={carouselDiscountData} />;
        }
        return <CustomImageCarousel data={carouselData} />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <ArrowIcon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
                {!itemChange ? (
                    <Text style={styles.headerTitle}>Cart</Text>) : (
                    <Text style={styles.headerTitle}>Open Cart</Text>
                )}
            </View>
            {!itemChange ? (
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/cart.png')}
                            style={styles.userImage}
                        />
                    </View>
                    <Text style={styles.title}>Oops</Text>
                    <Text style={styles.contentTitle}>
                        Lorem ipsum dolor sit amet{'\n'}
                        consectetur adipiscing elit.
                    </Text>
                    <TouchableOpacity style={styles.exploreButton} onPress={() => setFilterVisible(true)}>
                        <Text style={styles.exploreButtonText}>Explore Menu</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button, ,
                                    selectedButton === selectedItem && styles.selectedButton
                                ]}
                                onPress={() => handleItemClick(selectedItem)}
                            >
                                <Text style={[{ textAlign: 'center' }, selectedButton === selectedItem && styles.selectedText]}>
                                    {selectedItem}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button, ,
                                    selectedButton === "Discount" && styles.selectedButton
                                ]}
                                onPress={() => setSelectedButton("Discount")}
                            >
                                <Text style={[{ textAlign: 'center' }, selectedButton === "Discount" && styles.selectedText]}>
                                    Discount
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {renderCarousel()}
                    </View>
                    {selectedButton === 'Discount' ? (
                         <View style={styles.cartbutton}>
                         <View>
                             <TouchableOpacity style={styles.RestoreButton} onPress={()=> navigation.navigate('CheckoutScreen')}>
                                 <Text style={styles.RestoreButtonText}>GO to CheckOut</Text>
                             </TouchableOpacity>
                         </View>
                     </View>
                    ) : (
                        <View style={styles.cartbutton}>
                        <View>
                            <TouchableOpacity style={styles.ViewStoreButton} onPress={()=> navigation.navigate('CheckoutScreen')}>
                                <Text style={styles.ViewStoreButtonText}>Check Out</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={styles.RestoreButton} >
                                <Text style={styles.RestoreButtonText}>Add More Items</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}


                </ScrollView>
            )}

            <Modal
                transparent={true}
                visible={filterVisible}
                animationType="slide"
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={styles.Modlecontainer}>
                    <View style={styles.Modleheader}>
                    </View>
                    <View style={styles.Modlefooter}>
                        <View style={styles.filterHeader}>
                            <Text style={styles.filterHeaderText}>Full Cart</Text>
                            <TouchableOpacity onPress={() => setFilterVisible(false)}>
                                <Close name="closecircleo" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <Text>11AM to 9.30PM</Text>
                        <View style={styles.divider} />
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    containerquantity: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    buttonquantity: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 5,
    },
    quantity: {
        fontSize: 18,
        width: 60,
        textAlign: 'center',
        // backgroundColor:'grey',
        // color:'#fff',
        // borderRadius:10
    },
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
    exploreButton: {
        backgroundColor: '#FF6B15',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
        // Shadow properties for iOS
        shadowColor: '#FF6B15',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // Shadow properties for Android
        elevation: 15,
    },
    exploreButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    Modlecontainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    Modleheader: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    Modlefooter: {
        flex: 1.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 20,
    },
    filterHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5E6978'
    },
    filterContent: {
        marginTop: 20
    },
    filterContentText: {
        fontSize: 16,
        color: '#5E6978'
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    listItem: {
        // backgroundColor: '#eeeeee',
        padding: 10,
        // marginVertical: 10,
        // borderRadius: 10
    },
    listItemText: {
        color: '#000',
        fontWeight: 'bold',
        // textAlign: 'center'
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20
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
        marginTop: 10,
        height: 120,
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
        color: '#5E6978'
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
    NameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-between'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#FF6B15',
        borderColor: '#000'
    },
    selectedText: {
        color: '#fff'
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
    // cartbutton:{
    //     marginTop: 50,
    // },
    contentContainer: {
        padding: 10
    },
    checkbox: {
        marginRight: 10,
    },
});

export default CartScreen;
