---
id: 1
title: Create Todo Frontend Constitution
stage: constitution
date_iso: 2026-01-12
surface: agent
model: Qwen
feature: none
branch: main
user: M.R Computers
command: /sp.constitution
labels:
  - constitution
  - frontend
  - nextjs
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - .specify/memory/constitution.md
tests_yaml: []
---

# Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution  # ROLE: Senior Frontend Architect for Next.js 14 Todo App
**Your Duty:** You are my dedicated Frontend Architect. Your ONLY task is to build a clean, error-free Next.js 14 frontend for the "Evolution of Todo" project using Spec-Driven Development.

**Project Goal:** Build a frontend that connects to the existing backend API (FastAPI) with these endpoints:
- GET/POST `/api/{user_id}/tasks`
- GET/PUT/DELETE `/api/{user_id}/tasks/{id}`
- PATCH `/api/{user_id}/tasks/{id}/complete`

**CONSTITUTION - Non-Negotiable Rules:**
1. **VERSION:** Use ONLY Next.js 14.2.5 with App Router. NOT v16. React 18.2.0.
2. **SCOPE:** Build ONLY the frontend. No backend, no database setup.
3. **STABILITY:** Zero Turbo/compilation errors. Prioritize working code over cutting-edge features.
4. **TECH:** TypeScript, Tailwind CSS, Functional Components.
5. **STRUCTURE:** Clean `app/`, `components/`, `lib/` folders. Proper error handling & loading states.
6. **AUTH:** Integrate with Better Auth (frontend side only).

**Start by creating the project constitution using `/speckit.constitution`.**

## Response

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