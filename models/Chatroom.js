const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
