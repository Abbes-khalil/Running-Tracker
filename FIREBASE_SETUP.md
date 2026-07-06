# Firebase Setup Guide for Fit Tracker

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `Running-tracker` (or any name)
4. Accept the terms and click **"Create project"**
5. Wait for the project to be created

## Step 2: Set Up Firestore Database

1. In the Firebase Console, go to **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development; change to production rules later)
4. Select a location (closest to you)
5. Click **"Create"**

## Step 3: Set Up Authentication

1. In Firebase Console, go to **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"**
4. Enable it and click **"Save"**

## Step 4: Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Look for **"Web"** app (if not present, click **"</>** to create one)
4. Copy the Firebase config object that looks like:
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## Step 5: Update Your Config

1. Open `scripts/firebase-config.js`
2. Replace the placeholder values with your actual Firebase config
3. Save the file

## Step 6: Add Firebase to Your HTML Files

Add these two lines to the `<head>` section of each HTML file (before closing `</head>`):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
<script src="scripts/firebase-config.js"></script>
```

Add this before closing `</body>`:
```html
<script src="scripts/functions.js"></script>
```

## Database Structure

Your Firestore database will automatically create this structure:

```
collections/
├── activities/
│   ├── {activityId}/
│   │   ├── userId: "user123"
│   │   ├── date: 2026-07-06
│   │   ├── distance: 5.5 (km)
│   │   ├── duration: 45 (minutes)
│   │   ├── pace: 8.18 (min/km)
│   │   ├── notes: "Great run!"
│   │   ├── createdAt: 2026-07-06T...
│   │   └── updatedAt: 2026-07-06T...
│
└── users/
    └── {userId}/
        ├── email: "user@example.com"
        └── createdAt: 2026-07-06T...
```

## Firestore Security Rules

For testing (replace later with production rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /activities/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

1. Go to Firebase Console → **"Firestore Database"** → **"Rules"** tab
2. Replace the content with the rules above
3. Click **"Publish"**

## Using the API

### Add an Activity
```javascript
await addActivity({
  date: '2026-07-06',
  distance: 5.5,
  duration: 45,
  notes: 'Great morning run'
});
```

### Get All Activities
```javascript
const activities = await getActivities();
```

### Update Activity
```javascript
await updateActivity(activityId, {
  distance: 6.0,
  notes: 'Updated distance'
});
```

### Delete Activity
```javascript
await deleteActivity(activityId);
```

### Get Personal Records
```javascript
const records = await getPersonalRecords();
console.log(records.longestDistance); // 5.5 km
```

## User Authentication

### Sign Up
```javascript
await signUp('user@example.com', 'password123');
```

### Log In
```javascript
await logIn('user@example.com', 'password123');
```

### Log Out
```javascript
await logOut();
```

## Next Steps

1. Update `addMenu.html` to use `addActivity()` function
2. Update `activities.html` to display activities from Firebase
3. Update `pr.html` to show personal records from Firebase
4. Create a login page or authentication modal
5. Set up proper Firestore security rules for production

Need help with any of these steps?
