// Firebase Configuration
// Replace these with your own Firebase config from Firebase Console
// https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "running-tracker-2bbc0.firebaseapp.com",
  projectId: "running-tracker-2bbc0",
  storageBucket: "running-tracker-2bbc0.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "1:35040681174:web:0af4dc9fd18b597776bd77"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = firebase.firestore();

// Initialize Authentication
const auth = firebase.auth();

// Firestore Collection References
const activitiesCollection = db.collection('activities');
const usersCollection = db.collection('users');

// Current user ID (will be set after authentication)
let currentUser = null;

// Authentication State Listener
auth.onAuthStateChanged((user) => {
  currentUser = user;
  if (user) {
    console.log('User logged in:', user.uid);
    loadActivities();
  } else {
    console.log('User logged out');
  }
});

// ==================== ACTIVITIES FUNCTIONS ====================

// Add a new running activity
async function addActivity(activityData) {
  if (!currentUser) {
    alert('Please sign in first');
    return;
  }

  try {
    const docRef = await activitiesCollection.add({
      userId: currentUser.uid,
      date: new Date(activityData.date),
      distance: parseFloat(activityData.distance),
      duration: parseFloat(activityData.duration), // in minutes
      pace: calculatePace(activityData.distance, activityData.duration),
      notes: activityData.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Activity added with ID:', docRef.id);
    loadActivities();
    return docRef.id;
  } catch (error) {
    console.error('Error adding activity:', error);
    alert('Error saving activity. Please try again.');
  }
}

// Get all activities for current user
async function getActivities() {
  if (!currentUser) return [];

  try {
    const snapshot = await activitiesCollection
      .where('userId', '==', currentUser.uid)
      .orderBy('date', 'desc')
      .get();
    
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

// Load activities and display them
async function loadActivities() {
  const activities = await getActivities();
  displayActivities(activities);
  updatePersonalRecords(activities);
}

// Update an existing activity
async function updateActivity(activityId, updatedData) {
  if (!currentUser) return;

  try {
    await activitiesCollection.doc(activityId).update({
      ...updatedData,
      updatedAt: new Date()
    });
    console.log('Activity updated:', activityId);
    loadActivities();
  } catch (error) {
    console.error('Error updating activity:', error);
  }
}

// Delete an activity
async function deleteActivity(activityId) {
  if (!currentUser) return;

  try {
    await activitiesCollection.doc(activityId).delete();
    console.log('Activity deleted:', activityId);
    loadActivities();
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
}

// ==================== PERSONAL RECORDS FUNCTIONS ====================

// Get personal records
async function getPersonalRecords() {
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

// Update and display personal records
async function updatePersonalRecords(activities) {
  if (activities.length === 0) return;

  const records = {
    longestDistance: Math.max(...activities.map(a => a.distance)),
    longestDuration: Math.max(...activities.map(a => a.duration)),
    fastestPace: Math.min(...activities.map(a => a.pace))
  };

  // Update PR page if it exists
  const distanceEl = document.querySelector('.pr-value:nth-of-type(1)');
  const durationEl = document.querySelector('.pr-value:nth-of-type(2)');
  const paceEl = document.querySelector('.pr-value:nth-of-type(3)');

  if (distanceEl) distanceEl.textContent = records.longestDistance.toFixed(2) + ' km';
  if (durationEl) durationEl.textContent = (records.longestDuration / 60).toFixed(1) + ' hrs';
  if (paceEl) paceEl.textContent = records.fastestPace.toFixed(2) + ' min/km';
}

// ==================== HELPER FUNCTIONS ====================

// Calculate pace (min/km) from distance (km) and duration (minutes)
function calculatePace(distance, duration) {
  if (distance <= 0) return 0;
  return duration / distance;
}

// Format date for display
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = date.toDate ? date.toDate() : new Date(date);
  }
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// ==================== AUTHENTICATION FUNCTIONS ====================

// Sign up new user
async function signUp(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await usersCollection.doc(userCredential.user.uid).set({
      email: email,
      createdAt: new Date()
    });
    console.log('User registered:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    alert('Error: ' + error.message);
  }
}

// Log in existing user
async function logIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Error: ' + error.message);
  }
}

// Log out current user
async function logOut() {
  try {
    await auth.signOut();
    currentUser = null;
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

// Display activities (placeholder function)
function displayActivities(activities) {
  console.log('Displaying activities:', activities);
  // This will be implemented in activities.html
}
