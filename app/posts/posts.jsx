import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddPost = () => {
  const router = useRouter();
  const { user } = useAuth(); // Access user from context
  const handleClose = () => {
    router.back();
  };

  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');

  const handlePost = async () => {
    if (!user || !user.userId) { // Check if userId is available
      Alert.alert('Error', 'You must be logged in to post.');
      return;
    }

    const imageUrl = await uploadImage();
    console.log('Image Url:', imageUrl);
    console.log('Post:', post);

    const db = getFirestore();
    try {
      await addDoc(collection(db, 'posts'), {
        userId: user.userId, // Ensure user.userId is defined
        post: post,
        postImg: imageUrl,
        postTime: new Date(),
        likes: [],
        comments: [],
      });
      console.log('Post Added');
      Alert.alert('Post published', 'Your Post has been published');
      setPost('');
      setImage(null);
    } catch (error) {
      console.log('Something went wrong with adding post to Firestore:', error);
      Alert.alert('Error', 'Something went wrong while adding your post.');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      return null; // Return null if there's no image
    }

    const response = await fetch(image);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `photos/${Date.now()}`);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.log('Image upload error:', e);
      return null;
    }
  };

  const handleAddMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={setPost}
        />
        <TouchableOpacity onPress={handleAddMedia} style={styles.addMediaButton}>
          <Feather name="image" size={20} color="white" />
          <Text style={styles.addMediaText}>Add Media</Text>
        </TouchableOpacity>
        {image && (
          <>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <Text style={styles.imagePreviewText}>{image}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  postButton: {
    color: '#34c759',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    height: 120,
    fontSize: 16,
    marginBottom: 10,
  },
  addMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34c759',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addMediaText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imagePreviewText: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});
