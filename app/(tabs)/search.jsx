import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { databaseFB } from '../../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }

    try {
      const postsRef = collection(databaseFB, 'posts');
      const q = query(postsRef, where('post', '>=', searchQuery), where('post', '<=', searchQuery + '\uf8ff'));
      const querySnapshot = await getDocs(q);

      const matchedPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFilteredPosts(matchedPosts);
    } catch (error) {
      console.error('Error fetching filtered posts:', error);
    }
  };

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
      
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{item.post}</Text>
          </View>
        )}
      />
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
  resultContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Search;
