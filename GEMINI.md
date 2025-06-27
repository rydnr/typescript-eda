# GEMINI.md: Guiding Principles for `typescript-eda`

This document outlines the architectural philosophy, project structure, and development workflow for the `typescript-eda` framework. Its purpose is to ensure that all contributions and resulting applications adhere to a consistent, high-quality standard based on a pure interpretation of Domain-Driven Design (DDD), Event-Driven Architecture (EDA), and Hexagonal Architecture.

## 1. Core Philosophy

1.  **A Rich, Behavioral Domain:** The domain is the absolute center of the universe. It contains all business logic and rules. All business operations are methods on the domain objects (`Entities`, `ValueObjects`) themselves. These methods are triggered by listening for events.
2.  **A Declarative Application:** A user's application is a single class that **extends `typescript-eda/application.Application`**. It uses decorators like `@Enable` to declare which infrastructure adapters are active and provides a simple `metadata` map. It contains **no imperative logic**. The framework reads this declarative configuration and runs the system.
3.  **Events as the Universal Driver:** Everything that happens is represented by an event. A request to do something is an event (e.g., `UserCreationRequested`). The result of that action is also an event (e.g., `UserCreated`). The framework's engine processes chains of these events, and domain objects `@listen` for them to execute logic.

## 2. Project Structure: A Monorepo Approach

We will use a **pnpm monorepo** to manage the core framework and user applications.

```plaintext
/typescript-eda-project/
├── apps/
│   ├── my-backend-service/
│   │   ├── src/
│   │   └── package.json
│   └── my-frontend-app/
│       ├── src/
│       └── package.json
├── packages/
│   ├── eda-core/          # The typescript-eda framework itself
│   └── eda-adapters/      # Collection of reusable adapters
├── docs/
│   ├── literate/          # Your source .org files
│   └── ARCHITECTURE.md
├── pnpm-workspace.yaml
└── package.json
```

## 3. The `eda-core` Framework (`packages/eda-core`)

### 3.1. `eda-core/src/domain`

-   **`ValueObject<T>`**, **`Entity<T>`**, **`Event`**, **`Port`**, **`Repository`**: Core building blocks.
-   **`Ports`**: The dependency resolution singleton, managed entirely by the `Application` engine.
-   **`@listen(eventConstructor)`**: Decorator for domain methods. The method is executed when a matching event is dispatched by the engine. It must return `Promise<Event | Event[] | void>`.

### 3.2. `eda-core/src/application`

This is the generic engine the user extends and configures.

-   **`@Enable(AdapterClass)`**: A class decorator used on the user's `Application` subclass to declare an active adapter.
-   **`PrimaryPort` Interface**: A special contract for adapters that initiate workflows.
    ```typescript
    export interface PrimaryPort {
      accept(app: Application): Promise<void>;
    }
    ```
-   **`Application` (Base Class)**: The user extends this class.
    -   It defines an **abstract `metadata` property** that subclasses must implement. This map provides the engine with essential configuration, such as which classes to scan for listeners.
    -   **On Construction**: Uses reflection (`@Enable` decorators, `metadata` map, `@AdapterFor` declarations) to wire up the entire system and initialize the `Ports` singleton.
    -   **`handle(events: Event | Event[]): Promise<void>`**: The public entry point for processing events. This triggers the event-processing loop.
    -   **`start(): Promise<void>`**: The public method that kicks off the application. It finds all enabled `PrimaryPort` adapters and calls `adapter.accept(this)`, delegating control to them to start the application flow.

### 3.3. `eda-core/src/infrastructure`

-   **`@AdapterFor(PortInterface)`**: A decorator placed on an adapter class to explicitly declare which Port it implements, enabling auto-wiring.

## 4. Building a Backend Application

### The Flow

1.  **Domain:** Define the `User` entity to `@listen` for `UserCreationRequested` and return a `UserCreated` event.
2.  **Infrastructure:**
    -   **Secondary Adapter:** `PostgresUserRepository` implements `UserRepository` and is decorated with `@AdapterFor(UserRepository)`.
    -   **Primary Adapter:** `UserCli` implements `PrimaryPort`.

    ```typescript
    // infrastructure/cli/user.cli.ts
    import { Application, PrimaryPort } from 'typescript-eda/application';
    import { UserCreationRequested } from '../../domain/user/events/user-creation-requested.event';

    export class UserCli implements PrimaryPort {
      public async accept(app: Application): Promise<void> {
        const name = process.argv[2] || "Jane Doe";
        const email = process.argv[3] || "jane.doe@example.com";
        const event = new UserCreationRequested({ name, email });
        await app.handle(event);
      }
    }
    ```

