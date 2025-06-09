import { auth, database } from './firebase-config.js';
import {
  ref,
  set,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  while (result.length < length) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create Private Room
window.createPrivateRoom = function (game) {
  const code = generateCode();
  const user = auth.currentUser;
  if (!user) return alert("Not logged in!");

  const roomRef = ref(database, `rooms/${game}/${code}`);
  set(roomRef, {
    players: {
      [user.uid]: {
        name: user.email,
        joinedAt: Date.now()
      }
    },
    createdBy: user.uid,
    started: false
  }).then(() => {
    showPrivateRoomUI(game, code);
  });
};

// Show Private Room UI
function showPrivateRoomUI(game, code) {
  hideAllPopups();
  document.getElementById(`${game}-popup`).style.display = 'block';
  document.getElementById(`${game}-private-room`).style.display = 'block';
  document.getElementById(`${game}-room-code`).innerText = code;
  document.getElementById(`${game}-back-btn`).style.display = 'block';

  const roomRef = ref(database, `rooms/${game}/${code}/players`);
  onValue(roomRef, snapshot => {
    const grid = document.getElementById(`${game}-players-grid`);
    grid.innerHTML = '';
    const players = snapshot.val() || {};
    let count = 0;
    for (let uid in players) {
      const player = players[uid];
      grid.innerHTML += `
        <div class="player-box-room">
          <div class="player-avatar-room"><i class="fas fa-user"></i></div>
          <div class="player-name-room">${player.name}</div>
        </div>
      `;
      count++;
    }

    document.getElementById(`${game}-start-private-btn`).disabled = (count < 2);
  });
}

// Copy Game Code
window.copyGameCode = function (game) {
  const code = document.getElementById(`${game}-game-code`).innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert("Copied: " + code);
  });
};

// Join with Code
window.joinPrivateGameWithCode = function (game) {
  const code = document.getElementById(`join-code-input-${game}`).value.trim().toUpperCase();
  if (!code) return alert("Enter a code!");
  const user = auth.currentUser;
  if (!user) return alert("Not logged in!");

  const playerRef = ref(database, `rooms/${game}/${code}/players/${user.uid}`);
  set(playerRef, {
    name: user.email,
    joinedAt: Date.now()
  }).then(() => {
    showPrivateRoomUI(game, code);
  });
}

// Cancel Private Room
window.cancelPrivateRoom = function (game) {
  const code = document.getElementById(`${game}-room-code`).innerText;
  const roomRef = ref(database, `rooms/${game}/${code}`);
  remove(roomRef);
  hideAllPopups();
}

// Start Game
window.startGame = function (game) {
  alert(`Starting ${game.toUpperCase()} game...`);
  // You can redirect or embed actual game page here
}

// Join Random Players
window.joinRandomPlayers = function (game) {
  hideAllPopups();
  document.getElementById(`${game}-popup`).style.display = 'block';
  document.getElementById(`${game}-waiting-room`).style.display = 'block';
  document.getElementById(`${game}-back-btn`).style.display = 'block';

  // Add real matchmaking logic here
  document.getElementById(`${game}-player1-name`).innerText = "You";
  document.getElementById(`${game}-player2-name`).innerText = "Searching...";
}

// Cancel Search
window.cancelRandomSearch = function (game) {
  document.getElementById(`${game}-waiting-room`).style.display = 'none';
  document.querySelector(`#${game}-popup .game-play-options`).style.display = 'block';
  document.getElementById(`${game}-back-btn`).style.display = 'none';
}
