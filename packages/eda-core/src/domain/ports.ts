import { Port } from './port'

export class Ports {
  private static readonly ports = new Map<string, Port>()

  public static get<T extends Port>(port: new (...args: unknown[]) => T): T {
    const implementation = this.ports.get(port.name)
    if (!implementation) {
      throw new Error(`Port ${port.name} not found`)
    }
    return implementation as T
  }

  public static set<T extends Port>(
    port: new (...args: unknown[]) => T,
    implementation: T,
  ): void {
    this.ports.set(port.name, implementation)
  }

  public static clear(): void {
    this.ports.clear()
  }
}
