const db = require("../database/db");

// Data Access Layer (Model) - Enrollments Module
function getAll() {
  return db.prepare("SELECT * FROM enrollments ORDER BY id ASC").all();
}

function getByStudentId(studentId) {
  return db
    .prepare("SELECT * FROM enrollments WHERE student_id = ?")
    .all(Number(studentId));
}

function exists(studentId, courseId) {
  const row = db
    .prepare(
      "SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?"
    )
    .get(Number(studentId), Number(courseId));
  return Boolean(row);
}

function create(studentId, courseId) {
  const result = db
    .prepare("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)")
    .run(Number(studentId), Number(courseId));

  return {
    id: result.lastInsertRowid,
    student_id: Number(studentId),
    course_id: Number(courseId)
  };
}

module.exports = {
  getAll,
  getByStudentId,
  exists,
  create
};
