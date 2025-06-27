import { Port } from '../domain/port'

export function AdapterFor(port: Port): ClassDecorator {
  return (target: unknown) => {
    Reflect.defineMetadata('port', port, target)
  }
}
