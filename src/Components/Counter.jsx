import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Counter = ({ isExist, onAddPress, dir }) => {
  const translateY = useRef(new Animated.Value(dir === 1 ? 100 : -100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isExist]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: dir === 1 ? -100 : 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [dir]);

  return (
    <Animated.View style={[styles.btn2, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={isExist ? null : onAddPress} style={styles.button}>
        <Text style={styles.buttonText}>{isExist ? isExist : "Add"}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn2: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Counter;
