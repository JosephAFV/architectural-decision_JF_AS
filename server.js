const express = require("express");
const path = require("path");

// Modular Controller Imports (ADR-001)
const studentController = require("./students/student.controller");
const courseController = require("./courses/course.controller");
const enrollmentController = require("./enrollments/enrollment.controller");
const reportController = require("./reports/report.controller");

const app = express();
// ADR-004: Configurable port via environment variable for Docker
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Modular API Route Mounts
app.use("/api/students", studentController);
app.use("/api/courses", courseController);
app.use("/api/enrollments", enrollmentController);
app.use("/api/reports", reportController);

app.listen(PORT, () => {
  console.log(`Academic System running at http://localhost:${PORT}`);
});
