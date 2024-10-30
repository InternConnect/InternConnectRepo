import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { databaseFB } from '../../FirebaseConfig'; // Import database instance
import { collection, getDocs } from 'firebase/firestore';
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons'; // For icons

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(databaseFB, 'posts');
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Header: Profile picture, username, and time */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Replace with real profile image URL
          style={styles.profileImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.userId}</Text>
          <Text style={styles.timestamp}>40 minutes ago</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Post content */}
      <Text style={styles.postContent}>{item.post}</Text>

      {/* Post image (if available) */}
      {item.postImg && (
        <Image source={{ uri: item.postImg }} style={styles.postImage} />
      )}

      {/* Footer: Like, Comment, Share icons */}
      <View style={styles.footer}>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.icon}>
            <AntDesign name="hearto" size={20} color="black" />
            <Text style={styles.iconText}>28</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text style={styles.iconText}>15</Text>
          </TouchableOpacity>
        </View>
        <Feather name="share-2" size={20} color="black" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#34c759',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    marginLeft: 5,
  },
});
