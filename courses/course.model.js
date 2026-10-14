const db = require("../database/db");

// Data Access Layer (Model) - Courses Module
function getAll() {
  return db.prepare("SELECT * FROM courses ORDER BY id ASC").all();
}

function getById(id) {
  return db.prepare("SELECT * FROM courses WHERE id = ?").get(Number(id));
}

function searchByText(term) {
  const filter = `%${term}%`;
  return db
    .prepare(
      "SELECT * FROM courses WHERE name LIKE ? OR teacher LIKE ? ORDER BY id ASC"
    )
    .all(filter, filter);
}

function create({ name, teacher, capacity }) {
  const result = db
    .prepare("INSERT INTO courses (name, teacher, capacity) VALUES (?, ?, ?)")
    .run(name, teacher, Number(capacity));

  return getById(result.lastInsertRowid);
}

function decreaseCapacity(id) {
  db.prepare(
    "UPDATE courses SET capacity = capacity - 1 WHERE id = ? AND capacity > 0"
  ).run(Number(id));
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  searchByText,
  create,
  decreaseCapacity
};
