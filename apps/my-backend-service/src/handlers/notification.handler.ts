import { listen } from 'typescript-eda/application'
import { UserCreated } from '../domain/user/events/user-created.event'

export class NotificationHandler {
  @listen(UserCreated)
  public async onUserCreated(event: UserCreated): Promise<void> {
    console.log('Sending notification for user:', event.payload)
  }
}
