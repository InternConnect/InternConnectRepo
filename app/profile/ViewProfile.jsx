import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { databaseFB } from '../../FirebaseConfig';
import { useRoute,useNavigation} from '@react-navigation/native';
import { useRouter } from 'expo-router'; // Import useRouter

import { MaterialIcons } from '@expo/vector-icons';

const ViewProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const navigation = useNavigation();
  const router = useRouter(); // Initialize the router

  const route = useRoute();
  const userId = route.params?.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRef = doc(databaseFB, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        } else {
          setError('User not found.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again later.');
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#34c759" />
      </View>
    );
  }
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //opens the profile picture
  const handleMessageIcon = (userId,userName) => {
    console.log('Navigating to view profile with userId:', userId,userName);

    router.push(`/messages/ChatScreen?id=${userId}&name=${userName}`);

  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.headerContainer}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>View Profile</Text>
  <TouchableOpacity onPress={() => handleMessageIcon(userId,userDetails.fullName)}>
  <MaterialIcons name="mail" size={24} color="black" />
  </TouchableOpacity>
</View>
    
      <View style={styles.profileInfo}>
        <Image
          source={{
            uri: userDetails.profileImage || 'https://via.placeholder.com/150',
          }}
          style={styles.profileImage}
          accessibilityLabel="User profile picture"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userDetails.fullName || 'Unknown User'}</Text>
          <Text style={styles.userDetails}>Desired Role: {userDetails.role || 'No role specified'}</Text>
          <Text style={styles.userDetails}>Location: {userDetails.location || 'Not specified'}</Text>
        </View>
      </View>

      <View style={styles.skillsSection}>
        <Text style={styles.sectionHeader}>Skills</Text>
        <View style={styles.skillsContainer}>
          {userDetails.skills?.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          )) || <Text style={styles.sectionText}>No skills added</Text>}
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.bioTitle}>BIO</Text>
        <Text style={styles.sectionText}>
          {userDetails.bio || 'This user has not shared a bio yet.'}
        </Text>
      </View>

 

      {/* Posts Section */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={activeTab === 'posts' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('posts')}
        >
          <Text style={activeTab === 'posts' ? styles.tabTextActive : styles.tabTextInactive}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeTab === 'saved' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('saved')}
        >
          <Text style={activeTab === 'saved' ? styles.tabTextActive : styles.tabTextInactive}>Saved</Text>
        </TouchableOpacity>
      </View>

      {/* Example Posts */}
     

     
    </ScrollView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bioSection: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    margin:15,
    padding: 20,
    marginVertical: 10,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
 
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  sectionContainer: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillsSection: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 20,
    margin:10,
    marginVertical: 10,
  },
  skillTag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 14,
    color: '#333',
  },
  skillText: {
    fontSize: 14,
    color: '#555',
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
  },
  editProfileButton: {
    backgroundColor: '#34c759',
    padding: 12,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },

  //tabs here
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#34c759',
    paddingVertical: 10,
  },
  inactiveTab: {
    paddingVertical: 10,
  },
  tabTextActive: {
    color: '#34c759',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#aaa',
  },
  postContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postContent: {
    marginLeft: 15,
    flex: 1,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
