const db = require("../database/db");

// Data Access Layer (Model) - Students Module
function getAll() {
  return db.prepare("SELECT * FROM students ORDER BY id ASC").all();
}

function getById(id) {
  return db.prepare("SELECT * FROM students WHERE id = ?").get(Number(id));
}

function searchByText(term) {
  const filter = `%${term}%`;
  return db
    .prepare(
      "SELECT * FROM students WHERE name LIKE ? OR major LIKE ? ORDER BY id ASC"
    )
    .all(filter, filter);
}

function create({ name, major, semester }) {
  const result = db
    .prepare("INSERT INTO students (name, major, semester) VALUES (?, ?, ?)")
    .run(name, major, Number(semester));

  return getById(result.lastInsertRowid);
}

module.exports = {
  getAll,
  getById,
  searchByText,
  create
};
