import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { images } from '../../constants';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Loading from '../../components/Loading';
import CustomKeyBoard from '../../components/CustomKeyBoard';
import { useAuth } from '../context/authContext';

const SignUp = () => {
  const router = useRouter();
  const {register} = useAuth()
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('job-seeker'); // default value
  const emailRef = useRef('');
  const usernameRef= useRef('');
  const passwordRef = useRef('');

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', 'Please fill all the fields');
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, userType);    setLoading(false);
    console.log('got result: ', response);
    if(!response.success){
      Alert.alert('sign up',response.msg);
    }else {
      // Redirect based on user type
      if (userType === 'job-seeker') {
        router.push('/(tabs)/home'); // Redirect to job seeker home
      } else if (userType === 'employer') {
        router.push('/(employerTabs)/employerhome'); // Redirect to employer home
      }
    }
   };

  return (
    <CustomKeyBoard>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>InternConnect</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
        onChangeText={(value) => (usernameRef.current = value)}

         style={styles.inputField} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={(value) => (emailRef.current = value)}
          style={styles.inputField}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={(value) => (passwordRef.current = value)}
          secureTextEntry
          style={styles.inputField}
        />

        {/* User Type Selection */}
        <Text style={styles.label}>Register as:</Text>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'job-seeker' && styles.selectedUserType]}
            onPress={() => setUserType('job-seeker')}
          >
            <Text style={styles.userTypeText}>Job Seeker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'employer' && styles.selectedUserType]}
            onPress={() => setUserType('employer')}
          >
            <Text style={styles.userTypeText}>Employer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loading size={hp(12)} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={images.googleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text style={styles.signUpLink}>Login In</Text>
        </TouchableOpacity>
      </View>
</CustomKeyBoard>  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginTop: hp(5),
    marginBottom: hp(3),
    alignItems: 'center',
  },
  title: {
    color: '#22C55E',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
  inputContainer: {
    marginTop: hp(2),
  },
  label: {
    color: '#000',
    fontSize: 14,
    marginTop: hp(2),
  },
  inputField: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    fontSize: 16,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: hp(2),
    marginBottom: 10,
  },
  userTypeButton: {
    backgroundColor: '#f3f4f6', // light gray background
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  selectedUserType: {
    backgroundColor: '#22C55E', // green background for selected
  },
  userTypeText: {
    color: '#000',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    width: 80,
  },
  orText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 32,
  },
  signUpText: {
    color: '#000',
  },
  signUpLink: {
    color: '#22C55E',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignUp;
