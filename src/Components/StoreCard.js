import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StoreCard(props) {
  const { logo, shortDescription, slug, name, pictures, address } = props;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('StoreScreen', { slug });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.overlay} />
      <Image
        source={{ uri: pictures.edges.length > 0 ? pictures.edges[0].node.url : logo }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.container}>
          <Image source={{ uri: logo }} style={styles.logo} />
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{shortDescription}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.actionButtons}>
        <Image source={require('./assets/heart.png')} style={styles.icon} />
        <Image source={require('./assets/menu.png')} style={styles.icon} />
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    marginBottom: 10,
    padding:5
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
    // backgroundColor: 'rgba(0, 0, 0, 0.49)',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // aspectRatio: 16 / 9,
  },
  content: {
    padding: 10,
    position: 'relative',
    zIndex: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    color: '#433f55',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  description: {
    color: '#433f55',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  address: {
    color: '#433f55',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actionButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
});
