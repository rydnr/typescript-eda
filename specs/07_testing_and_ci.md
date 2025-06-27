# 07. Testing and CI

## 1. TDD/Git Workflow

- **Action:** Document and enforce the TDD/Git workflow.
- **Details:**
  - All commits must follow the "failing test, passing test, refactor" cycle.
  - Use the specified Gitmoji commit message format.

## 2. CI Setup

- **Action:** Create a GitHub Actions workflow.
- **Details:**
  - The workflow should run on every push and pull request.
  - It should install dependencies, build the code, and run all tests.
