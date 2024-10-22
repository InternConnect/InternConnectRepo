import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';


const notificationsData = [
  { id: '1', user: 'Susan', action: 'liked your post', time: '40 minutes ago', avatar: 'https://example.com/avatar1.png' },
  { id: '2', user: 'John', action: 'liked your post', time: '1 hour ago', avatar: 'https://example.com/avatar2.png' },
  { id: '3', user: 'Jane', action: 'commented on your post', time: '2 hours ago', avatar: 'https://example.com/avatar3.png' },
  
];

const Notifications = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user}</Text> {item.action}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notifications</Text>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  notificationList: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default Notifications;
