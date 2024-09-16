import React,{useState,useEffect,useRef} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView,Modal } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import Close from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetStoreQuery } from '../../Store/services/StoreApi';
import { useGetProductsQuery } from '../../Store/services/ProductApi';
const { width } = Dimensions.get('window');

// const storeData = {
//   name: 'Milkiz Store',
//   description: 'Lorem ipsum dolor sit amet, conse olorctetur adipiscing elit.',
//   image: '', 
//   distance: '1.2 Km',
//   time: '7-9 min',
//   rating: '4.7',
//   reviews: 89,
//   status: 'Open Now - Closes at 12 AM',
//   topListings: [
//     {
//       id: '1',
//       name: 'Steak kabab',
//       description: 'Lorem ipsum dolor sit amet, conse cteur adipiscing elit.',
//       price: '$25.99',
//       image: require('../../../assets/salad.jpg'), 
//     },
//     {
//       id: '2',
//       name: 'Paneer tikka',
//       description: 'Lorem ipsum dolor sit amet, conse cteur adipiscing elit.',
//       price: '$25.99',
//       image: require('../../../assets/panner.png'), 
//     },
//     {
//       id: '3',
//       name: 'Chicken gravy',
//       description: 'Lorem ipsum dolor sit amet, conse cteur adipiscing elit.',
//       price: '$25.99',
//       image: require('../../../assets/gravy.png'), 
//     },
//   ],
// };

// const Menudata = [
//   "All",
//   "Dosa",
//   "Idly",
//   "Chai",
//   "Vada",
//   "Juice",
//   "Chocolate",
//   "Sweets"
// ];

const StoreScreen = ({navigation,route}) => {
  const { slug } = route.params;
  const [store, setStore] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [groupedProducts, setGroupedProducts] = useState({});
  const categoryRefs = useRef({});
  const { data, isSuccess, isLoading } = useGetProductsQuery({
    slug: slug,
    // first: perPage,
    // offset: perPage * (currPage - 1),
    // category: category,
    // name: debouncedSearchTerm,
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await useGetStoreQuery(slug);
        setStore(data);
      } catch (error) {
        console.error("Error fetching store details:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchStore();
  }, [slug]);

  useEffect(() => {
    if (data && data.products) {
      const grouped = data.products.edges.reduce((acc, { node: product }) => {
        const category = product.category.name;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});
  
      console.log("Grouped Products:", grouped);
      setGroupedProducts(grouped);
    }
  }, [data]);
  
  

  const renderItems = () => {
    // if (loading) {
    //   return <Text>Loading...</Text>;
    // }
  
    if (Object.keys(groupedProducts).length === 0) {
      return <Text>No products available</Text>;
    }
  
    return Object.entries(groupedProducts).map(([category, products], idx) => (
      <View key={idx} style={styles.categoryContainer} id={category}>
        <Text
          ref={(el) => (categoryRefs.current[category] = el)}
          style={styles.categoryTitle}
        >
          {category.toLowerCase()}
        </Text>
        {/* {products.map((item, i) => (
          <ItemCard
            handleClickOpen={handleClickOpen}
            isExist={calculateQuantitySum(cart.products, item.id)}
            onAddQuantity={() => onAddQuantity(item.id)}
            onReduceQuantity={() => onReduceQuantity(item.id)}
            onAddPress={() => onAddPress(item)}
            checkItem={checkItem}
            item={item}
            key={i}
          />
        ))} */}
      </View>
    ));
  };
  
  

//   const [filterVisible, setFilterVisible] = useState(false);

//   const renderItem = ({ item }) => (
//     <View style={styles.listingItem}>
//       <Image source={item.image} style={styles.itemImage} />
//       <View style={styles.itemInfo}>
//         <Text style={styles.itemTag}>Best Seller</Text>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemDescription}>{item.description}</Text>
//         <Text style={styles.itemPrice}>{item.price}</Text>
//       </View>
//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.addButtonText}>ADD</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderMenuItem = ({ item }) => (
//     <TouchableOpacity style={styles.listItem}>
//         <Text style={styles.listItemText}>{item}</Text>
//     </TouchableOpacity>
// );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.storeHeader}>
          <Image source={{ uri: store?.logo }} style={styles.storeLogo} />
          <Text style={styles.storeName}>{store?.name}</Text>
          <Text style={styles.storeAddress}>{store?.address}</Text>
        </View>
        {renderItems()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    paddingHorizontal: 10,
  },
  categoryTitle: {
    marginBottom: 16,
    marginTop: 24,
    fontWeight: '500',
    textTransform: 'capitalize',
    fontFamily: 'Poppins, sans-serif',
    color: '#333333',
    fontSize: 24, // Equivalent to 1.7rem
  },
  storeHeader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  storeLogo: {
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'
  },
  storeAddress: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color:'#000'

  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex:1
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
  storeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  storeInfo: {
    marginBottom: 16,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  storeDescription: {
    color: '#666',
    marginVertical: 8,
  },
  readMore: {
    color: '#f57c00',
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeDetailText: {
    marginRight: 10,
    color: '#666',
  },
  storeStatus: {
    color: '#f57c00',
    fontWeight: 'bold',
  },
  topListingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listingList: {
    marginBottom: 16,
  },
  listingItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    width: width - 32, // Adjust width to match container's padding
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 8,
  },
  itemTag: {
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#666',
    marginVertical: 4,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  addButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f57c00',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Buttoncontainer:{
    justifyContent: 'center',  
    alignItems: 'center',       
  },
  menuButton: {
    flexDirection: 'row',      
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 16,
    width: '50%',
    justifyContent: 'center',  
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,              
  },
  icon: {
    marginRight: 2,             
  },
  orderSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f57c00',
    borderRadius: 10,
  },
  orderSummaryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    flex: 1,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default StoreScreen;
