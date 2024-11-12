import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const JobDetails = () => {
  const router = useRouter(); // Use useRouter for navigation
  const route = useRoute(); // Access route params
  const { id } = route.params || {}; // Retrieve 'id' from route params
  const { user } = useAuth(); // Access the current user state
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
    // Redirect user to Upload CV screen with the job details
    router.push(`/Jobs/uploadCV?jobId=${job.id}&jobTitle=${job.title}&company=${job.company}&location=${job.location}&postedDate=${job.postedDate}&userId=${user.userId}`);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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
    marginTop: 15,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillItem: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    margin: 5,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: '#2CB67D',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JobDetails;
