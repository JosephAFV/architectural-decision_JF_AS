const enrollmentModel = require("./enrollment.model");
const studentService = require("../students/student.service");
const courseService = require("../courses/course.service");

// ADR-002: Low Coupling - Inter-module communication through public service interfaces
function listEnrollments() {
  const enrollments = enrollmentModel.getAll();

  return enrollments.map(e => {
    const student = studentService.findStudent(e.student_id);
    const course = courseService.findCourse(e.course_id);

    return {
      id: e.id,
      student: student ? student.name : "Unknown",
      course: course ? course.name : "Unknown"
    };
  });
}

function listEnrollmentsByStudent(studentId) {
  return enrollmentModel.getByStudentId(studentId);
}

function enrollStudent(studentId, courseId) {
  // Use public service methods (well-defined interface)
  const student = studentService.findStudent(studentId);
  const course = courseService.findCourse(courseId);

  if (!student || !course) {
    throw new Error("Student or course not found.");
  }

  if (enrollmentModel.exists(student.id, course.id)) {
    throw new Error("Student is already enrolled in this course.");
  }

  if (course.capacity <= 0) {
    throw new Error("No available seats left in this course.");
  }

  // Register enrollment and deduct 1 seat from the course
  const newEnrollment = enrollmentModel.create(student.id, course.id);
  courseService.deductCapacity(course.id);

  return newEnrollment;
}

module.exports = {
  listEnrollments,
  listEnrollmentsByStudent,
  enrollStudent
};
