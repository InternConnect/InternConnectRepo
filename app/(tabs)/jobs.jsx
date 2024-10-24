import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const jobs = () => {
  return (
<View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Empty Space */}
        <View style={styles.statusBarSpace} />

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/40' }} />
          <TouchableOpacity style={styles.emailButton}>
            <Text style={styles.emailIcon}>✉</Text>
          </TouchableOpacity>
        </View>

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
        <Text style={styles.title}>Job recommendations</Text>

        {/* Job listing cards */}
        {[1, 2, 3, 4].map((_, index) => (
          <JobListing
            key={index}
            companyName="companyName"
            jobTitle="Software Engineer"
            location="Cape Town"
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
<View style={styles.bottomNav}>
  <TouchableOpacity style={styles.navItem}>
    <Text style={styles.navIcon}>🏠</Text> 
  </TouchableOpacity>
  <TouchableOpacity style={styles.navItem}>
    <Text style={styles.navIcon}>🔍</Text> 
  </TouchableOpacity>
  <TouchableOpacity style={styles.navItem}>
    <Text style={styles.navIcon}>🔔</Text> 
  </TouchableOpacity>
  <TouchableOpacity style={styles.navItem}>
    <Text style={styles.navIcon}>💼</Text> 
  </TouchableOpacity>
</View>

    </View>
  );
};

const JobListing = ({ companyName, jobTitle, location }) => {
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobInfo}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <Text style={styles.location}>{location}</Text>
        <TouchableOpacity style={styles.easyApplyButton}>
          <Text style={styles.easyApplyText}>Easy apply</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Text style={styles.bookmarkIcon}>📑</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  statusBarSpace: {
    height: 40, 
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  emailButton: {
    padding: 5,
  },
  emailIcon: {
    fontSize: 20,
    color: '#666',
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
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  jobCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  jobInfo: {
    flex: 1,
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
  bookmarkButton: {
    padding: 5,
    marginLeft: 10,
  },
  bookmarkIcon: {
    fontSize: 20,
    color: '#2CB67D',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: 'black', 
  },
});

