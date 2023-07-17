const express = require("express");
const Subtask = require("../models/Subtask");
const Task = require("../models/Task");
const router = express.Router();


// Create a new subtask
router.post("/create/:taskId", async (req, res) => {
  const {taskId}=req.params
  try {
    const { title, isCompleted } = req.body;

    const subtask = new Subtask({ title, isCompleted,taskId });
    const result =await subtask.save()
    await Task.findOneAndUpdate({_id:taskId},{
      $push:{subtasks :result._id}
    })
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to create subtask" });
  }
});

// Update a subtask
router.put("/:subtaskId", async (req, res) => {
  try {
    const { subtaskId } = req.params;
    const { title, isCompleted } = req.body;

    const updatedSubtask = await Subtask.findByIdAndUpdate(
     { _id:subtaskId},
      { title, isCompleted },
      { new: true }
    );

    if (!updatedSubtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    res.status(200).json(updatedSubtask);
  } catch (error) {
    res.status(400).json({ error: "Failed to update subtask" });
  }
});

// Delete a subtask
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubtask = await Subtask.findByIdAndDelete(id);

    if (!deletedSubtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete subtask" });
  }
});

module.exports = router;
