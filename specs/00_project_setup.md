# 00. Project Setup

## 1. Monorepo

- **Action:** Initialize a pnpm monorepo.
- **Details:**
  - Create a `pnpm-workspace.yaml` file.
  - Create a root `package.json`.
  - Create the directory structure: `apps/`, `packages/`, `docs/`.

## 2. TypeScript Configuration

- **Action:** Create a root `tsconfig.json`.
- **Details:**
  - Use the settings specified in `GEMINI.md`.
  - Ensure `experimentalDecorators` and `emitDecoratorMetadata` are `true`.

## 3. Tooling

- **Action:** Set up ESLint, Prettier, Husky, and lint-staged.
- **Details:**
  - Configure ESLint with recommended rules for TypeScript.
  - Configure Prettier for consistent code formatting.
  - Set up Husky pre-commit hooks to run ESLint and Prettier.
