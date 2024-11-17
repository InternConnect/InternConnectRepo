import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { usersRef } from '../../FirebaseConfig';
import { useAuth } from '../context/authContext'; 
import { useRouter } from 'expo-router';
import ProfileHeader from '../../components/ProfileHeader';
import { AntDesign, Feather } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.userId;
  const [activeTab, setActiveTab] = useState('posts');
  const [profileData, setProfileData] = useState({
    fullName: 'username',
    bio: 'Tell Us Your Story.',
    education: 'null',
    role: 'null',
    skills: [], 
    profileImage: 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
  });

  // Fetch updated profile data on component mount
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

  const handleEditProfile = () => {
    router.push('/profile/editProfile');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const posts = [
    {
      id: '1',
      username: 'Susan',
      time: '40 minutes ago',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      likes: 28,
      comments: 15,
    },
    {
      id: '2',
      username: 'John',
      time: '1 hour ago',
      text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      likes: 15,
      comments: 10,
    },
    {
      id: '3',
      username: 'John',
      time: '1 hour ago',
      text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      likes: 15,
      comments: 10,
    },
  ];

  const renderSavedJob = ({ item }) => (
    <View key={item.id} style={styles.savedJobCard}>
      <Text style={styles.companyName}>{item.company}</Text>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
  );
  const renderPost = ({ item }) => (
    <View key={item.id} style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.postInfo}>
          <Text style={styles.userNamePost}>{item.username}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.postActions}>
        <View style={styles.iconContainer}>
          <AntDesign name="hearto" size={20} color="black" />
          <Text style={styles.iconText}>{item.likes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather name="message-circle" size={20} color="black" />
          <Text style={styles.iconText}>{item.comments}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="share" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const profileInfo = [
    {
      key: 'profileHeader',
      render: (
        <View style={styles.profileInfo}>
          <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profileData.fullName}</Text>
            <Text style={styles.userDetails}>Desired Role: {profileData.role}</Text>
            <Text style={styles.userDetails}>Education/experience: {profileData.education}</Text>
            <Text style={styles.userDetails}>location: {profileData.location}</Text>
          </View>
        </View>
      ),
    },
    {
      key: 'skillsSection',
      render: profileData.skills && profileData.skills.length > 0 && (
        <View style={styles.skillsSection}>
          <Text style={styles.skillsTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {profileData.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ),
    },
    {
      key: 'bioSection',
      render: (
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>BIO</Text>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>
      ),
    },
    {
      key: 'editButton',
      render: (
        <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <FlatList
      data={profileInfo}
      renderItem={({ item }) => item.render}
      keyExtractor={(item) => item.key}
      ListHeaderComponent={<ProfileHeader title="Profile" />}
      ListFooterComponent={
        <>
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
          {activeTab === 'posts' && posts.map((post) => renderPost({ item: post }))}
          {activeTab === 'saved' && profileData.savedJobs && (
            <FlatList
              data={profileData.savedJobs}
              renderItem={renderSavedJob}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text style={styles.noSavedJobs}>No saved jobs yet.</Text>}
            />
          )}
        </>
      }
    />
  );
};

export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 21,
    
  },
  profileInfo: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 16, 

    
    

  },
  savedJobCard:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 16, 

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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  bioSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16, 

  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#34c759',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 16, 

  },
  editProfileText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',

  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    marginHorizontal: 16, 

  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#34c759',
    paddingVertical: 10,
    marginHorizontal: 16, 

  },
  inactiveTab: {
    paddingVertical: 10,
    marginHorizontal: 16, 

  },
  tabTextActive: {
    color: '#34c759',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#aaa',
  },
  post: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  userNamePost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  skillsSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16, 

  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 14,
    color: '#333',
  },

});
