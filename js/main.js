// Hide splash after 3 seconds and show body
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.body.style.display = 'block';
  }, 3000);
});

// Auto scroll banner slider (if exists)
setInterval(() => {
  const banner = document.getElementById('home-slider');
  if (banner) {
    banner.scrollLeft += 1;
    if (banner.scrollLeft + banner.clientWidth >= banner.scrollWidth) {
      banner.scrollLeft = 0;
    }
  }
}, 30);

// Show popup menu
window.showMenuPopup = function () {
  document.getElementById('popup-menu').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
};

// Hide overlay + popup
window.hidePopupMenu = function () {
  document.getElementById('popup-menu').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
};

// Show any section
window.showPage = function (id) {
  document.querySelectorAll('.popup-page').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';
};

// Share app (for mobile)
window.shareApp = function () {
  if (navigator.share) {
    navigator.share({
      title: "Real Money Game",
      text: "Come play and win cash!",
      url: window.location.href
    }).catch(err => console.log("Share failed:", err));
  } else {
    alert("Sharing not supported.");
  }
};
import { auth, database } from './firebase-config.js';
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Load Profile Info
function loadUserProfile() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = ref(database, 'users/' + user.uid);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById('profile-name').innerText = data.name || '';
      document.getElementById('profile-email').innerText = data.email || '';
      document.getElementById('profile-phone').innerText = data.phone || '';
      document.getElementById('profile-balance').innerText = data.balance || 0;
    }
  });
}

// Call it when profile page is shown
window.showPage = function (id) {
  document.querySelectorAll('.popup-page').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'profile-page') {
    loadUserProfile();
  }
};
