const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
