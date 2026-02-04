"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

let authInitialized = false;
let cachedUser: User | null = null;
let cachedIsAdmin = false;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(cachedUser);
  const [loading, setLoading] = useState(!authInitialized);
  const [isAdmin, setIsAdmin] = useState(cachedIsAdmin);

  const setupRef = useRef(false);

  useEffect(() => {
    if (setupRef.current) {
      if (authInitialized) {
        queueMicrotask(() => {
          setUser(cachedUser);
          setIsAdmin(cachedIsAdmin);
          setLoading(false);
        });
      }
      return;
    }

    setupRef.current = true;

    // Load cached admin status instantly (prevents UI flicker)
    const cachedAdmin = localStorage.getItem("isAdmin");
    if (cachedAdmin !== null) {
      cachedIsAdmin = cachedAdmin === "true";
      queueMicrotask(() => setIsAdmin(cachedIsAdmin));
    }

    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      cachedUser = firebaseUser;

      let adminStatus = false;

      if (firebaseUser) {
        try {
          // Force refresh the token to get latest custom claims
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          adminStatus = !!tokenResult.claims.admin;

          console.log("User UID:", firebaseUser.uid);
          console.log("Custom Claims:", tokenResult.claims);
          console.log("Is Admin:", adminStatus);
        } catch (err) {
          console.error("Failed to read admin claim:", err);
          // Fallback to cached admin status if token refresh fails
          adminStatus = cachedIsAdmin;
        }
      } else {
        console.log("User signed out");
      }

      cachedIsAdmin = adminStatus;

      queueMicrotask(() => {
        setUser(firebaseUser);
        setIsAdmin(adminStatus);
        setLoading(false);
        authInitialized = true;
      });

      // Persist admin status to localStorage
      if (firebaseUser) {
        localStorage.setItem("isAdmin", adminStatus.toString());
      } else {
        localStorage.removeItem("isAdmin");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}