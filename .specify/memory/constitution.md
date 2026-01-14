<!-- SYNC IMPACT REPORT
Version change: N/A -> 1.0.0
Modified principles: N/A
Added sections: All principles and sections for the Next.js 14 Todo app frontend project
Removed sections: N/A
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Evolution of Todo Frontend Constitution

## Core Principles

### I. VERSION CONTROL (NON-NEGOTIABLE)
Next.js 14.2.5 with App Router must be used exclusively. React 18.2.0 is the required React version. No other versions are acceptable.
<!-- Rationale: Ensures stability and compatibility with backend API -->

### II. SCOPE LIMITATION
Development is restricted to frontend implementation only. No backend or database setup shall be performed as part of this project.
<!-- Rationale: Maintains clear separation of concerns between frontend and backend teams -->

### III. STABILITY-FIRST APPROACH (NON-NEGOTIABLE)
Zero Turbo/compilation errors are mandatory. Working code takes priority over cutting-edge features.
<!-- Rationale: Ensures reliable user experience and maintainable codebase -->

### IV. TECHNOLOGY STACK COMPLIANCE
TypeScript, Tailwind CSS, and Functional Components are required technologies. Class components are prohibited.
<!-- Rationale: Ensures type safety, consistent styling, and modern React patterns -->

### V. PROJECT STRUCTURE STANDARDS
Maintain clean folder structure with `app/`, `components/`, `lib/` directories. Proper error handling and loading states must be implemented.
<!-- Rationale: Ensures maintainability and follows Next.js best practices -->

### VI. AUTHENTICATION INTEGRATION
Better Auth must be integrated on the frontend side only, connecting securely to the backend API endpoints.
<!-- Rationale: Provides secure authentication while maintaining separation of frontend and backend responsibilities -->

## API Integration Requirements
The frontend must connect to the existing backend API with these endpoints:
- GET/POST `/api/{user_id}/tasks`
- GET/PUT/DELETE `/api/{user_id}/tasks/{id}`
- PATCH `/api/{user_id}/tasks/{id}/complete`
<!-- Rationale: Defines clear contract between frontend and backend -->

## Development Workflow
All code must follow Next.js 14 best practices with App Router. Component-based architecture with reusable UI elements is required. Strict TypeScript typing must be maintained throughout the project.
<!-- Rationale: Ensures maintainable, scalable, and robust frontend application -->

## Governance
This constitution supersedes all other development practices for the Evolution of Todo frontend project. All pull requests and code reviews must verify compliance with these principles. Any deviation requires explicit approval from the frontend architect.

**Version**: 1.0.0 | **Ratified**: 2026-01-12 | **Last Amended**: 2026-01-12
