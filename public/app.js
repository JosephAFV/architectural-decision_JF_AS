// =====================================
// REUSABLE API HELPERS (ADR-002)
// =====================================

async function getJSON(url) {
  const response = await fetch(url);
  return response.json();
}

async function postJSON(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return response.json();
}

// =====================================
// TABLE RENDERING
// =====================================

function renderStudents(students) {
  document.querySelector("#tableStudents").innerHTML = students
    .map(
      s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.major}</td>
        <td>${s.semester}</td>
      </tr>
      `
    )
    .join("");
}

function renderCourses(courses) {
  document.querySelector("#tableCourses").innerHTML = courses
    .map(
      c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.teacher}</td>
        <td>${c.capacity}</td>
      </tr>
      `
    )
    .join("");
}

// =====================================
// LOAD ALL DATA
// =====================================

async function loadAllData() {
  const students = await getJSON("/api/students");
  const courses = await getJSON("/api/courses");
  const enrollments = await getJSON("/api/enrollments");

  renderStudents(students);
  renderCourses(courses);

  // ENROLLMENTS TABLE
  document.querySelector("#tableEnrollments").innerHTML = enrollments
    .map(
      e => `
      <tr>
        <td>${e.id}</td>
        <td>${e.student}</td>
        <td>${e.course}</td>
      </tr>
      `
    )
    .join("");

  // STUDENT SELECT DROPDOWN
  document.querySelector("#selectStudent").innerHTML = students
    .map(
      s => `
      <option value="${s.id}">
        ${s.name}
      </option>
      `
    )
    .join("");

  // COURSE SELECT DROPDOWN (shows available capacity)
  document.querySelector("#selectCourse").innerHTML = courses
    .map(
      c => `
      <option value="${c.id}">
        ${c.name} (${c.capacity} seats left)
      </option>
      `
    )
    .join("");
}

// =====================================
// ADD STUDENT
// =====================================

document
  .querySelector("#formStudent")
  .addEventListener("submit", async event => {
    event.preventDefault();

    await postJSON("/api/students", {
      name: document.querySelector("#studentName").value,
      major: document.querySelector("#studentMajor").value,
      semester: document.querySelector("#studentSemester").value
    });

    event.target.reset();
    loadAllData();
  });

// =====================================
// SEARCH STUDENT
// =====================================

document
  .querySelector("#btnSearchStudent")
  .addEventListener("click", async () => {
    const term = document.querySelector("#searchStudentInput").value;
    const students = await getJSON(
      `/api/students?search=${encodeURIComponent(term)}`
    );
    renderStudents(students);
  });

// =====================================
// ADD COURSE
// =====================================

document
  .querySelector("#formCourse")
  .addEventListener("submit", async event => {
    event.preventDefault();

    await postJSON("/api/courses", {
      name: document.querySelector("#courseName").value,
      teacher: document.querySelector("#courseTeacher").value,
      capacity: document.querySelector("#courseCapacity").value
    });

    event.target.reset();
    loadAllData();
  });

// =====================================
// SEARCH COURSE
// =====================================

document
  .querySelector("#btnSearchCourse")
  .addEventListener("click", async () => {
    const term = document.querySelector("#searchCourseInput").value;
    const courses = await getJSON(
      `/api/courses?search=${encodeURIComponent(term)}`
    );
    renderCourses(courses);
  });

// =====================================
// ENROLL STUDENT
// =====================================

document
  .querySelector("#formEnrollment")
  .addEventListener("submit", async event => {
    event.preventDefault();

    const data = await postJSON("/api/enrollments", {
      studentId: document.querySelector("#selectStudent").value,
      courseId: document.querySelector("#selectCourse").value
    });

    document.querySelector("#enrollmentMessage").textContent =
      data.message || data.error;

    loadAllData();
  });

// =====================================
// GENERATE REPORT
// =====================================

document
  .querySelector("#btnGenerateReport")
  .addEventListener("click", async () => {
    const report = await getJSON("/api/reports");

    document.querySelector("#reportContainer").innerHTML = report
      .map(
        r => `
        <div class="reporte-item">
          <strong>${r.student}</strong> — ${r.major}
          <br>
          Enrolled Courses: ${r.courses.length ? r.courses.join(", ") : "None"}
        </div>
        `
      )
      .join("");
  });

// =====================================
// INITIALIZE
// =====================================

loadAllData();
