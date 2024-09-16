import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <ArrowIcon name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
               
                    <Text style={styles.headerTitle}>Checkout</Text>
            </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.sectionContent}>
          <Image source={{ uri: 'https://img.icons8.com/color/48/000000/home.png' }} style={styles.icon} />
          <View style={styles.addressDetails}>
            <Text style={styles.addressTitle}>Home</Text>
            <Text style={styles.addressText}># 12 Street, New York USA</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery</Text>
        <View style={styles.sectionContent}>
          <Image source={{ uri: 'https://img.icons8.com/color/48/000000/delivery.png' }} style={styles.icon} />
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryText}>Delivery in 20 min</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Items */}
      <View style={styles.orderSection}>
        <View style={styles.orderItem}>
          <Image source={require('../../../assets/salad.jpg')} style={styles.orderItemImage} />
          <View style={styles.orderItemDetails}>
            <Text style={styles.orderItemName}>Steak Kabab</Text>
            <Text style={styles.orderItemDescription}>Bumbu: Lorem Porsi: Lorem</Text>
            <Text style={styles.orderItemPrice}>$30.00</Text>
          </View>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
            <View style={styles.quantityWrapper}>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity>
                <Text style={styles.incrementButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.orderItem}>
          <Image source={require('../../../assets/grillchicken.jpg')} style={styles.orderItemImage} />
          <View style={styles.orderItemDetails}>
            <Text style={styles.orderItemName}>Steak Kabab</Text>
            <Text style={styles.orderItemDescription}>Bumbu: Lorem Porsi: Lorem</Text>
            <Text style={styles.orderItemPrice}>$30.00</Text>
          </View>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
            <View style={styles.quantityWrapper}>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity>
                <Text style={styles.incrementButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Add Notes */}
      <View style={styles.section}>
      <Text style={[styles.sectionTitle]}>Add Notes</Text>
        <View style={styles.notesWrapper}>
          <TextInput placeholder="Add your notes here..." style={styles.notesInput} />
          <TouchableOpacity style={styles.notesButton}>
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/note.png' }} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.sectionContent}>
          <Image source={require('../../../assets/creditcard.png')} style={styles.icon} />
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentText}>Credit Card</Text>
            <Text style={styles.cardNumber}>**** **** **** 2343</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Shipping Cost</Text>
          <Text style={styles.summaryValue}>$10.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Service Fee</Text>
          <Text style={styles.summaryValue}>$2.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Discount</Text>
          <Text style={styles.summaryValue}>-$10.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.subtotalText}>Sub Total</Text>
          <Text style={styles.subtotalValue}>$32.00</Text>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={()=>{navigation.navigate('FoodDeliveryScreen')}}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 12,
    color: '#666',
  },
  deliveryDetails: {
    flex: 1,
  },
  deliveryText: {
    fontSize: 14,
  },
  changeButton: {
    backgroundColor: '#f57c00',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  orderSection: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  orderItemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 16,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderItemDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f57c00',
  },
  quantityControl: {
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f57c00',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  editButtonText: {
    color: '#f57c00',
    fontSize: 12,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  incrementButton: {
    fontSize: 18,
    color: '#f57c00',
  },
  notesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notesInput: {
    flex: 1,
    fontSize: 14,
  },
  notesButton: {
    marginLeft: 16,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 12,
    color: '#666',
  },
  summarySection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#f57c00',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
