// app/profile/editProfile.jsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { usersRef } from '../../FirebaseConfig';
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
    location: '',
    profileImage: 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
    skills: [],
  });

  const [skillInput, setSkillInput] = useState('');

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

  const addSkill = () => {
    if (skillInput.trim()) {
      setProfileData((prevData) => ({
        ...prevData,
        skills: [...(prevData.skills || []), skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData({ ...profileData, profileImage: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader title="Edit Profile" />

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

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={profileData.location}
          onChangeText={(text) => handleChange('location', text)}
        />
      </View>

      <View style={styles.skillsSection}>
        <Text style={styles.label}>Skills</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a skill"
          value={skillInput}
          onChangeText={setSkillInput}
        />
        <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
          <Text style={styles.addSkillButtonText}>Add Skill</Text>
        </TouchableOpacity>
        <View style={styles.skillsList}>
          {profileData.skills && profileData.skills.map((skill, index) => (
            <Text key={index} style={styles.skillItem}>{skill}</Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
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
    textTransform: 'capitalize',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textTransform: 'capitalize',
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
  skillsSection: {
    marginBottom: 20,
  },
  addSkillButton: {
    backgroundColor: '#34c759',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    alignItems: 'center',
  },
  addSkillButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  skillItem: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginVertical: 5,
    textAlign: 'center',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  doneButton: {
    backgroundColor: '#34c759',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
