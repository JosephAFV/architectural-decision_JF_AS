# ADR-001: Restructuring the Monolith into a Modular Layered Architecture

* **Status:** Accepted
* **Date:** October 12, 2026
* **Decision Type:** Structure
* **Quality Characteristics Improved:** Modularity, Cohesion, Maintainability

## Context and Problem
Currently, the entire backend application is written inside a single monolithic file (`server.js`). This file mixes server setup, in-memory data arrays, API routes, and business validations. Having all responsibilities mixed in one file results in low modularity, low cohesion, and poor maintainability when adding or modifying features.

## Considered Options
1. **Keep a single monolithic file (`server.js`):** Simple at the beginning, but becomes messy and hard to maintain as the system grows.
2. **Modular Layered Architecture (`controller`, `service`, `model`):** Divide the system into domain folders (`estudiantes`, `cursos`, `matriculas`, `reportes`), separating each module into three layers: Controller (HTTP requests/responses), Service (business logic), and Model (data access).
3. **Microservices Architecture:** Split each module into an independent server. This is too complex and unnecessary for a small university enrollment app.

## Decision
We chose **Option 2: Modular Layered Architecture**, organizing the backend into domain folders (`estudiantes/`, `cursos/`, `matriculas/`, `reportes/`) with `.controller.js`, `.service.js`, and `.model.js` files.

## Justification
This structure gives each file a single, clear responsibility (high cohesion) and divides the system into manageable modules (modularity). It makes future changes much easier to implement without breaking other parts of the application.

## Consequences
* **Positive:** Cleaner code organization, higher cohesion, and much better maintainability.
* **Negative:** Increases the number of folders and files in the project.
