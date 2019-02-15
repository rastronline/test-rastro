const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isRead: {
    type: Boolean,
    defaul: false
  }
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;