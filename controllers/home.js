const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');

// Handle a get request at '/' endpoint
function getHome(request, response) {
    Chatroom.find({}, (err, chatrooms) => {
        if (err) throw err;
        response.render('home', { title: 'Home', chatrooms });
    });
}

// Handle creating a new chatroom
router.post('/create', (req, res) => {
    const roomName = req.body.roomName;
    const newChatroom = new Chatroom({ name: roomName });
    newChatroom.save((err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

module.exports = {
    getHome,
    router
};
