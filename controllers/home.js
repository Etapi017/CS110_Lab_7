const express = require('express');
const router = express.Router();
const Chatroom = require('../models/Chatroom');

// Handle a get request at '/' endpoint
function getHome(request, response) {
    Chatroom.find().exec().then(chatrooms => {
        response.render('home', { title: 'Home', chatrooms });
    }).catch(err => {
        console.error(err);
        response.status(500).send("Error fetching chatrooms");
    });
}

// Handle creating a new chatroom
router.post('/create', (req, res) => {
    const roomName = req.body.roomName;
    const newChatroom = new Chatroom({ name: roomName });
    newChatroom.save().then(() => {
        res.json({ success: true });
    }).catch(err => {
        console.error(err);
        res.status(500).send("Error creating chatroom");
    });
});

module.exports = {
    getHome,
    router
};
