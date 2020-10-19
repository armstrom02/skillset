const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A Message must have a email'],
  },
  text: {
    type: String,
    required: [true, 'A Message must have a message'],
  },
  image: {
    type: String
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;