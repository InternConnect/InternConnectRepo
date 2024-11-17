import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../context/authContext'; // Import the auth context to get user data
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion,getDoc} from 'firebase/firestore';
import { Feather } from '@expo/vector-icons'; // Import Feather icons for UI
import { useRouter } from 'expo-router';

const JobRecommendations = () => {
  const router = useRouter();
  
  const { user } = useAuth(); // Get the current logged-in user from auth context
  const [userProfile, setUserProfile] = useState(null); // Store user profile data
  const [recommendedJobs, setRecommendedJobs] = useState([]); // Store the list of recommended jobs

  const db = getFirestore(); // Initialize Firestore database

  const tipsData = [
    'Tailor your resume for each job application.',
    'Prepare for interviews by practicing common questions.',
    'Network with professionals in your field.',
    'Keep learning new skills relevant to your industry.',
  ];

  //handle bookmarks
  const handleBookmark = async (job) => {
    try {
      const userRef = doc(db, 'users', user.userId);
      await updateDoc(userRef, {
        savedJobs: arrayUnion({ id: job.id, ...job }), // Add job data to savedJobs array
      });
      Alert.alert('Success', 'Job saved successfully!');
    } catch (error) {
      console.error('Error bookmarking job:', error);
      Alert.alert('Error', 'Failed to save job.');
    }
  };

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tipsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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

    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, 'jobPosts');
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (userProfile) {
          const recommendedJobs = jobs.filter(job => {
            const jobSkills = job.skills || [];
            const userSkills = userProfile.skills || [];
            return (
              jobSkills.some(skill => userSkills.includes(skill)) ||
              (userProfile.role && job.title.toLowerCase() === userProfile.role.toLowerCase())
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

  const handleEasyApply = (job) => {
    router.push(`/Jobs/jobDetails?id=${job.id}`);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.sectionHeader}>Recommended Jobs</Text>

      {/* Display Tips Once at the Top */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tips for Interns / Entry-Level Job Seekers</Text>
        <Text style={styles.tipText}>{tipsData[currentTipIndex]}</Text>
      </View>

      {recommendedJobs.length > 0 ? (
        recommendedJobs.map((job) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobInfo}>
              <Text style={styles.companyName}>{job.company}</Text>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.location}>{job.location}</Text>
              <TouchableOpacity
                style={styles.easyApplyButton}
                onPress={() => handleEasyApply(job)}
              >
                <Text style={styles.easyApplyText}>Easy apply</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bookmarkButton} onPress={() => handleBookmark(job)}>
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
  tipsContainer: {
    padding: 15,
    backgroundColor: '#EAF7EF',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  tipsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#2CB67D',
    fontStyle: 'italic',
  },
});

export default JobRecommendations;
