import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { databaseFB } from '../../FirebaseConfig';
import { collection, getDocs, setDoc,doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/authContext'; // Get the logged-in user's information
import { useRouter } from 'expo-router'; // Import useRouter


const Home = () => {
  const { user } = useAuth(); // Get user data from auth context
  const currentUserId = user?.userId; // Set the logged-in user's ID
  const router = useRouter(); // Initialize the router


  const [posts, setPosts] = useState([]); // Keeps track of posts
  const [users, setUsers] = useState({}); // Keeps track of user info like names
  const [selectedPost, setSelectedPost] = useState(null); // Keeps track of the selected post for comments
  const [isCommentVisible, setCommentVisible] = useState(false); // To show or hide comments
  const [newComment, setNewComment] = useState(''); // Stores new comments typed by the user
  const [likedPosts, setLikedPosts] = useState(new Set()); // Tracks liked posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(databaseFB, 'posts'); // Get the posts collection from Firestore
        const postsSnapshot = await getDocs(postsCollection); // Fetch all posts
        const postsList = postsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        setPosts(postsList); // Set posts to our state

        // Fetch user details for each post
        const userPromises = postsList.map(async (post) => {
          const userDoc = await getDoc(doc(databaseFB, 'users', post.userId));
          const userData = userDoc.data();
          return {
            id: post.userId,
            username: userData?.fullName,
            profilePicture: userData?.profileImage,
          };
        });

        const usersList = await Promise.all(userPromises);
        const usersData = usersList.reduce((acc, user) => {
          acc[user.id] = { username: user.username, profilePicture: user.profilePicture };
          return acc;
        }, {});
        setUsers(usersData); // Save all user data to state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const addNotification = async (type, postId) => {
    const postRef = doc(databaseFB, 'posts', postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();
    const postOwnerId = postData?.userId;
  
    if (postOwnerId !== currentUserId) {
      const notificationRef = doc(databaseFB, 'notifications', postOwnerId); 
  
      // Use setDoc with merge: true to create or update the document
      await setDoc(notificationRef, {
        notifications: arrayUnion({
          type,
          postId,
          userId: currentUserId,
          createdAt: new Date().toISOString(),
        }),
      }, { merge: true }); 
    }
  };

  const handleLike = async (postId) => {
    const postRef = doc(databaseFB, 'posts', postId);
    try {
      const postSnap = await getDoc(postRef);
      const post = postSnap.data();
      const likesArray = post?.likes || [];

      if (likesArray.includes(currentUserId)) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUserId),
        });
        setLikedPosts((prev) => {
          const updated = new Set(prev);
          updated.delete(postId);
          return updated;
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUserId),
        });
        setLikedPosts((prev) => new Set(prev).add(postId));
        await addNotification('like', postId);
      }

      const updatedPosts = posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: likesArray.includes(currentUserId)
                ? likesArray.filter((id) => id !== currentUserId)
                : [...likesArray, currentUserId],
            }
          : p
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const openComments = (post) => {
    setSelectedPost(post);
    setCommentVisible(true);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const postRef = doc(databaseFB, 'posts', selectedPost.id);
    await updateDoc(postRef, {
      comments: arrayUnion({ text: newComment, userId: currentUserId, replies: [] }),
    });

    const updatedPost = await getDoc(postRef);
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex((p) => p.id === selectedPost.id);
    if (postIndex !== -1) {
      updatedPosts[postIndex] = updatedPost.data();
      setPosts(updatedPosts);
    }

    await addNotification('comment', selectedPost.id);

    setNewComment('');
    setCommentVisible(false);
  };

  //opens the profile picture
  const handleProfilePictureClick = (userId) => {
    console.log('Navigating to profile with userId:', userId);

    router.push(`/profile/ViewProfile?id=${userId}`);

  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => handleProfilePictureClick(item.userId)}>
          <Image
            source={{ uri: users[item.userId]?.profilePicture || 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.userName}>{users[item.userId]?.username || 'Unknown User'}</Text>
          <Text style={styles.timestamp}>
            just now
          </Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{item.post}</Text>

      {item.postImg && <Image source={{ uri: item.postImg }} style={styles.postImage} />}

      <View style={styles.footer}>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.icon} onPress={() => handleLike(item.id)}>
            <AntDesign
              name={likedPosts.has(item.id) ? 'heart' : 'hearto'}
              size={20}
              color={likedPosts.has(item.id) ? 'green' : 'black'}
            />
            <Text style={styles.iconText}>{item.likes?.length || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => openComments(item)}>
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text style={styles.iconText}>{item.comments?.length || 0}</Text>
          </TouchableOpacity>
        </View>
        <Feather name="share-2" size={20} color="black" />
      </View>
    </View>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>
        <Text style={styles.commentUsername}>{users[item.userId]?.username || 'Unknown User'}: </Text>
        {item.text}
      </Text>
      <TouchableOpacity>
        <Text style={styles.replyText}>Reply</Text>
      </TouchableOpacity>
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

      <Modal visible={isCommentVisible} animationType="slide" onRequestClose={() => setCommentVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setCommentVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Comments</Text>
          </View>

          {selectedPost && (
            <FlatList
              data={selectedPost.comments || []}
              keyExtractor={(item, index) => `${selectedPost.id}-comment-${index}`}
              renderItem={renderComment}
            />
          )}

          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
            <Text style={styles.addCommentText}>Post</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Home;



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    color: '#34c759',
    fontSize: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  commentText: {
    fontSize: 16,
  },
  commentUsername: {
    fontWeight: 'bold', // Make username bold
  },
  replyText: {
    color: '#34c759',
    fontSize: 14,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  addCommentButton: {
    backgroundColor: '#34c759',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addCommentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
    alignItems: 'center',
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