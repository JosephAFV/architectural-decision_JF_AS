# ADR-003: Replacing In-Memory Arrays with a Relational Database (SQLite)

* **Status:** Accepted
* **Date:** October 12, 2026
* **Decision Type:** Data
* **Quality Characteristics Improved:** Scalability, Reliability

## Context and Problem
The original system stores students, courses, and enrollments in temporary JavaScript arrays in RAM (`server.js`). Whenever the server restarts, all newly registered data is lost. Moreover, keeping state in server memory prevents horizontal scalability.

## Considered Options
1. **In-memory arrays (Current):** Requires no setup, but loses all data on restart and blocks scalability.
2. **SQLite Relational Database:** Stores data persistently in relational SQL tables (`estudiantes`, `cursos`, `matriculas`) inside a lightweight database file without requiring external database servers.
3. **NoSQL Database (MongoDB):** Good for unstructured data, but enrollment data has clear relational links between students and courses that fit a relational database better.

## Decision
We chose **Option 2: SQLite Relational Database**, accessed exclusively through the Model layer (`model.js`).

## Justification
A relational database preserves data across server restarts, enforces relationships between students, courses, and enrollments, and removes in-memory state from `server.js`, which improves reliability and prepares the backend for scalability.

## Consequences
* **Positive:** Data is persisted permanently; automatic table creation and seed data on startup; stateless backend logic.
* **Negative:** Requires managing SQL queries and database file initialization in `database/db.js`.
