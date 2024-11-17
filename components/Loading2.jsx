import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

export default function Loading({ size = 50 }) {
  const [visible, setVisible] = useState(true); // Initially visible

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide loader after 3 seconds
    }, 6000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (!visible) return null; // Return null if not visible

  return (
    <View style={styles.loaderContainer}>
      <LottieView
        style={[styles.loader, { height: size, width: size }]}
        source={require('../assets/images/loader1.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
    position: 'absolute',     // Position absolutely to ensure it's centered on the screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    justifyContent: 'center', // Ensure the loader is centered within its container
    alignItems: 'center',
  },
});
