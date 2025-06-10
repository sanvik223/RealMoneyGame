import { auth, database } from './firebase-config.js';
import {
  ref,
  get,
  set,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// ⏳ Hide splash screen after 3s
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.body.style.display = 'block';
  }, 3000);
});

// 🎞️ Auto scroll banner slider
setInterval(() => {
  const banner = document.getElementById('home-slider');
  if (banner) {
    banner.scrollLeft += 1;
    if (banner.scrollLeft + banner.clientWidth >= banner.scrollWidth) {
      banner.scrollLeft = 0;
    }
  }
}, 30);

// 📱 Show menu popup
window.showMenuPopup = function () {
  document.getElementById('popup-menu').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
};

// ❌ Hide popup menu
window.hidePopupMenu = function () {
  document.getElementById('popup-menu').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
};

// 🔁 Show page by ID
window.showPage = function (id) {
  document.querySelectorAll('.popup-page').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'profile-page') {
    loadUserProfile();
  }
};

// 📤 Share app
window.shareApp = function () {
  if (navigator.share) {
    navigator.share({
      title: "Real Money Game",
      text: "Come play and win cash!",
      url: window.location.href
    }).catch(err => console.log("Share failed:", err));
  } else {
    alert("Sharing not supported on this device.");
  }
};

// 👤 Load Profile Info
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

// 💸 Withdraw with turnover validation
window.submitWithdraw = function () {
  const withdrawAmount = parseInt(document.getElementById('withdraw-amount').value);
  const user = auth.currentUser;
  if (!user || isNaN(withdrawAmount) || withdrawAmount <= 0) {
    alert("Enter valid amount.");
    return;
  }

  const userRef = ref(database, 'users/' + user.uid);
  get(userRef).then(snapshot => {
    const data = snapshot.val();
    const maxWithdrawable = (data.totalTurnover || 0) - (data.withdrawnAmount || 0);
    const balance = data.balance || 0;

    if (withdrawAmount > balance) {
      alert("Insufficient balance.");
    } else if (withdrawAmount > maxWithdrawable) {
      alert(`You can withdraw maximum ৳${maxWithdrawable} based on your gameplay.`);
    } else {
      const newBalance = balance - withdrawAmount;
      const newWithdrawn = (data.withdrawnAmount || 0) + withdrawAmount;

      update(userRef, {
        balance: newBalance,
        withdrawnAmount: newWithdrawn
      });

      const txnRef = ref(database, 'transactions/' + user.uid + '/' + Date.now());
      set(txnRef, {
        type: 'Withdraw',
        amount: withdrawAmount,
        timestamp: Date.now()
      });

      alert("Withdraw request submitted.");
      document.getElementById('withdraw-amount').value = "";
    }
  });
};

// 💰 Deposit with bonus logic
window.submitDepositRequest = function () {
  const user = auth.currentUser;
  const amount = parseInt(document.getElementById('deposit-amount').value);
  const method = document.getElementById('deposit-method').value;
  const trxId = document.getElementById('deposit-trx').value.trim();

  if (!user || isNaN(amount) || amount <= 0 || !method || !trxId) {
    alert("Please fill all fields correctly.");
    return;
  }

  const uid = user.uid;
  const userRef = ref(database, 'users/' + uid);
  const bonusRatesRef = ref(database, 'bonusRates/' + method);

  get(userRef).then(userSnap => {
    const userData = userSnap.val() || {};
    get(bonusRatesRef).then(bonusSnap => {
      const bonusPercent = bonusSnap.exists() ? bonusSnap.val() : 0;
      const bonus = Math.floor((amount * bonusPercent) / 100);
      const total = amount + bonus;
      const newBalance = (userData.balance || 0) + total;

      update(userRef, { balance: newBalance });

      const txnRef = ref(database, 'transactions/' + uid + '/' + Date.now());
      set(txnRef, {
        type: "Deposit",
        method,
        amount,
        bonus,
        total,
        trxId,
        timestamp: Date.now()
      });

      alert(`Deposit submitted!\nAmount: ৳${amount}\nBonus: ৳${bonus}\nTotal Added: ৳${total}`);

      document.getElementById('deposit-amount').value = '';
      document.getElementById('deposit-trx').value = '';
    });
  });
};

// 📊 Load Bonus Rates from Firebase and show in cards
function loadBonusRates() {
  const ratesRef = ref(database, 'bonusRates');
  onValue(ratesRef, (snapshot) => {
    const rates = snapshot.val();
    if (rates) {
      ['Bkash', 'Nagad', 'Rocket', 'Binance'].forEach(method => {
        const label = document.getElementById(`bonus-${method}`);
        const rate = rates[method] || 0;
        if (label) {
          label.innerText = `+${rate}% Bonus`;
        }
      });
    }
  });
}

// 🚀 Call on page load
document.addEventListener('DOMContentLoaded', () => {
  loadBonusRates();
});
