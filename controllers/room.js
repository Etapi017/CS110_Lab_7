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
        .exec((err, chatroom) => {
            if (err) throw err;
            res.json(chatroom.messages);
        });
});

// Handle posting a new message to a specific chatroom
router.post('/:roomName/messages', (req, res) => {
    const roomName = req.params.roomName;
    const { nickname, message } = req.body;

    Chatroom.findOne({ name: roomName }, (err, chatroom) => {
        if (err) throw err;
        const newMessage = new Message({
            nickname,
            body: message,
            chatroom: chatroom._id
        });
        newMessage.save((err, savedMessage) => {
            if (err) throw err;
            chatroom.messages.push(savedMessage);
            chatroom.save((err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    });
});

module.exports = {
    getRoom,
    router
};
