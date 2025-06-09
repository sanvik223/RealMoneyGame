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
