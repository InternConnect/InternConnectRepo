// app\Jobs\uploadCV.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth } from '../context/authContext';

const UploadCV = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { jobId, jobTitle, company, location, postedDate, userId } = router.params || {}; 
  const [cvLink, setCvLink] = useState('');
  const db = getFirestore();

  const handleBack = () => {
    router.back();
  };

  const handleUpload = async () => {
    if (!cvLink) {
      Alert.alert('Error', 'Please enter your CV link.');
      return;
    }

    // Check if jobId and userId are available
    if (!jobId || !userId) {
      Alert.alert('Error', 'Job or user information is missing.');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId); 
      const jobRef = doc(db, 'jobPosts', jobId);

      const jobDoc = await getDoc(jobRef);

      if (jobDoc.exists()) {
        const applicants = jobDoc.data()?.applicants || [];
        
        applicants.push({
          userId: userId,
          cvLink: cvLink,
          appliedDate: new Date(),
        });

        // Update the 'applicants' array in the job document
        await setDoc(jobRef, { applicants }, { merge: true });

        // Add the jobId to the user's applications array
        await setDoc(userRef, { 
          applications: {
            [jobId]: {
              jobTitle: jobTitle,
              company: company,
              location: location,
              postedDate: postedDate
            }
          }
        }, { merge: true });

        Alert.alert('Success', 'Your application has been submitted successfully!');
        router.back();
      } else {
        Alert.alert('Error', 'Job not found.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert('Error', 'Failed to submit application.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Job Title and Details */}
      <Text style={styles.jobTitle}>{jobTitle}</Text>
      <Text style={styles.companyName}>{company}</Text>
      <Text style={styles.postedDate}>Posted on {postedDate}</Text>

      {/* CV Link Input */}
      <View style={styles.uploadText}>
        <Text style={styles.uploadText}>Add a CV Link for the employer</Text>
        <TextInput 
          style={styles.cvLinkInput} 
          placeholder="Enter your CV link" 
          value={cvLink}
          onChangeText={setCvLink}
        />
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  postedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cvLinkInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadCV;