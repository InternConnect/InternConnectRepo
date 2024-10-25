import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react'; // Import useState
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProfileHeader from '../../components/ProfileHeader'; // Import the custom header

const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('posts'); // State for active tab

  // Static post data
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

  const handleEditProfile = () => {
    console.log('Navigate to edit Profile');
    router.push('/profile/editProfile'); // Go to edit profile
  };

  // Render each post
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

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update the active tab
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader title="Profile" />

      {/* Profile Info Section */}
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Sarah Lorem</Text>
          <Text style={styles.userDetails}>Desired Role: Software Engineer</Text>
          <Text style={styles.userDetails}>Location: Cape Town</Text>
          <Text style={styles.userDetails}>Education/experience: Eduvos</Text>
          <Text style={styles.userDetails}>Connections: 102</Text>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.bioTitle}>BIO</Text>
        <Text style={styles.bioText}>
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. 
          Nullam Vehicula Velit Nulla, Vitae Rutrum Felis.
        </Text>
      </View>

      <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Posts and Saved Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={activeTab === 'posts' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('posts')}
        >
          <Text style={activeTab === 'posts' ? styles.tabTextActive : styles.tabTextInactive}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeTab === 'saved' ? styles.activeTab : styles.inactiveTab} 
          onPress={() => handleTabChange('saved')}
        >
          <Text style={activeTab === 'saved' ? styles.tabTextActive : styles.tabTextInactive}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>

      {/* Post Section */}
      {activeTab === 'posts' && posts.map((post) => renderPost(post))}
      {/* You can render saved posts or content here when 'saved' tab is active */}
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
    marginVertical: 20,
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
});
