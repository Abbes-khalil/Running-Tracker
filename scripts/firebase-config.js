import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "running-tracker-2bbc0.firebaseapp.com",
  projectId: "running-tracker-2bbc0",
  storageBucket: "running-tracker-2bbc0.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "1:35040681174:web:0af4dc9fd18b597776bd77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Authentication
export const db = getFirestore(app);
export const auth = getAuth(app);

// Current user ID (will be set after authentication)
let currentUser = null;

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    console.log('User logged in:', user.uid);
    // loadActivities() is now expected to be handled by the page's main logic
  } else {
    console.log('User logged out');
  }
});

// Helper to get current user
export function getCurrentUser() {
  return currentUser;
}

// ==================== ACTIVITIES FUNCTIONS ====================

// Add a new running activity
export async function addActivity(activityData) {
  const user = getCurrentUser();
  if (!user) {
    alert('Please sign in first');
    return;
  }

  try {
    const activitiesCollection = collection(db, 'activities');
    const docRef = await addDoc(activitiesCollection, {
      userId: user.uid,
      date: new Date(activityData.date),
      distance: parseFloat(activityData.distance),
      duration: parseFloat(activityData.duration), // in minutes
      pace: calculatePace(activityData.distance, activityData.duration),
      notes: activityData.notes || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Activity added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding activity:', error);
    alert('Error saving activity. Please try again.');
  }
}

// Get all activities for current user
export async function getActivities() {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const activitiesCollection = collection(db, 'activities');
    const q = query(
      activitiesCollection,
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);

    const activities = [];
    snapshot.forEach(doc => {
      activities.push({ id: doc.id, ...doc.data() });
    });
    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

// Update an existing activity
export async function updateActivity(activityId, updatedData) {
  const user = getCurrentUser();
  if (!user) return;

  try {
    const activityRef = doc(db, 'activities', activityId);
    await updateDoc(activityRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    console.log('Activity updated:', activityId);
  } catch (error) {
    console.error('Error updating activity:', error);
  }
}

// Delete an activity
export async function deleteActivity(activityId) {
  const user = getCurrentUser();
  if (!user) return;

  try {
    const activityRef = doc(db, 'activities', activityId);
    await deleteDoc(activityRef);
    console.log('Activity deleted:', activityId);
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
}

// ==================== PERSONAL RECORDS FUNCTIONS ====================

// Get personal records
export async function getPersonalRecords() {
  const activities = await getActivities();
  if (activities.length === 0) return null;

  const records = {
    longestDistance: Math.max(...activities.map(a => a.distance)),
    longestDuration: Math.max(...activities.map(a => a.duration)),
    fastestPace: Math.min(...activities.map(a => a.pace)),
    totalDistance: activities.reduce((sum, a) => sum + a.distance, 0),
    totalActivities: activities.length
  };

  return records;
}

// ==================== HELPER FUNCTIONS ====================

// Calculate pace (min/km) from distance (km) and duration (minutes)
export function calculatePace(distance, duration) {
  if (distance <= 0) return 0;
  return duration / distance;
}

// Format date for display
export function formatDate(date) {
  if (date && typeof date.toDate === 'function') {
    date = date.toDate();
  } else if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// ==================== AUTHENTICATION FUNCTIONS ====================

// Sign up new user
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const usersCollection = collection(db, 'users');
    await addDoc(usersCollection, {
      email: email,
      createdAt: serverTimestamp(),
      uid: userCredential.user.uid
    });
    console.log('User registered:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    alert('Error: ' + error.message);
  }
}

// Log in existing user
export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Error: ' + error.message);
  }
}

// Log out current user
export async function logOut() {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}
