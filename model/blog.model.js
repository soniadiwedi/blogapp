const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // likes: {
  //   type: Number,
  //   default: 0,
  // },
  // comments: [{
  //   username: String,
  //   content: String,
  // }],
  // userID:String
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
