import { Application, PrimaryPort } from 'packages/eda-core/src'
import { UserCreationRequested } from '../../domain/user/events/user-creation-requested.event'

export class UserCli implements PrimaryPort {
  public async accept(app: Application): Promise<void> {
    const name = process.argv[2] || 'Jane Doe'
    const email = process.argv[3] || 'jane.doe@example.com'
    const event = new UserCreationRequested({ name, email })
    await app.handle(event)
  }
}
