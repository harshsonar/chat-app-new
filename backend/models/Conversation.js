// Create schema for conversation object
// Must contain - 
// convId, userId1, userId2, createdAt, 
// chats [{
//   sentAt, sentBy: userId, message  
// }]

const {v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sentAt: {type: Date, default: Date.now},
    sentBy: {type: String, required: true},
    message: {type: String}
});

const ConversationSchema = new mongoose.Schema({
    convId: {type: String, unique: true, default: uuidv4},
    userId1: {type: String, required: true},
    userId2: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    chats: [chatSchema],
    isDeleted: {type: Boolean, default: false},
    unreadChatCount: {type: Number, default: 0}
});

module.exports = mongoose.model('Conversation', ConversationSchema);
