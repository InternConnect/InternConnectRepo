import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const jobsData = [
  { id: '1', user: 'Ayoob', action: 'liked your post', time: '45 minutes ago', avatar: 'https://play-lh.googleusercontent.com/2zorpA9peRFcwZM5SLSAx80gLCA3YrknRXQwPW-Hz2AJyBcvBJiO9vuP6DvlX3FRZXMv=w526-h296-rw' },
  { id: '2', user: 'Bob', action: 'liked your post', time: '2 hour ago', avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/984a0843-8116-45ed-bc71-795b16152ccd/dbx2f04-ae108807-0cbd-48dc-a269-6c5a607f0bef.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4NGEwODQzLTgxMTYtNDVlZC1iYzcxLTc5NWIxNjE1MmNjZFwvZGJ4MmYwNC1hZTEwODgwNy0wY2JkLTQ4ZGMtYTI2OS02YzVhNjA3ZjBiZWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cyHy48zcEH55Sfv6sLd2_HOYfjqp7pn8uMp1TTMRiHA' },
  { id: '3', user: 'Jessica', action: 'commented on your post', time: '5 hours ago', avatar: 'https://thumbs.dreamstime.com/b/female-user-profile-avatar-woman-character-screen-saver-happy-emotions-female-user-profile-avatar-199601144.jpg' },
];

const Jobs = () => {
  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.jobTextContainer}>
        <Text style={styles.jobText}>
          <Text style={styles.userName}>{item.user}</Text> {item.action}
        </Text>
        <Text style={styles.jobTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobsData}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.jobList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  jobList: {
    paddingVertical: 20,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
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
  jobText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontWeight: 'bold',
  },
  jobTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default Jobs;
