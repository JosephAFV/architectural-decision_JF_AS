const express = require("express");
const router = express.Router();
const courseService = require("./course.service");

// Presentation / Controller Layer - Courses Module
router.get("/", (req, res) => {
  const { search } = req.query;
  const courses = courseService.listCourses(search);
  res.json(courses);
});

router.post("/", (req, res) => {
  try {
    const newCourse = courseService.registerCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
