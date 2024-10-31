// app/profile/editProfile.jsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { databaseFB, usersRef } from '../../FirebaseConfig';
import { useAuth } from '../context/authContext'; 
import ProfileHeader from '../../components/ProfileHeader';

const EditProfile = () => {
  const router = useRouter();
  const { user } = useAuth(); 
  const userId = user?.userId;

  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    education: '',
    role: '',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  });

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      try {
        const docRef = doc(usersRef, userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSave = async () => {
    try {
      if (!userId) return;
      const docRef = doc(usersRef, userId);
      await updateDoc(docRef, profileData);
      Alert.alert('Profile Updated', 'Your profile has been successfully updated!');
      router.push('/profile/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Something went wrong while updating your profile.');
    }
  };

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Make image square (optional)
      quality: 1, // Full quality image
    });

    if (!result.canceled) {
      setProfileData({ ...profileData, profileImage: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="edit profile" />

      <View style={styles.imageSection}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Select Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={profileData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bio"
          value={profileData.bio}
          onChangeText={(text) => handleChange('bio', text)}
        />

        <Text style={styles.label}>Education/Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter education/experience"
          value={profileData.education}
          onChangeText={(text) => handleChange('education', text)}
        />

        <Text style={styles.label}>Desired Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter desired role"
          value={profileData.role}
          onChangeText={(text) => handleChange('role', text)}
        />
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  imageSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#34c759',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textTransform: 'lowercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#34c759',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'lowercase',
  },
});
