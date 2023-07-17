const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  taskId:{
    type:"ObjectId",
    ref:"Task"
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;
