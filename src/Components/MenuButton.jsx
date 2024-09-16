import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Modal } from 'react-native';
import CloseCircle from '../../assets/icons/close-circle.svg'; // Make sure this path is correct

const MenuButton = ({ categories, categoryFilter }) => {
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState({ pk: 0, name: 'All' });

  const onPress = (category) => {
    categoryFilter(category.name);
    setActive(category);
    setOpen(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.itemContainer, active.pk === item.pk && styles.activeItem]}
    >
      <Text style={styles.title}>
        {item.name}{' '}
        {item.name !== 'All' && `(${item.products.count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>
          🍝 {active.name === 'All' ? 'Menu' : active.name}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Full Menu</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Image source={CloseCircle} style={styles.closeImage} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories.filter(cat => cat.name === 'All' || cat.products.count > 0)}
              keyExtractor={(item) => item.pk.toString()}
              renderItem={renderItem}
              style={styles.list}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  list: {
    maxHeight: '80%',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activeItem: {
    backgroundColor: '#e0e0e0',
  },
});

export default MenuButton;
