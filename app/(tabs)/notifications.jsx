import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useAuth } from '../context/authContext';
import { databaseFB } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { user } = useAuth();
  const currentUserId = user?.userId;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsRef = doc(databaseFB, 'notifications', currentUserId);
        const notificationsSnap = await getDoc(notificationsRef);
        if (notificationsSnap.exists()) {
          setNotifications(notificationsSnap.data().notifications || []);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.userId}</Text>{' '}
          {item.type === 'like' ? 'liked your post' : 'commented on your post'}
        </Text>
        <Text style={styles.timestamp}>just now</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationText: {
    fontSize: 16,
  },
  username: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Notifications;
