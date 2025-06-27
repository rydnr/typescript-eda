# 02. Application Layer

## 1. Application Base Class

- **Action:** Create the `Application` abstract base class.
- **Details:**
  - It will have an abstract `metadata` property.
  - It will have a `handle(events: Event | Event[]): Promise<void>` method.
  - It will have a `start(): Promise<void>` method.
  - The constructor will be responsible for wiring up the application.

## 2. @Enable Decorator

- **Action:** Implement the `@Enable` class decorator.
- **Details:**
  - It will store the enabled adapters in metadata on the `Application` class.

## 3. PrimaryPort Interface

- **Action:** Define the `PrimaryPort` interface.
- **Details:**
  - It will have a single method: `accept(app: Application): Promise<void>`.
