import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/authContext'; // Import the auth context to get user data
import { doc, getDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons'; // Import Feather icons for UI

const JobRecommendations = () => {
  const { user } = useAuth(); // Get the current logged-in user from auth context
  const [userProfile, setUserProfile] = useState(null); // Store user profile data
  const [recommendedJobs, setRecommendedJobs] = useState([]); // Store the list of recommended jobs

  const db = getFirestore(); // Initialize Firestore database

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', user.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          console.log('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Fetch job listings and recommend jobs based on user profile
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, 'jobPosts');
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Check if userProfile is available before proceeding with recommendation
        if (userProfile) {
          const recommendedJobs = jobs.filter(job => {
            const jobSkills = job.skills || [];
            const userSkills = userProfile.skills || [];

            // Recommend jobs where skills match or job title matches user's desired role
            return (
              jobSkills.some(skill => userSkills.includes(skill)) ||
              (userProfile.role && job.title.toLowerCase() === userProfile.role.toLowerCase()) // Check if role exists
            );
          });
          setRecommendedJobs(recommendedJobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        Alert.alert('Error', 'Failed to load job recommendations.');
      }
    };

    if (user) {
      fetchUserProfile().then(fetchJobs);
    }
  }, [user, userProfile]); // Re-run when user or userProfile changes

  const handleEasyApply = (jobId) => {
    console.log('Easy Apply for Job ID:', jobId);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.sectionHeader}>Recommended Jobs</Text>
      {recommendedJobs.length > 0 ? (
        recommendedJobs.map((item) => (
          <View key={item.id} style={styles.jobCard}>
            <View style={styles.jobInfo}>
              <Text style={styles.companyName}>{item.company}</Text>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <TouchableOpacity
                style={styles.easyApplyButton}
                onPress={() => handleEasyApply(item.id)}
              >
                <Text style={styles.easyApplyText}>Easy apply</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Feather name="bookmark" size={24} color="green" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noJobsText}>No matching jobs found at the moment. Please update your profile.</Text>
      )}
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  jobCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  companyName: {
    color: '#666',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    color: '#666',
    marginBottom: 10,
  },
  easyApplyButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  easyApplyText: {
    color: '#fff',
    fontSize: 12,
  },
  bookmarkButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default JobRecommendations;
