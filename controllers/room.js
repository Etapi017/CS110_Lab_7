const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');
const Message = require('../models/Message');

// Handle a get request at '/:roomName' endpoint
function getRoom(request, response) {
    response.render('room', {
        title: 'Chatroom',
        roomName: request.params.roomName
    });
}

// Handle fetching messages for a specific chatroom
router.get('/:roomName/messages', (req, res) => {
    const roomName = req.params.roomName;
    Chatroom.findOne({ name: roomName })
        .populate('messages')
        .then(chatroom => {
            res.json(chatroom.messages);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error fetching messages");
        });
});

// Handle posting a new message to a specific chatroom
router.post('/:roomName/messages', (req, res) => {
    const roomName = req.params.roomName;
    const { nickname, message } = req.body;

    Chatroom.findOne({ name: roomName }).then(chatroom => {
        const newMessage = new Message({
            nickname,
            body: message,
            chatroom: chatroom._id
        });
        return newMessage.save().then(savedMessage => {
            chatroom.messages.push(savedMessage);
            return chatroom.save();
        });
    }).then(() => {
        res.json({ success: true });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error posting message");
    });
});

// Define the route to render the chatroom page
router.get('/room/:roomName', getRoom);

module.exports = {
    getRoom,
    router
};