3.  **Application Declaration:** This is the central configuration file. Instead of overriding a method, the application subclass now provides a simple `metadata` map. This makes the configuration purely declarative data.

    ```typescript
    // my-backend.application.ts
    import { Application, Enable } from 'typescript-eda/application';
    import { PostgresUserRepository } from './infrastructure/database/postgres-user.repository';
    import { UserCli } from './infrastructure/cli/user.cli';
    import { User } from './domain/user/user.entity';
    import { NotificationHandler } from './handlers/notification.handler';

    @Enable(PostgresUserRepository)
    @Enable(UserCli)
    export class MyBackendApplication extends Application {
      // Provide the configuration as a simple data structure.
      // The framework's engine will read from this map.
      public readonly metadata = new Map<string, any>([
        ['name', "MyBackendApplication"],
        ['description', 'An application to manage lists of tasks']
      ]);
    }
    ```

4.  **Entry Point (`main.ts`):** Instantiate and start.

    ```typescript
    // main.ts
    import { MyBackendApplication } from './my-backend.application';

    async function main() {
      const app = new MyBackendApplication();
      await app.start();
    }
    main();
    ```

## 5. Building a Frontend Application

The principles remain identical. The UI framework root is a `PrimaryPort`, and the state stores are `Handlers`. The application class would `@Enable` the UI adapter and provide the state handlers in its `metadata` map.

## 6. TypeScript Strictness and Tooling

-   **`tsconfig.json`**:
    ```json
    {
      "compilerOptions": {
        "target": "ES2022", "module": "commonjs", "lib": ["es2022", "dom"],
        "strict": true, "esModuleInterop": true, "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "experimentalDecorators": true, "emitDecoratorMetadata": true
      }
    }
    ```
-   **Linter & Formatter**: Use **ESLint** and **Prettier**, enforced with pre-commit hooks (`husky` + `lint-staged`).
-   **Naming Conventions**:
    -   **No `I` prefix for interfaces.** A Port is a contract (`UserRepository`). An Adapter has a technology-specific name (`PostgresUserRepository`).
    -   Use `interface` for public contracts (Ports).
    -   Use `type` for all other cases (event shapes, etc.).
-   **Immutability**: Use `readonly` for properties of Value Objects, Entities, and Events.

## 7. Development Workflow

### Literate Programming

-   All source code for the framework packages (`eda-core`, `eda-adapters`) **must** be generated from Org-mode (`.org`) files located in `/docs/literate`. This ensures documentation and implementation are never out of sync and promotes a thoughtful, design-first approach.

### TDD Git Commits

Every feature must follow a strict Test-Driven Development cycle focusing on a "walking-skeleton" approach: incremental features, ensuring previous ones continue working. This is non-negotiable. Also, all commits must be signed. That's not negotiable as well.

1.  **Write a failing test.** The test should clearly state the intention of the feature.
    -   `git add .`
    -   `git commit -m "🧪 failing test for <feature description>"`

2.  **Write the minimal code to make the test pass.** Do not add any other logic.
    -   `git add .`
    -   `git commit -m "✅ implement <feature description> with passing tests"`

3.  **Refactor the code.** Improve the implementation, remove duplication, and enhance clarity, all while keeping the tests green.
    -   `git add .`
    -   `git commit -m "🚀 refactor and optimize implementation of <feature>"`

### General Git Commits

For any other type of work, use the [Gitmoji standard](https://gitmoji.dev/) to provide a clear, at-a-glance summary of the commit's purpose.
-   `📝 docs: update GEMINI.md with frontend guidelines`
-   `🔧 chore: configure pnpm workspaces for a new adapter`
-   `🐛 fix: resolve incorrect event dispatching in application engine`
-   `🎨 style: format entire codebase with prettier`
-   `👷 ci: add github actions workflow for automated testing`General Git Commits

By following these guidelines, typescript-eda will become a robust, maintainable, and highly consistent framework that empowers developers to focus on what truly matters: the business logic.
