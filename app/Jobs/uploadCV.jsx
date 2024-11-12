import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

const UploadCV = () => {
  const router = useRouter(); // For navigation
  const [document, setDocument] = useState(null); // Store the selected document

  // Function to allow users to select a document (CV)
  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept any file type
        copyToCacheDirectory: true, // Save to cache
      });

      console.log('Document picker result:', result);

      // Check if the user selected a document
      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Access the first file
        const fileExtension = file.uri.split('.').pop().toLowerCase();

        // Only accept PDF, DOCX, or TXT files
        if (['pdf', 'docx', 'txt'].includes(fileExtension)) {
          setDocument(file); // Save the document URI
          console.log('Document selected:', file);
        } else {
          Alert.alert('Invalid file type', 'Please select a PDF, DOCX, or TXT file.');
        }
      } else {
        console.log('User canceled the document picker');
      }
    } catch (err) {
      console.error('Error picking document: ', err);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  // Function to handle the form submission (uploading the CV)
  const handleSubmit = () => {
    if (document) {
      console.log('Document ready for upload:', document);
      Alert.alert('Success', 'Your CV has been uploaded successfully.');
      router.push('/jobDetails'); // Redirect after uploading
    } else {
      Alert.alert('Error', 'Please select a document to upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.jobTitle}>Software Engineer</Text>
      <Text style={styles.company}>Toptal</Text>
      <Text style={styles.datePosted}>Posted on 20 July</Text>
      
      <Text style={styles.label}>Add a CV for the employer</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={selectDocument}>
        <Text style={styles.uploadBoxText}>upload a CV</Text>
        <Text style={styles.fileTypes}>pdf, docx, txt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
        <Text style={styles.uploadButtonText}>upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  datePosted: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  uploadBox: {
    width: '80%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadBoxText: {
    fontSize: 16,
    color: '#000',
  },
  fileTypes: {
    fontSize: 12,
    color: '#999',
  },
  uploadButton: {
    width: '60%',
    backgroundColor: '#2CB67D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadCV;
