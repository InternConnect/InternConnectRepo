import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { databaseFB } from '../../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import SearchBox from '../(employerTabs)/search';
const Search = () => {
  return(
    
      //imported from the employer tabs
      <SearchBox /> 
  )
};
export default Search;
