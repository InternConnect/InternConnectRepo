import { StyleSheet, View } from 'react-native';
import { useEffect } from "react";
import { SplashScreen, Stack, Slot, useSegments, useRouter } from "expo-router";
import { StackActions } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './context/authContext';


const MainLayout = () => {
  const { isAuthenticated } = useAuth(); 
  const segments = useSegments(); 
  const router = useRouter(); 

  useEffect(() => {
    // If the authentication status is not yet available, do nothing
    if (typeof isAuthenticated == 'undefined') return;

    // Check if the user is in the authentication flow (e.g., sign-in or sign-up pages)
    const inApp = segments[0] == '(auth)';

    if (isAuthenticated && !inApp) {
      // User is already authenticated and not in the sign-in/up flow, stay on the current screen
      router.replace('home');
    } else if (isAuthenticated == false) {
      // User is not authenticated, redirect them to the sign-in screen
      router.replace('sign-in');
    }
  }, [isAuthenticated]); 

  return <Slot />; // This renders the current screen based on the route
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      {/* Provide authentication context to the entire app */}
      <MainLayout />
    </AuthContextProvider>
  );
}
