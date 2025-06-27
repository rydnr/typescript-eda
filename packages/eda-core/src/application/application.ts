import { Event } from '../domain/event'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrimaryPort } from './primary-port'

export abstract class Application {
  public abstract readonly metadata: Map<string, unknown>

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handle(events: Event | Event[]): Promise<void> {
    // TODO: Implement event handling
  }

  public async start(): Promise<void> {
    // TODO: Implement application startup
  }
}
