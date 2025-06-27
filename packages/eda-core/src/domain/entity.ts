import { ValueObject } from './value-object'

export abstract class Entity<T> extends ValueObject<T> {
  protected constructor(protected readonly props: T) {
    super(props)
  }
}
