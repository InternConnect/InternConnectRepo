import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext'

const employerhome = () => {

  //logout 
  const{logout,user} = useAuth();
  const handleLogout = async ()=>{
    await logout();
  }
  console.log('user data:',user);
  return (
    <View>
      <Text>home employer home employer home</Text>
      <Pressable onPress={handleLogout}>
        <Text>sign out</Text>
      </Pressable>
    </View>
  )
}

export default employerhome

const styles = StyleSheet.create({})