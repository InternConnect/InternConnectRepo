import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

const Home = () => {
  const renderItem = () => (
    <View style={styles.postContainer}>
      {/* Post Header - Profile Picture, Username, Post Time, and Follow Button */}
      <View style={styles.postHeader}>
        {/* Profile Picture */}
        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} style={styles.avatar} />
        
        {/* Username and Time */}
        <View style={styles.postInfo}>
          <Text style={styles.userName}>Username</Text>
          <Text style={styles.postTime}>40 minutes ago</Text>
        </View>

        {/* Follow/Following Button */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followText}>follow</Text>
        </TouchableOpacity>
      </View>

      {/* Post Text Content */}
      <Text style={styles.postText}>This is a placeholder post text, lorem ipsum dolor sit amet...</Text>

      {/* Post Image Placeholder */}
      <Image source={{ uri: 'https://via.placeholder.com/300x200' }} style={styles.postImage} />

      {/* Post Actions - Like, Comment, Share */}
      <View style={styles.postActions}>
        {/* Like Button */}
        <View style={styles.iconContainer}>
          <AntDesign name="hearto" size={24} color="black" />
          <Text style={styles.iconText}>28</Text>
        </View>

        {/* Comment Button */}
        <View style={styles.iconContainer}>
          <Feather name="message-circle" size={24} color="black" />
          <Text style={styles.iconText}>15</Text>
        </View>

        {/* Share Button */}
        <TouchableOpacity>
          <Feather name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={[{}, {}, {}]} // Placeholder for multiple posts
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
  },
  followButton: {
    backgroundColor: '#34c759',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  followText: {
    color: '#fff',
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
});
