# 05. Example Backend

## 1. Domain

- **Action:** Create the `User` entity and related events.
- **Details:**
  - `User` entity with a method that listens for `UserCreationRequested`.
  - `UserCreationRequested` event.
  - `UserCreated` event.

## 2. Infrastructure

- **Action:** Create the `PostgresUserRepository` and `UserCli`.
- **Details:**
  - `PostgresUserRepository` will implement `UserRepository` and be decorated with `@AdapterFor(UserRepository)`.
  - `UserCli` will implement `PrimaryPort`.

## 3. Application

- **Action:** Create the `MyBackendApplication`.
- **Details:**
  - It will extend `Application`.
  - It will use `@Enable` to activate the repository and CLI.
  - It will provide the required `metadata`.

## 4. Entry Point

- **Action:** Create the `main.ts` file.
- **Details:**
  - It will instantiate and start `MyBackendApplication`.
