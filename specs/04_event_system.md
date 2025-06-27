# 04. Event System

## 1. @listen Decorator

- **Action:** Implement the `@listen` method decorator.
- **Details:**
  - It will register a method as a listener for a specific event.
  - The decorated method must return `Promise<Event | Event[] | void>`.

## 2. Event Handling in Application

- **Action:** Implement the event handling logic in the `Application.handle` method.
- **Details:**
  - This will be an event loop that processes events and their resulting events.
  - It will find all methods decorated with `@listen` that match the current event and execute them.
