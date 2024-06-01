import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [groupCode, setGroupCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Start loading when user state changes
      if (user) {
        setCurrentUser(user);
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role);
          setGroupCode(userData.group);
          console.log("AuthContext - Role set to:", userData.role); // Debug log
          console.log("AuthContext - Group code set to:", userData.group); // Debug log
        } else {
          setRole(null);
          setGroupCode(null);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
        setGroupCode(null);
      }
      setLoading(false); // Stop loading after user data is fetched
    });
    return unsubscribe;
  }, []);

  const login = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    setRole(null);
    setGroupCode(null);
    return signOut(auth);
  };

  const setRoleAndGroup = async (user, role, groupCode = null) => {
    const userRef = doc(db, "users", user.uid);
    let group = groupCode;

    if (role === "employer") {
      group = uuidv4();
    } else {
      // Check if the group code exists
      const groupQuery = query(
        collection(db, "users"),
        where("group", "==", groupCode)
      );
      const groupSnapshot = await getDocs(groupQuery);
      if (groupSnapshot.empty) {
        throw new Error("Group code does not exist");
      }
    }

    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role,
      group,
    });

    setRole(role);
    setGroupCode(group);
  };

  const value = {
    currentUser,
    login,
    logout,
    role,
    setRoleAndGroup,
    groupCode,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
