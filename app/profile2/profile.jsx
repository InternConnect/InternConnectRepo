import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
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
    companyName: 'null',
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
    router.push('/profile2/editProfile');
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

  const renderPost = (post) => (
    <View key={post.id} style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.postInfo}>
          <Text style={styles.userNamePost}>{post.username}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.postActions}>
        <View style={styles.iconContainer}>
          <AntDesign name="hearto" size={20} color="black" />
          <Text style={styles.iconText}>{post.likes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather name="message-circle" size={20} color="black" />
          <Text style={styles.iconText}>{post.comments}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="share" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader title="Profile" />

      <View style={styles.profileInfo}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{profileData.fullName}</Text>
          <Text style={styles.userDetails}> company name: {profileData.companyName}</Text>
          <Text style={styles.userDetails}>location: {profileData.location}</Text>
        </View>
      </View>


      <View style={styles.bioSection}>
        <Text style={styles.bioTitle}>BIO</Text>
        <Text style={styles.bioText}>{profileData.bio}</Text>
      </View>

      <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={activeTab === 'posts' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('posts')}
        >
          <Text style={activeTab === 'posts' ? styles.tabTextActive : styles.tabTextInactive}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeTab === 'applications' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('applications')}
        >
          <Text style={activeTab === 'applications' ? styles.tabTextActive : styles.tabTextInactive}>Applications</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'posts' && posts.map((post) => renderPost(post))}
    </ScrollView>
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
    marginVertical: 30,
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
