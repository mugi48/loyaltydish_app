import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const PriceRangeSlider = () => {
  const [values, setValues] = useState([10, 100]);

  const sliderValuesChange = (values) => {
    setValues(values);
  };

  return (
    <View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.priceRangeContentText}>Price Range</Text>
        <Text style={{marginTop:5,color:'#FF6B15'}}>${values[0]} - ${values[1]}</Text>
        </View>
      <View style={{alignItems:'center',justifyContent:'center'}}>
       <MultiSlider
        values={values}
        onValuesChange={sliderValuesChange}
        min={0}
        max={500}
        step={1}
        allowOverlap={false}
        snapped={true}
        selectedStyle={{ backgroundColor: '#FF6B15' }}
        unselectedStyle={{ backgroundColor: '#CCCCCC' }}
        markerStyle={{ backgroundColor: '#FF6B15' }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  priceRangeContentText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'left',
    color:'#5E6978'
},
});

export default PriceRangeSlider;
