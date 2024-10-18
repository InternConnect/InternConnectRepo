import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, databaseFB } from "../../FirebaseConfig";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { get } from "firebase/database";

// Create the context
export const AuthContext = createContext();

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  // Monitor authentication state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData= async (userId)=>{
    const docRef = doc(databaseFB,'users',userId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      let  data = docSnap.data();
      setUser({...user,username:data.username, userType: data.userType, userId: data.userId})
    }
  }
  // Login function
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('auth/wrong-password')) msg = 'Wrong password';
      if (msg.includes('auth/invalid-email')) msg = 'Invalid email';
      if (msg.includes('auth/user-not-found')) msg = 'User not found';
      if (msg.includes('auth/invalid-credential')) msg = 'invalid email or password';

      return { success: false, msg };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  // Register function
  const register = async (email, password, username, userType) => {
    try {
      if (!username || !userType) {
        return { success: false, msg: 'Username and user type are required' };
      }
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(databaseFB, "users", response.user.uid), {
        username,
        userType,
        userId: response.user.uid,
      });
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('auth/invalid-email')) msg = 'Invalid email';
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
