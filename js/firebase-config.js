// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS5nlNZ-SA5erCj0Cf1v5KWhfnmcfPmRw",
  authDomain: "high--call-message.firebaseapp.com",
  databaseURL: "https://high--call-message-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "high--call-message",
  storageBucket: "high--call-message.firebasestorage.app",
  messagingSenderId: "369974545305",
  appId: "1:369974545305:web:10315a079922d1931fe108",
  measurementId: "G-3E4LTER2LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Export if needed in future
export { app, auth, database };
