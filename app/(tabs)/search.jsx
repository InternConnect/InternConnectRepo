import React, { useState } from 'react';
import { StyleSheet,Image , View, TextInput, TouchableOpacity, FlatList, Text, Modal, TextInput as NativeTextInput } from 'react-native';
import { Ionicons, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { databaseFB } from '../../FirebaseConfig';
import Loading from '../../components/Loading2';
import { images } from '../../constants';
import { collection, getDocs, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    setLoading(true); // Set loading to true when search starts

    try {
      const postsRef = collection(databaseFB, 'posts');
      const querySnapshot = await getDocs(postsRef);

      const matchedPosts = [];
      const normalizedSearchQuery = searchQuery.toLowerCase().trim();

      for (const docSnap of querySnapshot.docs) {
        const postData = docSnap.data();
        const userDoc = await getDoc(doc(databaseFB, 'users', postData.userId));
        const userData = userDoc.data();

        if (new RegExp(`\\b${normalizedSearchQuery}\\b`, 'i').test(postData.post)) {
          matchedPosts.push({
            id: docSnap.id,
            ...postData,
            username: userData?.fullName,
            profilePicture: userData?.profileImage,
          });
        }
      }

      setFilteredPosts(matchedPosts);
    } catch (error) {
      console.error('Error fetching filtered posts:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const handleLike = async (postId) => {
    const postRef = doc(databaseFB, 'posts', postId);
    try {
      const postSnap = await getDoc(postRef);
      const post = postSnap.data();
      const likesArray = post?.likes || [];

      if (likesArray.includes(user.userId)) {
        await updateDoc(postRef, {
          likes: arrayRemove(user.userId),
        });
        setLikedPosts((prev) => {
          const updated = new Set(prev);
          updated.delete(postId);
          return updated;
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(user.userId),
        });
        setLikedPosts((prev) => new Set(prev).add(postId));
      }
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
      comments: arrayUnion({ text: newComment, userId: user.userId, replies: [] }),
    });

    setNewComment('');
    setCommentVisible(false);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{item.username || 'Unknown User'}</Text>
          <Text style={styles.timestamp}>just now</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.post}</Text>

      <View style={styles.footer}>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.icon} onPress={() => handleLike(item.id)}>
            <AntDesign name={likedPosts.has(item.id) ? 'heart' : 'hearto'} size={20} color={likedPosts.has(item.id) ? 'green' : 'black'} />
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading size={100} /> // Display loader while loading
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
        />
      )}

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
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>
                    <Text style={styles.commentUsername}>{user.username || 'Unknown User'}: </Text>
                    {item.text}
                  </Text>
                </View>
              )}
            />
          )}

          <NativeTextInput
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#28a745',
    borderRadius: 50,
    padding: 10,
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
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentInput: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addCommentButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  addCommentText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Search;
