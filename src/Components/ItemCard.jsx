import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import RemoveIcon from 'react-native-vector-icons/MaterialIcons';
import Counter from './Counter';  // Ensure Counter is also adapted for React Native

export default function ItemCard({
  isExist,
  onAddPress,
  onAddQuantity,
  onReduceQuantity,
  handleClickOpen,
  checkItem,
  item,
}) {
  const {
    name,
    shortDescription,
    pictures,
    price,
    productComponentsGroups,
  } = item;
  const extra = productComponentsGroups.edges.length > 0;

  const [direction, setDirection] = useState(1);

  const _onAddPress = () => {
    if (extra) {
      handleClickOpen(item);
    } else {
      setDirection(1);
      onAddPress();
    }
  };

  const _onAddQuantity = () => {
    setDirection(1);
    onAddQuantity();
  };

  const _onReduceQuantity = () => {
    setDirection(-1);
    onReduceQuantity();
  };

  return (
    <View style={[styles.itemContainer, !checkItem(item) && styles.disabledItem]}>
      <TouchableOpacity onPress={() => handleClickOpen(item)} style={styles.first}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{shortDescription}</Text>
      </TouchableOpacity>

      <View style={styles.second}>
        <View style={styles.image}>
          {pictures.edges.length > 0 && pictures.edges[0].node.url && (
            <Image
              source={{ uri: pictures.edges[0].node.url }}
              style={styles.imageContent}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={_onReduceQuantity} style={[styles.btn, isExist && styles.activeBtn]}>
            <RemoveIcon name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Counter onAddPress={_onAddPress} isExist={isExist} dir={direction} />
          <TouchableOpacity onPress={_onAddQuantity} style={[styles.btn, isExist && styles.activeBtn]}>
            <AddIcon name="add" size={24} color="black" />
          </TouchableOpacity>
          {extra && <Text style={styles.custButton}>Customisable</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  disabledItem: {
    opacity: 0.5,
  },
  first: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  second: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
  },
  activeBtn: {
    backgroundColor: '#eee',
  },
  custButton: {
    marginLeft: 10,
    fontSize: 12,
    color: 'blue',
  },
});
