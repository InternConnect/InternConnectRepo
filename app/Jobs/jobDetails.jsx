// app\Jobs\jobDetails.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute from react-navigation
import { Feather } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router'; // Import expo-router

const JobDetails = () => {
  const navigation = useNavigation();
  const router = useRouter(); // Initialize expo-router
  const route = useRoute(); // Access route for parameters
  const { id } = route.params || {}; // Retrieve the 'id' parameter from route params
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) {
        Alert.alert('Error', 'Job ID is missing.');
        return;
      }

      try {
        const jobRef = doc(db, 'jobPosts', id);
        const jobDoc = await getDoc(jobRef);

        if (jobDoc.exists()) {
          setJob(jobDoc.data());
        } else {
          Alert.alert('Error', 'Job not found.');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        Alert.alert('Error', 'Failed to load job details.');
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  const handleApplyNow = () => {
    // Pass job.id and job.title as parameters
    router.push(`/Jobs/uploadCV?jobId=${job.id}&jobTitle=${job.title}&company=${job.company}&location=${job.location}&postedDate=${job.postedDate}&userId=${user.userId}`); 
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.companyName}>{job.company}</Text>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.sectionHeader}>Description</Text>
      <Text style={styles.descriptionText}>{job.description}</Text>
      {job.requirements && (
        <>
          <Text style={styles.sectionHeader}>Requirements</Text>
          <Text style={styles.descriptionText}>{job.requirements}</Text>
        </>
      )}
      {job.skills && job.skills.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Skills</Text>
          <View style={styles.skillsList}>
            {job.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>{skill}</Text>
            ))}
          </View>
        </>
      )}
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyNow}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
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
  applyButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 350,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetails;

