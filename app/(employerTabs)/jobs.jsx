import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/authContext'; // Assuming auth context provides user data

const PostJob = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');

  const handlePostJob = async () => {
    if (!user || !user.userId) {
      Alert.alert('Error', 'You must be logged in to post a job.');
      return;
    }

    if (!jobDetails.title || !jobDetails.company || !jobDetails.location || !jobDetails.description) {
      Alert.alert('Please fill out all required fields.');
      return;
    }

    const db = getFirestore();
    try {
      await addDoc(collection(db, 'jobPosts'), {
        userId: user.userId,
        title: jobDetails.title,
        company: jobDetails.company,
        location: jobDetails.location,
        description: jobDetails.description,
        requirements: jobDetails.requirements,
        skills: jobDetails.skills,
        postTime: serverTimestamp(),
      });
      Alert.alert('Job Posted!', 'Your job has been successfully posted.');
      setJobDetails({ title: '', company: '', location: '', description: '', requirements: '', skills: [] });
      setSkillInput('');
    } catch (error) {
      console.error('Error adding job post to Firestore:', error);
      Alert.alert('Error', 'Something went wrong while posting your job.');
    }
  };

  const handleChange = (field, value) => {
    setJobDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        skills: [...prevDetails.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.pageTitle}>Post a Job</Text>

      <TextInput
        style={styles.input}
        placeholder="Company Name"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.company}
        onChangeText={(text) => handleChange('company', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.title}
        onChangeText={(text) => handleChange('title', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.location}
        onChangeText={(text) => handleChange('location', text)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Description"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.description}
        onChangeText={(text) => handleChange('description', text)}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Requirements (optional)"
        placeholderTextColor="#A9A9A9"
        value={jobDetails.requirements}
        onChangeText={(text) => handleChange('requirements', text)}
        multiline
        numberOfLines={3}
      />

      {/* Skill input and add button */}
      <TextInput
        style={styles.input}
        placeholder="Add a skill"
        placeholderTextColor="#A9A9A9"
        value={skillInput}
        onChangeText={setSkillInput}
      />
      <TouchableOpacity style={styles.addSkillButton} onPress={addSkill}>
        <Text style={styles.addSkillButtonText}>Add Skill</Text>
      </TouchableOpacity>

      {/* Display added skills */}
      <View style={styles.skillsList}>
        {jobDetails.skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>{skill}</Text>
        ))}
      </View>

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
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  skillItem: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    margin: 5,
    textAlign: 'center',
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
