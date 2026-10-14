const courseModel = require("./course.model");

// Business Logic Layer (Service) - Courses Module
function listCourses(search) {
  if (search && search.trim() !== "") {
    return courseModel.searchByText(search.trim());
  }
  return courseModel.getAll();
}

function findCourse(id) {
  return courseModel.getById(id);
}

function registerCourse(data) {
  const { name, teacher, capacity } = data;

  if (!name || !teacher || !capacity || Number(capacity) <= 0) {
    throw new Error("Invalid course data. Please verify name, teacher, and capacity.");
  }

  return courseModel.create({
    name: name.trim(),
    teacher: teacher.trim(),
    capacity: Number(capacity)
  });
}

function deductCapacity(id) {
  return courseModel.decreaseCapacity(id);
}

module.exports = {
  listCourses,
  findCourse,
  registerCourse,
  deductCapacity
};
