const express = require("express");
const Task = require("../models/Task");
const Board = require("../models/board");
const router = express.Router();


// Create a new task
router.post("/create/:boardId", async (req, res) => {
  const {boardId}= req.params
  try {
    const { title, description, status, subtasks } = req.body;

    const task = new Task({
      title,
      description,
      status,
      boardId,
      subtasks,
    });
    const  rest= await task.save();
    await Board.findOneAndUpdate({_id:boardId},{
      $push:{
        tasks:rest._id
      }
    })
    res.status(201).json(rest);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Failed to create task" });
  }
});

// Get all tasks
router.get("/:boardId", async (req, res) => {
  const {boardId}= req.params
  try {
    const tasks = await Task.find({boardId}).populate("subtasks");

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Failed to fetch tasks" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, subtasks } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, subtasks },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
