import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';

const jobsData = [
  { id: '1', user: 'Ayoob', action: 'Hey, How Are you?', time: '45 minutes ago', avatar: 'https://play-lh.googleusercontent.com/2zorpA9peRFcwZM5SLSAx80gLCA3YrknRXQwPW-Hz2AJyBcvBJiO9vuP6DvlX3FRZXMv=w526-h296-rw' },
  { id: '2', user: 'Bob', action: 'Where is my money?', time: '2 hour ago', avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/984a0843-8116-45ed-bc71-795b16152ccd/dbx2f04-ae108807-0cbd-48dc-a269-6c5a607f0bef.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4NGEwODQzLTgxMTYtNDVlZC1iYzcxLTc5NWIxNjE1MmNjZFwvZGJ4MmYwNC1hZTEwODgwNy0wY2JkLTQ4ZGMtYTI2OS02YzVhNjA3ZjBiZWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cyHy48zcEH55Sfv6sLd2_HOYfjqp7pn8uMp1TTMRiHA' },
  { id: '3', user: 'Jessica', action: 'Netflix and chill', time: '5 hours ago', avatar: 'https://thumbs.dreamstime.com/b/female-user-profile-avatar-woman-character-screen-saver-happy-emotions-female-user-profile-avatar-199601144.jpg' },
];

const AddPost = () => {
  const router = useRouter();
  const { user } = useAuth(); // Access user from context
  const handleClose = () => {
    router.back();
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.jobTextContainer}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.userMessages}>{item.action}</Text>
        <Text style={styles.jobTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <FlatList
        data={jobsData}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.jobList}
      />
    </View>
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
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    position: 'absolute', 
    left: '50%',
    transform: [{ translateX: -50 }], 
  },
  jobList: {
    paddingVertical: 20,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  jobTextContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userMessages: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  jobTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
