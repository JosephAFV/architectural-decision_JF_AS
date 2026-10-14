const express = require("express");
const router = express.Router();
const enrollmentService = require("./enrollment.service");

// Presentation / Controller Layer - Enrollments Module
router.get("/", (req, res) => {
  const enrollments = enrollmentService.listEnrollments();
  res.json(enrollments);
});

router.post("/", (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    enrollmentService.enrollStudent(studentId, courseId);

    res.status(201).json({
      message: "Enrollment successfully registered."
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
