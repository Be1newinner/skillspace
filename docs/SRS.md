## SRS Table of Contents (Structure)

1. **Introduction**

   * 1.1 Purpose
   * 1.2 Scope
   * 1.3 Definitions, Acronyms, Abbreviations
   * 1.4 References
   * 1.5 Overview

2. **Overall Description**

   * 2.1 Product Perspective
   * 2.2 Product Functions
   * 2.3 User Classes and Characteristics
   * 2.4 Operating Environment
   * 2.5 Constraints
   * 2.6 Assumptions and Dependencies

3. **System Features and Requirements**

   * 3.1 Functional Requirements (Modules)
   * 3.2 Non-Functional Requirements

4. **External Interface Requirements**

   * 4.1 User Interfaces
   * 4.2 API Interfaces
   * 4.3 Database
   * 4.4 Communication Interfaces (Socket.io)

5. **Architecture & Tech Stack**

   * 5.1 Backend Architecture
   * 5.2 Database Schema Overview (Postgres + Prisma)
   * 5.3 WebSockets for Realtime Chat

6. **Security Requirements**

7. **Performance Requirements**

8. **Scalability & Future Enhancements**

9. **Appendix**

---

### SRS in Detail

# **1. Introduction**

## **1.1 Purpose**

The purpose of this Software Requirements Specification (SRS) document is to outline the technical and functional requirements for the backend system of **Skillspace**, a job posting and recruitment platform. This backend will handle the core logic, data management, authentication, real-time communication, and API layer for the application.

This document serves as a formal agreement between stakeholders—including product owners, backend developers, frontend engineers, and DevOps engineers—ensuring that all parties have a clear and common understanding of the system’s expected functionality and architecture.

## **1.2 Scope**

The backend system for Skillspace will be a feature-based **monolithic application** built using **Node.js, Express.js, Prisma ORM, and PostgreSQL**, designed to be modular and scalable, with Docker-based containerization for development and deployment. It will provide APIs for job seekers, employers, and admins, along with real-time capabilities such as notifications and chat.

Primary responsibilities of the backend include:

* **User management** (registration, authentication, authorization)
* **Job posting and search functionality**
* **Applicant tracking and application management**
* **Admin panel features for moderation and analytics**
* **Real-time chat** between job seekers and recruiters
* **Notifications and activity feeds**
* **Robust API design** for consumption by frontend clients (Next.js)

The backend will be built with **future microservice migration in mind**, using clean code, layered architecture, and strict separation of concerns.

## **1.3 Definitions, Acronyms, Abbreviations**

| Term           | Definition                                                                          |
| -------------- | ----------------------------------------------------------------------------------- |
| **API**        | Application Programming Interface                                                   |
| **CRUD**       | Create, Read, Update, Delete                                                        |
| **JWT**        | JSON Web Token                                                                      |
| **ORM**        | Object-Relational Mapping                                                           |
| **Prisma**     | Modern TypeScript ORM for Node.js and PostgreSQL                                    |
| **PostgreSQL** | Relational open-source SQL database                                                 |
| **Docker**     | Platform to develop, ship, and run applications in containers                       |
| **SSR**        | Server-Side Rendering (used by Next.js)                                             |
| **Socket.io**  | Library enabling real-time, bi-directional communication between clients and server |

## **1.4 References**

