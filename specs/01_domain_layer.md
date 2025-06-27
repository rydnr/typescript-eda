# 01. Domain Layer

## 1. Core Building Blocks

- **Action:** Define the core domain classes and interfaces.
- **Details:**
  - `ValueObject<T>`: An abstract class for value objects.
  - `Entity<T>`: An abstract class for entities.
  - `Event`: A base class for domain events.
  - `Port`: A marker interface for ports.
  - `Repository`: A marker interface for repositories, extending `Port`.

## 2. Ports Singleton

- **Action:** Implement the `Ports` singleton.
- **Details:**
  - This will be a simple key-value store for ports and their implementations.
  - It will be managed by the `Application` engine.
