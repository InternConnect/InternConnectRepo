import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext'


const Home = () => {

  //logout 
  const { user } = useAuth();

  console.log('user data:', user);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
     
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#fff',  
  },
  text: {
    fontSize: 24,            
    marginBottom: 20,        
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',  
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',          
    fontSize: 16,            
  }
})
