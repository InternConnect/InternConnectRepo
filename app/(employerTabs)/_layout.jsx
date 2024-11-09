import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; 
import CustomHeader2 from '../../components/CustomHeader2';
import { icons } from '../../constants';

const TabIcon = ({ icon, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          tintColor: focused ? '#00ff00' : 'black', 
        }}
        className="w-6 h-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00ff00',
          tabBarStyle: {
            borderTopColor: 'black',
            borderTopWidth: 0.5,
            height: 55,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: () => <CustomHeader2 title="Home" />, // Pass the title "Home"
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            headerTitle: () => <CustomHeader2 title="Search" />, // Pass the title "Search"
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.search} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            headerTitle: () => <CustomHeader2 title="Notifications" />, // Pass the title "Notifications"
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.notification} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="jobs"
          options={{
            headerTitle: () => <CustomHeader2 title="Jobs" />, // Pass the title "Jobs"
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.suitcase} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
