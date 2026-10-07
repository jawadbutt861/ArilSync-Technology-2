import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../services/firebase';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isDemoAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'arilsync_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. If Firebase Auth is configured and active, listen to Firebase Auth
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Administrator',
            isDemoAdmin: false,
          });
        } else {
          // Check if local demo admin session exists
          const localAuth = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (localAuth) {
            try {
              setUser(JSON.parse(localAuth));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // 2. Local session check
      const localAuth = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (localAuth) {
        try {
          setUser(JSON.parse(localAuth));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // If Firebase Auth is configured, attempt Firebase sign-in
    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || 'Firebase Administrator',
          isDemoAdmin: false,
        });
        return { success: true };
      } catch (err: any) {
        // If Firebase auth fails or project not deployed, allow demo admin if credentials match
        if (email.toLowerCase() === 'admin@arilsync.com' && password === 'admin123') {
          const demoUser: AuthUser = {
            uid: 'admin-local-101',
            email: 'admin@arilsync.com',
            displayName: 'Senior Admin (Local Mode)',
            isDemoAdmin: true,
          };
          setUser(demoUser);
          localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
          return { success: true };
        }
        return { success: false, error: err.message || 'Firebase authentication failed' };
      }
    }

    // Local / development admin credentials
    if (
      (email.toLowerCase() === 'admin@arilsync.com' && password === 'admin123') ||
      (email.toLowerCase() === 'jawadbutt861@gmail.com' && password.length >= 6) ||
      (email.includes('@') && password === 'admin123')
    ) {
      const demoUser: AuthUser = {
        uid: `admin-${Date.now()}`,
        email: email,
        displayName: 'Administrator',
        isDemoAdmin: true,
      };
      setUser(demoUser);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Try admin@arilsync.com / admin123',
    };
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Error signing out from Firebase:', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: Boolean(user),
        signIn,
        signOut,
        isFirebaseActive: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
