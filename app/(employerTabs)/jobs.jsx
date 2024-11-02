import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostJob = () => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
  });

  const handlePostJob = () => {
    // Validate fields before posting
    if (!jobDetails.title || !jobDetails.company || !jobDetails.location || !jobDetails.description) {
      Alert.alert('Please fill out all required fields.');
      return;
    }
    // Handle job posting logic here
    Alert.alert('Job Posted!', 'Your job has been successfully posted.');
    setJobDetails({ title: '', company: '', location: '', description: '', requirements: '' });
  };

  const handleChange = (field, value) => {
    setJobDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.pageTitle}>Post a Job</Text>

      {/* Company Name */}
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.company}
        onChangeText={(text) => handleChange('company', text)}
      />

      {/* Job Title */}
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      {/* Location */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.location}
        onChangeText={(text) => handleChange('location', text)}
      />

      {/* Job Description */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Description"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.description}
        onChangeText={(text) => handleChange('description', text)}
        multiline
        numberOfLines={4}
      />

      {/* Requirements */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Requirements (optional)"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.requirements}
        onChangeText={(text) => handleChange('requirements', text)}
        multiline
        numberOfLines={3}
      />

      {/* Post Job Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePostJob}>
        <Text style={styles.postButtonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostJob;
