# ADR-004: Application Containerization with Docker

* **Status:** Accepted
* **Date:** October 12, 2026
* **Decision Type:** Deployment
* **Quality Characteristics Improved:** Scalability, Portability, Availability

## Context and Problem
The original application uses a hardcoded port (`const PORT = 3000`) and relies on running manually on the host machine. This makes it harder to deploy consistently across different computers or scale using containers.

## Considered Options
1. **Traditional manual execution (`node server.js`):** Easy on a single local machine, but harder to replicate and scale in other environments.
2. **Docker Containerization (`Dockerfile` and `docker-compose.yml`):** Package the application into a Docker container with environment variables (`PORT`) and persistent volume support.
3. **Cloud Kubernetes Cluster:** Too complex for the current scope of this academic system.

## Decision
We chose **Option 2: Docker Containerization** using `Dockerfile` and `docker-compose.yml`.

## Justification
Docker packages the Node.js application and its dependencies into a portable container that runs identically on any machine, simplifying deployment and enabling container-based scalability.

## Consequences
* **Positive:** Easy deployment with a single command (`docker compose up`), consistent environment, and support for scaling containers.
* **Negative:** Requires Docker to run in container mode (while still working normally with `npm start`).
