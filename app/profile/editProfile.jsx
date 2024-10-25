import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import ProfileHeader from '../../components/ProfileHeader'; // Import the custom header

const EditProfile = () => {
  return (
    <View style={styles.container}>
      {/* Custom Header with Back Arrow and Messaging Icon */}
      <ProfileHeader title="edit profile" />

      {/* Profile Image */}
      <View style={styles.imageSection}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>upload image</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} placeholder="Enter full name" />

        <Text style={styles.label}>bio</Text>
        <TextInput style={styles.input} placeholder="Enter bio" />

        <Text style={styles.label}>education/experience</Text>
        <TextInput style={styles.input} placeholder="Enter education/experience" />

        <Text style={styles.label}>desired role</Text>
        <TextInput style={styles.input} placeholder="Enter desired role" />
      </View>

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>done</Text>
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
    paddingTop:20,
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
