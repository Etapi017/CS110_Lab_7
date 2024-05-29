const express = require('express');
const router = express.Router();
const roomGenerator = require('../util/roomIdGenerator.js');
const messages = {}; // This object will store messages for simplicity

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
    response.render('room', {
        title: 'Chatroom',
        roomName: request.params.roomName,
        newRoomId: roomGenerator.roomIdGenerator()
    });
}

// Handle fetching messages for a specific chatroom
router.get('/:roomName/messages', (req, res) => {
    const roomName = req.params.roomName;
    const roomMessages = messages[roomName] || [];
    res.json(roomMessages);
});

// Handle posting a new message to a specific chatroom
router.post('/:roomName/messages', (req, res) => {
    const roomName = req.params.roomName;
    const { nickname, message } = req.body;
    const newMessage = {
        nickname,
        body: message,
        datetime: new Date().toISOString()
    };
    if (!messages[roomName]) {
        messages[roomName] = [];
    }
    messages[roomName].push(newMessage);
    res.json({ success: true });
});

module.exports = {
    getRoom,
    router
};
