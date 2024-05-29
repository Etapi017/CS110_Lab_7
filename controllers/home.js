const express = require('express');
const router = express.Router();
const roomGenerator = require('../util/roomIdGenerator.js');

// Example for handle a get request at '/' endpoint.
function getHome(request, response) {
    // Fetch the list of chatrooms from the database (mocked here for simplicity)
    const chatrooms = ['room1', 'room2', 'room3']; // This should come from your database
    response.render('home', { title: 'Home', chatrooms });
}

// Handle the creation of a new chatroom
router.post('/create', (req, res) => {
    const roomName = req.body.roomName;
    // Add the new chatroom to the database (mocked here for simplicity)
    // In a real application, you would save this to your database
    res.json({ success: true });
});

module.exports = {
    getHome,
    router
};
