import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const jobsData = [
  { id: '1', company: 'Company A', title: 'Software Engineer', location: 'Cape Town' },
  { id: '2', company: 'Company B', title: 'Data Scientist', location: 'Johannesburg' },
  { id: '3', company: 'Company C', title: 'Product Manager', location: 'Durban' },
];

const tipsData = [
  'Tailor your resume for each job application.',
  'Prepare for interviews by practicing common questions.',
  'Network with professionals in your field.',
  'Keep learning new skills relevant to your industry.',
];

const Jobs = () => {
  const router = useRouter();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tipsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEasyApply = (jobId) => {
    router.push(`/Jobs/jobDetails?id=${jobId}`);
  };

  const renderJobItem = (item) => (
    <View key={item.id} style={styles.jobCard}>
      <View style={styles.jobInfo}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <TouchableOpacity style={styles.easyApplyButton} onPress={() => handleEasyApply(item.id)}>
          <Text style={styles.easyApplyText}>Easy apply</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Feather name="bookmark" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Job Recommendations */}
      <Text style={styles.sectionHeader}>Job Recommendations</Text>
      {jobsData.map(renderJobItem)}

      {/* Intern Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tips for Interns / Entry-Level Job Seekers</Text>
        <Text style={styles.tipText}>{tipsData[currentTipIndex]}</Text>
      </View>

      {/* Additional Job Recommendations */}
      <Text style={styles.sectionHeader}>More Job Recommendations</Text>
      {jobsData.map(renderJobItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingLeft: 15,
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 35,
    lineHeight: 30,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  jobCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  bookmarkButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    color: '#666',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    color: '#666',
    marginBottom: 10,
  },
  easyApplyButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  easyApplyText: {
    color: '#fff',
    fontSize: 12,
  },
  tipsContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  tipsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Jobs;
