const studentService = require("../students/student.service");
const courseService = require("../courses/course.service");
const enrollmentService = require("../enrollments/enrollment.service");

// ADR-002: Low Coupling - Report service queries other module services via public interfaces
function generateAcademicReport() {
  const students = studentService.listStudents();

  return students.map(student => {
    const studentEnrollments = enrollmentService.listEnrollmentsByStudent(
      student.id
    );

    const studentCourses = studentEnrollments.map(e => {
      const course = courseService.findCourse(e.course_id);
      return course ? course.name : "No course";
    });

    return {
      student: student.name,
      major: student.major,
      courses: studentCourses
    };
  });
}

module.exports = {
  generateAcademicReport
};
