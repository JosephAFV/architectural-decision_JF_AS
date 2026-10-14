const express = require("express");
const router = express.Router();
const studentService = require("./student.service");

// Presentation / Controller Layer - Students Module
router.get("/", (req, res) => {
  const { search } = req.query;
  const students = studentService.listStudents(search);
  res.json(students);
});

router.post("/", (req, res) => {
  try {
    const newStudent = studentService.registerStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
