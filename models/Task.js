const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  boardId :{
    type:"ObjectId",
    ref:"Board"
  },

  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Todo", "Doing", "Done"],
    default: "Todo",
  },
  subtasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtask",
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
