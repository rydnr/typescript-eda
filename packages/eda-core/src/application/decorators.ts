export function Enable(adapter: unknown): ClassDecorator {
  return (target: unknown) => {
    if (!Reflect.hasMetadata('adapters', target)) {
      Reflect.defineMetadata('adapters', [], target)
    }
    const adapters = Reflect.getMetadata('adapters', target)
    adapters.push(adapter)
  }
}
