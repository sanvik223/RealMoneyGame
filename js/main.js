import { auth, database } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  ref,
  set,
  get,
  update
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Show specific auth form
function showForm(formId) {
  document.querySelectorAll('.auth-container').forEach(f => f.style.display = 'none');
  document.getElementById(formId).style.display = 'block';
}

// Register New User
window.registerUser = function () {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const referralCode = document.getElementById('referral-code').value.trim();

  if (!name || !phone || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      set(ref(database, 'users/' + uid), {
        name,
        phone,
        email,
        balance: 0,
        referrer: referralCode || null,
        referralBonusGiven: false,
        totalTurnover: 0,
        withdrawnAmount: 0
      });
      alert("Registration successful!");
      showForm('login-form');
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Login User
window.loginUser = function () {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// Reset Password
window.sendPasswordReset = function () {
  const email = document.getElementById('reset-email').value.trim();
  if (!email) {
    alert("Enter your email to reset password.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Reset email sent! Check your inbox.");
      showForm('login-form');
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Logout
window.logoutUser = function () {
  signOut(auth).then(() => {
    alert("Logged out successfully.");
    showForm('login-form');
    document.getElementById('home-page').style.display = 'none';
  }).catch((error) => {
    alert("Error: " + error.message);
  });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  showForm('login-form');
});
