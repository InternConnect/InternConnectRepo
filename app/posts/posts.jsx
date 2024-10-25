import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AddPost = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Navigate back to the previous screen
  };

  const handlePost = () => {
    // Logic to handle posting
    console.log('Post submitted');
  };

  const handleAddMedia = () => {
    // Logic to add media
    console.log('Add media');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity onPress={handleAddMedia} style={styles.addMediaButton}>
          <Feather name="image" size={20} color="white" />
          <Text style={styles.addMediaText}> Add Media</Text>
        </TouchableOpacity>
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
    paddingTop:25,
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
});
