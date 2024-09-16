import React from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useQuery } from '@apollo/client';
import { GET_OFFERS_QUERY } from '../Store/services/OffersApi';

const OfferSlider = ({ stores_Slug }) => {
  const { loading, error, data } = useQuery(GET_OFFERS_QUERY, {
    variables: { stores_Slug },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error</Text>;

  // Safely access the edges property using optional chaining and nullish coalescing
  const pictures = data?.offers?.edges[0]?.node?.pictures?.edges?.map(edge => edge.node.url) ?? [];

  // Check if there are no pictures or if there's an error
  if (!pictures.length || error) {
    return <Text>No pictures available</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {pictures.length <= 3 ? (
        <View style={styles.smallWrapper}>
          {pictures.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))}
        </View>
      ) : (
        <Carousel
          data={pictures}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={300}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          enableSnap
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default OfferSlider;
