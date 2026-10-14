const { DatabaseSync } = require("node:sqlite");
const path = require("path");

// ADR-003: Relational Persistence with SQLite Database
const dbPath = process.env.DB_PATH || path.join(__dirname, "academic.db");
const db = new DatabaseSync(dbPath);

// Initialize relational tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    major TEXT NOT NULL,
    semester INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    teacher TEXT NOT NULL,
    capacity INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );
`);

// Insert initial seed data if the database is empty
const totalStudents = db.prepare("SELECT COUNT(*) AS count FROM students").get().count;

if (totalStudents === 0) {
  const insertStudent = db.prepare(
    "INSERT INTO students (name, major, semester) VALUES (?, ?, ?)"
  );
  insertStudent.run("Ana Torres", "Software Engineering", 8);
  insertStudent.run("Luis Pérez", "Software Engineering", 8);
  insertStudent.run("María Gómez", "Information Technology", 6);

  const insertCourse = db.prepare(
    "INSERT INTO courses (name, teacher, capacity) VALUES (?, ?, ?)"
  );
  insertCourse.run("Software Architecture", "Eng. Carlos Ruiz", 28);
  insertCourse.run("Database Systems", "Eng. Laura Vera", 24);
  insertCourse.run("Web Development", "Eng. Pedro León", 35);

  const insertEnrollment = db.prepare(
    "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)"
  );
  insertEnrollment.run(1, 1);
  insertEnrollment.run(2, 1);
  insertEnrollment.run(1, 2);
}

module.exports = db;
