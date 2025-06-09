// Show game popup
window.showGamePopup = function (game) {
  hideAllPopups();
  document.getElementById(`${game}-popup`).style.display = 'block';
  document.querySelector(`#${game}-slider`).innerHTML = generateGameSlides(game);
  document.querySelector(`#${game}-popup .game-play-options`).style.display = 'block';
};

// Hide all popups
window.hideAllPopups = function () {
  document.querySelectorAll('.game-popup').forEach(p => p.style.display = 'none');
  document.getElementById('popup-menu').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  document.querySelectorAll('.popup-page').forEach(p => p.style.display = 'none');
};

// Generate dummy slider slides
function generateGameSlides(game) {
  return `
    <div class="game-slide">
      <div class="game-image-frame">
        <img src="assets/images/${game}-logo.jpg" class="game-image" alt="${game}">
      </div>
      <div class="game-reward-card">
        <div class="game-reward-title">${game.toUpperCase()} Mode</div>
        <div class="game-reward-box">
          <div class="game-reward-label">Win Reward</div>
          <div class="game-reward-amount">৳10</div>
        </div>
        <div class="game-entry-fee">Entry Fee: ৳5</div>
        <button class="btn btn-success play-btn" onclick="startGame('${game}')">
          <i class="fas fa-play"></i> Start Now
        </button>
      </div>
    </div>
  `;
}

// Slide navigation
window.nextSlide = function (game) {
  const slider = document.getElementById(`${game}-slider`);
  slider.scrollLeft += slider.offsetWidth;
};

window.prevSlide = function (game) {
  const slider = document.getElementById(`${game}-slider`);
  slider.scrollLeft -= slider.offsetWidth;
};

// Back button from code/join screen
window.backToGamePage = function (game) {
  document.getElementById(`${game}-code-section`).style.display = 'none';
  document.getElementById(`${game}-waiting-room`).style.display = 'none';
  document.getElementById(`${game}-private-room`).style.display = 'none';
  document.querySelector(`#${game}-popup .game-play-options`).style.display = 'block';
  document.getElementById(`${game}-back-btn`).style.display = 'none';
};
