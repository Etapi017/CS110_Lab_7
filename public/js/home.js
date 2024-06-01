document.getElementById('createRoomForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const roomName = document.getElementById('roomName').value;

    fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = `/room/${roomName}`;
        } else {
            alert('Error creating room');
        }
    })
    .catch(error => console.error('Error:', error));
});
