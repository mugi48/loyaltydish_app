//Home.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, Modal,Dimensions,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Location from 'react-native-vector-icons/Entypo';
import Notification from 'react-native-vector-icons/MaterialIcons';
import Close from 'react-native-vector-icons/AntDesign';
import CustomImageCarousel from '../../Common/CustomImageCarousel';
import { SelectList } from 'react-native-dropdown-select-list'
import PriceRangeSlider from '../../Common/PriceRangeSlider';
import { getStores } from '../../Store/services/StoreApi';
import StoreCard from '../StoreCard';
const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.8; 

const HomeScreen = ({ navigation }) => {
    const [selected, setSelected] = useState('Home');
    const [searchText, setSearchText] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedNew, setSelectedNew] = React.useState("");
    const [selectedPriceButton, setSelectedPriceButton] = useState(null);

    const dataList = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
          try {
            const storeData = await getStores(); // Optionally pass a 'name' variable here
            setStores(storeData);
          } catch (error) {
            console.error('Error fetching stores:', error);
          }
        };
    
        fetchStores();
      }, []);


// const renderItem = ({ item }) => (
//     <View style={[styles.carouselItem, { width: itemWidth }]}>
//          <Image
//             source={{ uri: item.pictures?.edges?.[0]?.node?.url }}
//             resizeMode={'cover'}
//             style={styles.image}           />
//          <View style={styles.infoContainer}>
//             <Text style={styles.name}>{item.name}</Text>
//         </View> 
//     </View>
// );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor='#5E6978'
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <Icon name="search" size={20} color="#FF6B15" style={styles.searchIcon} />
                    </View>
                    <TouchableOpacity style={styles.notificationButton} onPress={() => setFilterVisible(true)}>
                        <Icon name="filter" size={20} color="#fff" />
                    </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton}>
                    <Notification name="notifications" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton} onPress={()=>{navigation.navigate('CartScreen')}}>
                    <Notification name="shopping-cart" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Button 1')}>
                            <Image
                                source={require('../../../assets/map.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>Near Me</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Button 2')}>
                            <Image
                                source={require('../../../assets/hours.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>24 Hours</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Button 3')}>
                            <Image
                                source={require('../../../assets/healty.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>Healthy</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => handlePress('Button 4')}>
                            <Image
                                source={require('../../../assets/halal.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>Halal</Text>
                    </View>
                </View>
                <Text style={styles.recommendedText}>Stores<Icon name="shopping-basket" size={25} color='#5E6978' /></Text>
                {stores.map((store, idx) => <StoreCard key={store.id} {...store} />)}
                </ScrollView>
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
                            <Text style={styles.filterHeaderText}>Category</Text>
                            <TouchableOpacity onPress={() => setFilterVisible(false)}>
                                <Close name="closecircleo" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <SelectList
                            setSelected={(val) => setSelectedNew(val)}
                            data={dataList}
                            placeholder='Select Category'
                            save="value"
                            boxStyles={styles.boxStyles}
        dropdownStyles={styles.dropdownStyles}
        inputStyles={styles.inputStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
                        />
                        <View style={styles.filterContent}>
                            <Text style={styles.filterContentText}>Sort By</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                <TouchableOpacity
                                    style={[
                                        styles.priceButton,
                                        selectedPriceButton === 'high' && styles.selectedPriceButton
                                    ]}
                                    onPress={() => setSelectedPriceButton('high')}
                                >
                                    <Text style={[styles.priceButtonText, selectedPriceButton === 'high' && styles.selectedPriceButtonText]}>High Price</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.priceButton,
                                        selectedPriceButton === 'low' && styles.selectedPriceButton
                                    ]}
                                    onPress={() => setSelectedPriceButton('low')}
                                >
                                    <Text style={[styles.priceButtonText, selectedPriceButton === 'low' && styles.selectedPriceButtonText]}>Low Price</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.priceRangeContent}>
                        <PriceRangeSlider />
                        </View>
                        <View style={styles.buttonContent}>
                        <TouchableOpacity onPress={() => setFilterVisible(false)}>
                                <Text style={{color:"#fff",fontWeight: 'bold',fontSize:18}}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
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
    imageList: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    userLocation: {
        marginLeft: 5,
        color: '#9CA3AF',
    },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6B15',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10
    },
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchContainer: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 5,
    },
    searchIcon: {
        marginLeft: 5,
    },
    filterButton: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonWrapper: {
        width: '20%',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 60,
        backgroundColor: '#FF6B15',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        marginTop: 5,
        color: '#000',
        fontSize: 12,
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    recommendedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    recommendedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978',
        marginLeft:10,
        marginBottom:10
    },
    seeAllText: {
        color: '#FF6B15',
        fontSize: 16,
        fontWeight: 'bold',
    },
    promotionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        // marginRight: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 170,
    },
    imagePromotion: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        marginRight: 10,
    },
    promotionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    promotionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    DAYContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    DAYText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978',
        marginTop: 10
    },
    // scrollContent: {
    //     paddingBottom: 100, 
    // },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 10,
    },
    footerItem: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 20,
    },
    filterHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    filterContent: {
        marginTop: 20
    },
    filterContentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    boxStyles: {
        borderColor: '#ddd',
        borderWidth: 1,
      },
      dropdownStyles: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      inputStyles: {
        color:'#5E6978'
      },
      dropdownTextStyles: {
        color: '#000',
      },
    priceButton: {
        width:150,
        borderWidth: 1,
        borderColor: '#DDDDDD', // Default border color
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedPriceButton: {
        borderColor: '#FF6B15', // Border color for selected button
        color: '#FF6B15'
    },
    priceButtonText: {
        fontWeight: 'bold',
        color:'#5E6978'
    },
    selectedPriceButtonText: {
        color: '#FF6B15',
    },
    priceRangeContent: {
        marginTop: 20
    },
    priceRangeContentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#5E6978'
    },
    buttonContent: {
        marginTop: 20,
        backgroundColor: '#FF6B15',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 10,
    }
});

export default HomeScreen;
