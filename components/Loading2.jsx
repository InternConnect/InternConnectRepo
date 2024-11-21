import { StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Loading({ size }) {
  return (
    <View style={styles.container}>
      <View style={{ height: size, aspectRatio: 1 }}>
        <LottieView 
          style={{ flex: 1 }} 
          source={require('../assets/images/loader1.json')} 
          autoPlay 
          loop 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', // Optional: to provide a background color
  },
});
