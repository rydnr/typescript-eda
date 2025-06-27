import { Event } from './event'

export function listen(event: Event): MethodDecorator {
  return (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    if (!Reflect.hasMetadata('listeners', target.constructor)) {
      Reflect.defineMetadata('listeners', [], target.constructor)
    }
    const listeners = Reflect.getMetadata('listeners', target.constructor)
    listeners.push({
      event,
      propertyKey,
      descriptor,
    })
  }
}
