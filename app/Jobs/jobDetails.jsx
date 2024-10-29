import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const JobDetails = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    router.push('/Jobs/uploadCV'); // Redirect to Upload CV page
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.jobTitle}>Software Engineer</Text>
        <Text style={styles.companyName}>Toptal</Text>
        <Text style={styles.postedDate}>Posted on 20 July</Text>

        {/* Job Description */}
        <Text style={styles.sectionHeader}>Job Description</Text>
        <Text style={styles.descriptionText}>
          Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye?
          We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you?
          We're looking for a like-minded individual.
        </Text>

        {/* Roles and Responsibilities */}
        <Text style={styles.sectionHeader}>Roles and Responsibilities</Text>
        <Text style={styles.responsibilitiesText}>
          - Someone who has ample work experience with synthesizing primary research, developing insight-driven product
          strategy, and extending that strategy into artifacts in a creative, systematic, and logical fashion{'\n'}
          - Adapt and meticulous with creating user experiences.
        </Text>
      </ScrollView>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80, 
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  postedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  responsibilitiesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  applyButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#2CB67D',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetails;
