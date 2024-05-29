const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    nickname: String,
    body: String,
    datetime: { type: Date, default: Date.now },
    chatroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom' }
});

module.exports = mongoose.model('Message', MessageSchema);
