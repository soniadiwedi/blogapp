const express = require("express");
const Board = require("../models/board");
const router = express.Router();


// Create a new board
router.post("/create", async (req, res) => {
  
  try {
    const { name } = req.body;

    const board = new Board({ name });
    const resp= await board.save();
    res.status(201).json(resp);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Failed to create board" });
  }
});

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find().populate(
      {
        path:"tasks",
        populate:{
          path:"subtasks",
          model:"Subtask"
        }
      })

    res.status(200).json(boards);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Failed to fetch boards" });
  }
});

// Update a board
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedBoard = await Board.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedBoard) {
        return res.status(404).json({ error: "Board not found" });
      }

      res.status(200).json(updatedBoard);
    } catch (error) {
      res.status(400).json({ error: "Failed to update board" });
    }
  });


  // Delete a board
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const deletedBoard = await Board.findByIdAndDelete(id);

      if (!deletedBoard) {
        return res.status(404).json({ error: "Board not found" });
      }

      res.status(200).json({ message: "Board deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete board" });
    }
  });






module.exports = router;
