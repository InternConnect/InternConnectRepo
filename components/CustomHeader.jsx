import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../app/context/authContext'; // Importing useAuth for logout functionality

const { height } = Dimensions.get('window'); 

const CustomHeader = ({ title }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar width is 250px

  // Accessing the logout function and user data
  const { logout } = useAuth(); 

  const openMenu = () => {
    setIsSidebarVisible(!isSidebarVisible);
    if (!isSidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleProfile = () => {
    console.log('Navigate to Profile');
  };

  // Logout logic using the logout function from useAuth
  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="menu" size={24} color="#333" onPress={openMenu} />
        <Text style={styles.headerText}>{title}</Text>
        <MaterialIcons name="add" size={24} color="#333" />
        <MaterialIcons name="mail" size={24} color="#333" />

      </View>

      {/* Sidebar */}
      {isSidebarVisible && (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity onPress={handleProfile} style={styles.sidebarOption}>
            <Text style={styles.sidebarText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.sidebarOption}>
            <Text style={styles.sidebarText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
    textAlign: 'center',
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 60, 
    width: 250,
    height: height - 60, 
    backgroundColor: '#fff', 
    borderRightWidth: 1,
    borderRightColor: '#D3D3D3', 
    paddingVertical: 20,
  },
  sidebarOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  sidebarText: {
    fontSize: 18,
    color: '#000', 
  },
});
