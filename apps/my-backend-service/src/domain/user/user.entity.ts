import { Entity, listen } from 'packages/eda-core/src'
import { UserCreated } from './events/user-created.event'
import { UserCreationRequested } from './events/user-creation-requested.event'

export class User extends Entity<User> {
  @listen(new UserCreationRequested({ name: '', email: '' }))
  public static create(event: UserCreationRequested): UserCreated {
    return new UserCreated(event.payload)
  }
}
