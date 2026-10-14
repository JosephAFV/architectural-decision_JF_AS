const express = require("express");
const router = express.Router();
const reportService = require("./report.service");

// Presentation / Controller Layer - Reports Module
router.get("/", (req, res) => {
  const report = reportService.generateAcademicReport();
  res.json(report);
});

module.exports = router;
