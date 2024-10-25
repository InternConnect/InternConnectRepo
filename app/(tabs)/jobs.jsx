import React from 'react'; 
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const jobsData = [
  { id: '1', company: 'Company A', title: 'Software Engineer', location: 'Cape Town'},
  { id: '2', company: 'Company B', title: 'Data Scientist', location: 'Johannesburg'},
  { id: '3', company: 'Company C', title: 'Product Manager', location: 'Durban',},
];

const Jobs = () => {
  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      {/* Job Info */}
      <View style={styles.jobInfo}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>

        {/* Easy Apply Button */}
        <TouchableOpacity style={styles.easyApplyButton}>
          <Text style={styles.easyApplyText}>Easy apply</Text>
        </TouchableOpacity>
      </View>

      {/* Bookmark Icon Placeholder */}
      <View style={styles.bookmarkPlaceholder} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
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

      {/* Job Listings */}
      <FlatList
        data={jobsData}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.jobList}
      />
    </View>
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
  jobList: {
    paddingVertical: 20,
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
  bookmarkPlaceholder: {
    width: 24,  
    height: 24,
    backgroundColor: 'transparent', 
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
});

export default Jobs;
