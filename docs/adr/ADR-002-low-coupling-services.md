# ADR-002: Reducing Coupling via Service Interfaces and Adding Business Validations

* **Status:** Accepted
* **Date:** October 12, 2026
* **Decision Type:** Structure and Behavior
* **Quality Characteristics Improved:** Low Coupling, Reusability, Maintainability

## Context and Problem
In the original `server.js`, the enrollment (`matriculas`) and report (`reporte`) endpoints directly search the internal `estudiantes` and `cursos` arrays, creating **high coupling**. Additionally, course capacity (`cupos`) is never checked or decreased when enrolling a student, and the student/course search features mentioned in the `README.md` are missing.

## Considered Options
1. **Direct access to other modules' data models:** Faster to write initially, but keeps high coupling between modules.
2. **Inter-module communication through Services (`service.js`):** Make `matricula.service.js` and `reporte.service.js` call public methods from `estudiante.service.js` and `curso.service.js`, encapsulating seat capacity validation and search functions inside the services.

## Decision
We chose **Option 2: Inter-module communication through Services**, centralizing business rules (checking and decreasing available course seats upon enrollment) and reusable search functions inside the service layer, as well as a reusable HTTP helper (`postJSON`) in the frontend.

## Justification
Communicating through service methods achieves **low coupling** because the enrollment module does not need to know how students or courses are stored internally. It also improves **reusability** by avoiding duplicated `.find()` and `fetch()` logic across the code.

## Consequences
* **Positive:** Lower coupling between modules, reusable search and API functions, and proper validation of available course seats (`cupos`).
* **Negative:** Modules must call service interfaces instead of accessing data structures directly.
