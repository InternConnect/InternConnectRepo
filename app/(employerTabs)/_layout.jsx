import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router'; 

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
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} focused={focused} />
            ),
          }}
        />

        {/* second tab: search */}
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.search} focused={focused} />
            ),
          }}
        />

        {/* third tab: notifications */}
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.notification} focused={focused} />
            ),
          }}
        />

        {/* fourth tab: jobs */}
        <Tabs.Screen
          name="jobs"
          options={{
            title: 'Jobs',
            headerShown: false,
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
