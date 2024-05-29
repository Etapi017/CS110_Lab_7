const roomName = window.location.pathname.split('/').pop();
const messagesContainer = document.getElementById('messages');
const nicknameForm = document.getElementById('nicknameForm');
const messageForm = document.getElementById('messageForm');
let nickname = '';

// Function to load messages
function loadMessages() {
    fetch(`/${roomName}/messages`)
        .then(response => response.json())
        .then(messages => {
            messagesContainer.innerHTML = messages.map(msg => `
                <div class="message">
                    <strong>${msg.nickname}</strong>: ${msg.body} <em>${new Date(msg.datetime).toLocaleString()}</em>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for nickname form
nicknameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    nickname = document.getElementById('nickname').value;
    if (nickname) {
        nicknameForm.style.display = 'none';
        messageForm.style.display = 'block';
    }
});

// Event listener for message form
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    if (nickname && message) {
        fetch(`/${roomName}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, message })
        })
        .then(response => response.json())
        .then(() => {
            document.getElementById('message').value = '';
            loadMessages();
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please set a nickname before sending messages.');
    }
});

// Initial message load
loadMessages();
setInterval(loadMessages, 3000);  // Refresh messages every 3 seconds
