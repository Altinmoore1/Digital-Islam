# Carousel Images Not Showing - Troubleshooting Guide

## Issue
Images uploaded to the carousel in the Admin Panel are not displaying on the live domain.

## Potential Causes & Solutions

### 1. Firebase Storage Rules Not Deployed ⚠️ **MOST LIKELY**

**Check:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Go to **Storage** → **Rules**
- Verify the rules match `storage.rules` file

**Fix:**
```bash
# Deploy storage rules
firebase deploy --only storage
```

**Expected Rules:**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 2. CORS Configuration

Firebase Storage should automatically handle CORS, but if images still don't load:

**Check in Browser Console (F12):**
- Look for CORS errors like: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Fix:**
Create a `cors.json` file:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

Then run:
```bash
gsutil cors set cors.json gs://your-bucket-name.appspot.com
```

### 3. Image URLs Format

**Check:**
- Open browser DevTools (F12) → Network tab
- Look for failed image requests (red status)
- Verify URLs start with: `https://firebasestorage.googleapis.com/`

**Debug in Admin Panel:**
- In the "Current Carousel Items" section, right-click an image
- Select "Inspect" to see the actual `src` URL
- Copy the URL and try opening it in a new browser tab

### 4. Browser Cache

**Fix:**
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Try incognito/private browsing mode

### 5. Firebase Authentication

**Check:**
- Ensure you're logged in when uploading images
- The storage rules require authentication for writes

### 6. Verify Upload Success

**Check in Firebase Console:**
- Go to Storage → Files
- Navigate to `landing_page/` folder
- Verify your uploaded images are there
- Click on an image and copy the download URL
- Try opening that URL in a new tab

## Quick Diagnostic Steps

1. **Open Browser Console (F12)**
   - Go to your live domain
   - Check Console tab for errors
   - Check Network tab for failed image requests

2. **Verify Firebase Storage**
   - Login to Firebase Console
   - Check if images exist in Storage
   - Try accessing image URLs directly

3. **Test Image URL**
   - Copy a carousel image URL from Firestore
   - Paste it in a new browser tab
   - If it doesn't load, the issue is with Firebase Storage permissions

4. **Check Firestore Data**
   - Firebase Console → Firestore Database
   - Navigate to `hero_carousel` collection
   - Verify `mediaUrl` field contains valid URLs

## Most Common Fix

**Deploy Firebase Storage Rules:**
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init

# Deploy storage rules
firebase deploy --only storage
```

## Still Not Working?

1. Check browser console for specific error messages
2. Verify the image URLs in Firestore are accessible
3. Ensure Firebase Storage is enabled in your project
4. Check if there are any billing/quota issues in Firebase Console
