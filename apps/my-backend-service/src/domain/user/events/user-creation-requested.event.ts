import { Event } from 'packages/eda-core/src'

export class UserCreationRequested extends Event {
  constructor(
    public override readonly payload: { name: string; email: string },
  ) {
    super(payload)
  }
}
