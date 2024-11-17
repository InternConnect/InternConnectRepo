import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileHeader = ({ title, userRole }) => {
  const router = useRouter();

  const handleBack = () => {
    if (title === "Edit Profile") {
      // Check user role and navigate to the appropriate home screen
      if (userRole === "employer") {
        router.replace('/employerTabs/home'); // Navigate to employer's home page
      } else if (userRole === "job-seeker") {
        router.replace('/tabs/home'); // Navigate to job seeker's home page
      }
    } else if (title === "Profile") {
      // If you are on the profile page, just go back
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>

        {/* Page Title */}
        <Text style={styles.headerText}>{title}</Text>

        {/* Placeholder for Icons */}
        <View style={styles.iconContainer}>
          <MaterialIcons name="mail-outline" size={24} color="#333" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, // Ensures SafeAreaView doesn't take extra space
    backgroundColor: '#fff', // Same background as header to blend in
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
