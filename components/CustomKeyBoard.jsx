import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const ios = Platform.OS === 'ios';

const CustomKeyBoard = ({ children }) => {
  return (
    <KeyboardAvoidingView 
      behavior={ios ? 'padding' : 'height'} 
      style={styles.container} 
    >
      <ScrollView 
        bounces={false} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollView} 
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16, // Add padding to the ScrollView to create space around the content
  },
});
