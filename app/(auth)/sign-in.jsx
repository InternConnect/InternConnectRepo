import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { images } from '../../constants';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Loading from '../../components/Loading';
import CustomKeyBoard from '../../components/CustomKeyBoard';
import { useAuth } from '../context/authContext';
import { doc, getDoc } from "firebase/firestore"; // Importing Firestore functions
import { databaseFB } from '../../FirebaseConfig'; // Ensure this import is correct

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill all the fields");
      return;
    }
    setLoading(true);

    // Perform the login
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign In', response.msg);
      return;
    }

    // Fetch user data from Firestore after login
    const userId = response.data.uid;
    try {
      const docRef = doc(databaseFB, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userType = userData.userType;

        // Redirect based on userType
        if (userType === 'job-seeker') {
          router.push('/(tabs)/home'); // Job seeker home
        } else if (userType === 'employer') {
          router.push('/(employerTabs)/home'); // Employer home
        }
      } else {
        Alert.alert('Sign In', 'User data not found');
      }
    } catch (error) {
      Alert.alert('Sign In', 'Failed to fetch user data');
    }
  };

  return (
    <CustomKeyBoard>
      <StatusBar style="dark" />
      {/* Title and Subtitle */}
      <View className="mt-16">
        <Text className="text-green-600 text-3xl font-bold">InternConnect</Text>
        <Text className="text-black text-base mt-2">Login to your account</Text>
      </View>

      {/* Input fields */}
      <View className="mt-10">
        <Text className="text-black text-base">Email</Text>
        {/* Email field */}
        <TextInput
          onChangeText={value => emailRef.current = value}
          style={styles.inputField}
        />

        <View className="flex-row justify-between mt-6">
          <Text className="text-black text-base">Password</Text>
          <TouchableOpacity>
            <Text className="text-green-500">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Password field */}
        <TextInput
          onChangeText={value => passwordRef.current = value}
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {/* Log In Button */}
      <View>
        {loading ? (
          <View className="flex-row justify-center">
            <Loading size={hp(12)} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Google Login */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={images.googleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('(auth)/sign-up')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </CustomKeyBoard>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
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
  loadingIndicator: {
    marginTop: 24,
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
});

export default SignIn;
