import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ShoppingCart from '../../assets/icons'; // Adjust import as needed for React Native

import { getTotal } from '../helpers/utils';

export default function PlaceOrderButton({ onPress }) {
  const cart = useSelector((state) => state.cart);

  if (cart.products.length === 0) {
    return null;
  }

  const totalAmount = cart.total || getTotal(cart.products).total;
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cart.store.currency,
  }).format(totalAmount);

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.iconContainer}>
        <Image source={ShoppingCart} style={styles.icon} />
        <Text style={styles.quantity}>{cart.products.length}</Text>
      </View>
      <Text style={styles.text}>Place order</Text>
      <Text style={styles.total}>{formattedTotal}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff', // Adjust the background color as needed
    padding: 10,
    borderRadius: 5,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
    flex: 1,
  },
  total: {
    color: '#fff',
    fontSize: 16,
  },
});
