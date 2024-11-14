import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useAuth } from '../context/authContext';
import { databaseFB } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Notifications = () => {
  const { user } = useAuth();
  const currentUserId = user?.userId;
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState({}); // To store user details (name, profile picture)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsRef = doc(databaseFB, 'notifications', currentUserId);
        const notificationsSnap = await getDoc(notificationsRef);
        if (notificationsSnap.exists()) {
          const notificationsData = notificationsSnap.data().notifications || [];
          setNotifications(notificationsData);

          // Fetch user details for notifications
          const userPromises = notificationsData.map(async (notification) => {
            const userDoc = await getDoc(doc(databaseFB, 'users', notification.userId));
            return {
              userId: notification.userId,
              ...(userDoc.exists() ? userDoc.data() : {}),
            };
          });

          const usersList = await Promise.all(userPromises);
          const usersData = usersList.reduce((acc, user) => {
            acc[user.userId] = {
              username: user.fullName || 'Unknown User',
              profilePicture: user.profileImage || 'https://via.placeholder.com/50',
            };
            return acc;
          }, {});
          setUsers(usersData); // Save all fetched user data
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  const renderNotification = ({ item }) => {
    const user = users[item.userId] || {};
    return (
      <View style={styles.notificationContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.notificationText}>
            <Text style={styles.username}>{user.username}</Text> {item.type} your post
          </Text>
          <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.userId}-${index}`}
        renderItem={renderNotification}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications yet.</Text>}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
  },
  username: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});
