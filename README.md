# Academic Management System (Architectural Redesign with ADRs)

Enhanced application developed for the **Software Architecture** course, addressing architectural smells and quality attributes: **modularity, high cohesion, low coupling, maintainability, reusability, and scalability**.

---

## 1. Project Structure (Domain-Modular Layered Architecture)

```text
sistema-academico/
├── database/
│   └── db.js                        # SQLite database connection and initial schema (ADR-003)
├── students/
│   ├── student.controller.js        # Presentation / HTTP Routes Layer (ADR-001)
│   ├── student.service.js           # Business Logic Layer (ADR-001, ADR-002)
│   └── student.model.js             # Relational Data Access Layer (ADR-001, ADR-003)
├── courses/
│   ├── course.controller.js
│   ├── course.service.js
│   └── course.model.js
├── enrollments/
│   ├── enrollment.controller.js
│   ├── enrollment.service.js        # Low coupling via service interfaces (ADR-002)
│   └── enrollment.model.js
├── reports/
│   ├── report.controller.js
│   └── report.service.js
├── public/
│   ├── index.html                   # User interface with search and capacity indicators
│   ├── styles.css
│   └── app.js                       # Reusable getJSON() and postJSON() helpers
├── docs/
│   └── adr/                         # Architecture Decision Records (ADR-001 to ADR-004)
├── Dockerfile                       # Container definition (ADR-004)
├── docker-compose.yml               # Multi-container orchestration & volumes (ADR-004)
├── package.json
└── server.js                        # Express server entry point
```

---

## 2. Architecture Decision Records (ADRs)

- **[ADR-001](docs/adr/ADR-001-layered-architecture.md):** Restructuring the Monolith into a Modular Layered Architecture (`controller`, `service`, `model`).
- **[ADR-002](docs/adr/ADR-002-low-coupling-services.md):** Low coupling via service interfaces (`student.service.js`, `course.service.js`), seat capacity management upon enrollment, and search filters.
- **[ADR-003](docs/adr/ADR-003-sqlite-relational-database.md):** Replacing volatile in-memory arrays with a persistent **SQLite Relational Database** (`database/academic.db`).
- **[ADR-004](docs/adr/ADR-004-docker-containerization.md):** Application Containerization with **Docker** and **Docker Compose**.

---

## 3. How to Run

### Option A: Local Execution with Node.js
```bash
npm install
npm start
```
Access the application in your browser: `http://localhost:3000`

### Option B: Execution with Docker
```bash
docker compose up --build
```
Access the application in your browser: `http://localhost:3000`
