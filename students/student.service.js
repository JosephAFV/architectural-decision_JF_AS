const studentModel = require("./student.model");

// Business Logic Layer (Service) - Students Module
function listStudents(search) {
  if (search && search.trim() !== "") {
    return studentModel.searchByText(search.trim());
  }
  return studentModel.getAll();
}

function findStudent(id) {
  return studentModel.getById(id);
}

function registerStudent(data) {
  const { name, major, semester } = data;

  if (!name || !major || !semester) {
    throw new Error("All student fields are required.");
  }

  return studentModel.create({
    name: name.trim(),
    major: major.trim(),
    semester: Number(semester)
  });
}

module.exports = {
  listStudents,
  findStudent,
  registerStudent
};