* [Prisma Documentation](https://www.prisma.io/docs)
* [Express.js Documentation](https://expressjs.com/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [Docker Docs](https://docs.docker.com/)
* [Next.js Documentation](https://nextjs.org/docs)
* [Socket.io Documentation](https://socket.io/docs/)

## **1.5 Overview**

This SRS document is organized into the following sections:

* **Section 2: Overall Description** – high-level features, user classes, assumptions, and environment.
* **Section 3: System Features and Requirements** – detailed functional and non-functional requirements.
* **Section 4: External Interface Requirements** – API contracts, DB schemas, and real-time communication details.
* **Section 5: Architecture & Tech Stack** – backend structure, database design, real-time layers, and modularity.
* **Sections 6–9** – cover security, performance, scalability, and future-proofing strategies.

---

# **2. Overall Description**

## **2.1 Product Perspective**

**Skillspace** is envisioned as a modern, scalable platform that bridges the gap between **job seekers** and **employers**, facilitating efficient job postings, applications, and communication. The backend system will serve as the **central brain** of the application—managing users, job data, communication channels, and integrations.

While this version follows a **monolithic architecture**, it will be built with **feature modularization**, making it seamless to later refactor into microservices as the platform scales.

The backend will interact with:

* A **Next.js frontend** (SSR + CSR)
* A **PostgreSQL database** via **Prisma ORM**
* **Socket.io** for real-time communication
* **External services/APIs** for email (e.g., SendGrid), cloud storage (e.g., AWS S3), and possibly payment gateways

## **2.2 Product Functions**

The key functionalities provided by the backend system include:

* **Authentication & Authorization**

  * User registration/login (email, social login)
  * Role-based access (Admin, Employer, Job Seeker)
  * JWT-based secure API access

* **User Profiles**

  * Employer and job seeker profiles
  * Profile completeness tracking
  * Resume/CV upload & management

* **Job Management**

  * Job creation, editing, and deletion
  * Job visibility control (draft, published, archived)
  * Job search and filtering with advanced queries

* **Application Tracking System (ATS)**

  * Job seekers can apply to jobs
  * Employers can manage applicants
  * Status tracking: applied, shortlisted, rejected, hired

* **Real-Time Communication**

  * WebSocket-based chat between job seeker and employer
  * Real-time notifications (new message, application status)

* **Admin Dashboard**

  * User moderation
  * Reported content handling
  * Platform analytics and metrics

## **2.3 User Classes and Characteristics**

| User Role      | Description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| **Job Seeker** | Can register, browse/search jobs, apply, chat with employers, manage applications |
| **Employer**   | Can post/edit jobs, manage applicants, view applications, chat with job seekers   |
| **Admin**      | Has full access to the system, can moderate users/content, manage analytics       |

> All users may access the platform via web frontend (Next.js) and interact with the backend via secured APIs.

## **2.4 Operating Environment**

* **Server Runtime:** Node.js (v18+)
* **API Framework:** Express.js
* **ORM:** Prisma
* **Database:** PostgreSQL (v14+)
* **Containerization:** Docker + Docker Compose
* **Deployment Environments:**

  * Local (Docker Compose)
  * Cloud (e.g., AWS ECS, Railway, or Render)
* **Real-Time Layer:** WebSocket (Socket.io)
* **Frontend:** Next.js (deployed separately)

## **2.5 Constraints**

* **Technology Stack Lock-in:** Must use Node.js, Prisma, and PostgreSQL.
* **Modular Monolith:** Architecture must allow future migration to microservices.
* **Security Compliance:** JWT, HTTPS, rate limiting, and data validation required.
* **Performance Budget:** API response times under 300ms for 90% of requests.
* **Database Hosting:** PostgreSQL must be scalable (e.g., via managed service or containerized setup).
* **Chat Reliability:** WebSocket connections must handle reconnection gracefully.

## **2.6 Assumptions and Dependencies**

* The frontend will consume the backend strictly via RESTful APIs and WebSocket endpoints.
* Users will access the system through modern web browsers.
* Admin users are provisioned manually or through a privileged UI panel.
* Email/SMS functionality may be powered by third-party services (SendGrid, Twilio).
* Cloud infrastructure (e.g., AWS, Vercel, Railway) will handle deployment and scaling.
* Prisma Migrations will be used for DB versioning and schema changes.
* Docker is assumed to be used in all environments for consistent deployments.

---

# **3. System Features and Requirements**

# **3.1 Functional Requirements (Modules)**

The backend system is organized into modular features, each encapsulating a specific domain of responsibility. These modules are structured for clear separation of concerns, reusability, and future scalability (microservices-ready).

---

## **1. Authentication & Authorization Module**

* User Registration (Email/Password, OAuth in future)
* User Login with JWT token issuance
* Password hashing (bcrypt)
* Role-based access control (Admin, Employer, Job Seeker)
* Token refresh (future enhancement)
* Password reset via email

**Endpoints:**

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/logout`
* `POST /auth/forgot-password`
* `POST /auth/reset-password`

---

## **2. User Profile Module**

* View & update personal profile
* Upload avatar or resume (using file storage)
* Track profile completeness
* Create/edit employer company profiles

**Endpoints:**

* `GET /users/me`
* `PATCH /users/me`
* `POST /users/upload-resume`
* `GET /users/:id` (public profile view)

---

## **3. Job Posting Module**

* Create, edit, archive jobs
* Tag with skills, location, type (Remote, Full-time, Internship)
* Paginated job listings with filters (search, company, tags)
* Auto-expire old job posts (cron job)

**Endpoints:**

* `POST /jobs`
* `GET /jobs`
* `GET /jobs/:id`
* `PATCH /jobs/:id`
* `DELETE /jobs/:id`

---

## **4. Application & ATS Module**

* Apply to job
* Track applications (by user)
* Shortlist/reject/hire applicants (by employer)
* Application status changes with timestamps
* Resume & cover letter handling

**Endpoints:**

* `POST /applications`
* `GET /applications/me`
* `GET /applications/:jobId`
* `PATCH /applications/:id/status`

---

## **5. Chat & Messaging Module (Socket.io)**

* Real-time chat between employers and applicants
* Message history stored in DB
* Typing indicators and online status
* Notifications on new messages

**WebSocket Events:**

* `connect`, `disconnect`
* `sendMessage`, `receiveMessage`
* `typing`, `stopTyping`

**REST Endpoints (optional fallback):**

* `GET /chats/:userId/messages`
* `POST /chats/:userId/message`

---

## **6. Notifications Module**

* In-app notifications: new application, status update, new message
* Realtime delivery via Socket.io
* Optional email notification trigger
* Read/unread status tracking

**Endpoints:**

* `GET /notifications`
* `PATCH /notifications/:id/read`

---

## **7. Admin Module**

* Manage users (ban/unban)
* Remove or moderate job listings
* View reports/flagged content
* Platform-level analytics

**Endpoints:**

* `GET /admin/users`
* `PATCH /admin/users/:id/status`
* `GET /admin/jobs`
* `PATCH /admin/jobs/:id/status`

---

## **8. Search & Recommendation Module**

* Full-text search on job listings
* Filters by tags, location, job type
* Personalized job suggestions (future ML module)

**Endpoints:**

* `GET /search?query=...`
* `GET /recommendations`

---

## **9. Test & Health Check Module**

* Health check for readiness/liveness
* Versioning info

**Endpoints:**

* `GET /health`
* `GET /version`

---

 Each module will have:

* **Validation Layer** (e.g., Zod or custom middleware)
* **Service Layer** (business logic)
* **Controller Layer** (Express route handlers)
* **Prisma Data Layer** (DB access)

---

# **3.2 Non-Functional Requirements**

The non-functional requirements define the **quality attributes** that the system must exhibit to meet performance, scalability, usability, security, and maintainability expectations for a production-grade system.

---

## **1. Performance Requirements**

* **API Response Time:** 90% of backend API requests must respond within **300ms** under standard load.
* **WebSocket Latency:** Real-time events should have a round-trip latency of **<100ms** in most geographic regions.
* **Job Search Scalability:** Must support paginated and filtered queries over 100,000+ job records with <500ms response time.

---

## **2. Scalability**

* The system must support **horizontal scaling** via Docker containers behind a load balancer.
* The architecture must enable **easy extraction of microservices**, e.g., for chat, search, notifications.
* Database read replicas can be introduced for read-heavy operations (e.g., job listings, search).

---

## **3. Security**

* Use **HTTPS** for all client-server communication.
* **JWT** tokens for stateless authentication.
* **Rate limiting** and brute-force protection on login endpoints.
* **Input sanitization** and validation to prevent injection attacks.
* **RBAC (Role-Based Access Control)** for route protection.
* Secure file uploads with type & size restrictions.
* All sensitive configuration via **environment variables (.env)**

---

## **4. Maintainability**

* Codebase will follow a **feature-based modular structure**.
* Each feature will include controller, service, validation, and routes.
* **Clear separation of concerns** between layers (API, services, DB).
* Code documentation via **JSDoc** or inline comments where necessary.
* **Linting & Prettier** enforced with CI.

---

## **5. Testability**

* Each module will have **unit tests (Jest)** and **integration tests** using **Supertest**.
* Endpoints will be testable independently via **Postman collections** or Swagger (OpenAPI).
* Target **80%+ code coverage** in CI/CD.

---

## **6. Observability**

* Logging with **winston** or **pino**
* **Request/response logging** (with masking of sensitive data)
* Health check endpoints (`/health`, `/ready`)
* Metrics collection (Prometheus or similar, future-ready)
* Error tracking via **Sentry** or custom middleware

---

## **7. Configurability**

* Environment-based configuration via `.env`, `dotenv`
* Secrets must not be hardcoded — injected via CI/CD secrets or environment variables
* Support for `development`, `staging`, and `production` environments

---

## **8. Portability**

* Entire backend should be containerized with **Docker**, using:

  * **Dockerfile** for app container
  * **docker-compose** for local dev (Postgres, backend, optional Redis)

---

## **9. Developer Experience**

* Fast local dev startup with Docker Compose
* Hot reloading using `nodemon` or `ts-node-dev`
* Clean folder structure: `/modules`, `/lib`, `/middlewares`, `/services`, `/routes`
* OpenAPI (Swagger) docs generated from route schema
* Prisma Studio for DB inspection in dev mode

---

## **10. Deployment Requirements**

* CI/CD pipelines (e.g., GitHub Actions) for:

  * Linting
  * Running tests
  * Building Docker images
  * Deploying to cloud environments (Railway, ECS, etc.)
* Zero-downtime deployment using rolling updates or blue-green strategy

---