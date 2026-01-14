---

description: "Task list for Todo App Frontend implementation"
---

# Tasks: Todo App Frontend

**Input**: Design documents from `/specs/1-todo-frontend/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create Next.js 14.2.5 project with TypeScript and Tailwind CSS
- [X] T002 [P] Initialize package.json with required dependencies (Next.js 14.2.5, React 18.2.0, Better Auth, Tailwind CSS)
- [X] T003 [P] Configure tsconfig.json for Next.js 14.2.5
- [X] T004 [P] Configure tailwind.config.js and globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T005 [P] Set up Better Auth configuration in lib/auth.ts
- [X] T006 [P] Create API service layer in lib/api.ts with GET/POST/PUT/DELETE/PATCH functions
- [X] T007 [P] Create types/index.ts with User and Task TypeScript interfaces
- [X] T008 [P] Set up environment variables for API base URL
- [X] T009 [P] Create protected layout wrapper for authenticated routes
- [X] T010 [P] Implement error handling and loading state utilities

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to register for an account or log into the application to access their personal task list

**Independent Test**: Can be fully tested by navigating to login/signup pages and completing the authentication flow, delivering the ability for users to access the application

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

- [ ] T011 [P] [US1] Unit test for auth utilities in lib/auth.ts
- [ ] T012 [P] [US1] Component test for login page functionality

### Implementation for User Story 1

- [X] T013 [P] [US1] Create Header component with auth status in components/Header.tsx
- [X] T014 [US1] Create login page at app/login/page.tsx
- [X] T015 [US1] Create signup page at app/signup/page.tsx
- [X] T016 [US1] Implement login functionality with Better Auth
- [X] T017 [US1] Implement signup functionality with Better Auth
- [X] T018 [US1] Redirect unauthenticated users to login when accessing protected routes
- [X] T019 [US1] Add logout functionality

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management Dashboard (Priority: P2)

**Goal**: Allow authenticated users to view their task list on the dashboard, create new tasks, and see the status of existing tasks

**Independent Test**: Can be fully tested by allowing a logged-in user to view their task list, create new tasks, and see task statuses, delivering the primary value of the application

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] Unit test for API service functions in lib/api.ts
- [ ] T021 [P] [US2] Component test for TaskList functionality

### Implementation for User Story 2

- [X] T022 [P] [US2] Create TaskItem component in components/TaskItem.tsx
- [X] T023 [P] [US2] Create TaskList component in components/TaskList.tsx
- [X] T024 [P] [US2] Create TaskForm component in components/TaskForm.tsx
- [X] T025 [US2] Create dashboard page at app/page.tsx with TaskList and TaskForm
- [X] T026 [US2] Implement fetching user's tasks from API in dashboard
- [X] T027 [US2] Implement creating new tasks via API in TaskForm
- [X] T028 [US2] Implement toggling task completion status with PATCH request
- [X] T029 [US2] Add loading and error states to dashboard

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Detail and Editing (Priority: P3)

**Goal**: Allow authenticated users to view detailed information about a specific task and edit its properties

**Independent Test**: Can be fully tested by allowing a logged-in user to navigate to a task detail page and edit task properties, delivering enhanced task management capabilities

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T030 [P] [US3] Component test for task detail page functionality
- [ ] T031 [P] [US3] Component test for task editing functionality

### Implementation for User Story 3

- [X] T032 [P] [US3] Create task detail/edit page at app/tasks/[id]/page.tsx
- [X] T033 [US3] Implement fetching specific task from API in task detail page
- [X] T034 [US3] Implement updating task properties via API in task detail page
- [X] T035 [US3] Implement deleting tasks via API in task detail page
- [X] T036 [US3] Add navigation from dashboard to task detail page
- [X] T037 [US3] Add optimistic updates for better UX when modifying tasks

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T038 [P] Add global error handling and notifications
- [X] T039 [P] Add loading skeletons for better perceived performance
- [X] T040 [P] Add form validation to all input forms
- [X] T041 [P] Add accessibility improvements to all components
- [X] T042 [P] Add responsive design improvements
- [X] T043 [P] Add proper meta tags and SEO improvements
- [X] T044 [P] Run quickstart.md validation
- [X] T045 [P] Final testing and bug fixes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 (auth)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 (auth) and US2 (task list)

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Unit test for auth utilities in lib/auth.ts"
Task: "Component test for login page functionality"

# Launch all components for User Story 1 together:
Task: "Create Header component with auth status in components/Header.tsx"
Task: "Create login page at app/login/page.tsx"
Task: "Create signup page at app/signup/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2 (after US1 auth is implemented)
   - Developer C: User Story 3 (after US1 auth and US2 task list are implemented)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence