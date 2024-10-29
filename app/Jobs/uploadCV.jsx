import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const UploadCV = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleUpload = () => {
    // Handle CV upload logic here
    console.log('Uploading CV...');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Job Title and Details */}
      <Text style={styles.jobTitle}>Software Engineer</Text>
      <Text style={styles.companyName}>Toptal</Text>
      <Text style={styles.postedDate}>Posted on 20 July</Text>

      {/* Upload Section */}
      <Text style={styles.uploadText}>Add a CV for the employer</Text>
      <TouchableOpacity style={styles.uploadBox}>
        <Image source={{ uri: 'https://img.icons8.com/fluency/48/000000/upload.png' }} style={styles.uploadIcon} />
        <View>
          <Text style={styles.uploadBoxText}>upload a CV</Text>
          <Text style={styles.uploadBoxSubtext}>pdf, docx, txt</Text>
        </View>
      </TouchableOpacity>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  uploadBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadBoxSubtext: {
    fontSize: 14,
    color: '#666',
  },
  uploadButton: {
    backgroundColor: '#2CB67D',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadCV;
