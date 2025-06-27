import { Application, Enable } from 'packages/eda-core/src'
import { PostgresUserRepository } from './infrastructure/database/postgres-user.repository'
import { UserCli } from './infrastructure/cli/user.cli'
import { User } from './domain/user/user.entity'
import { NotificationHandler } from './handlers/notification.handler'

@Enable(PostgresUserRepository)
@Enable(UserCli)
@Enable(NotificationHandler)
@Enable(User)
export class MyBackendApplication extends Application {
  public readonly metadata = new Map<string, unknown>([
    ['name', 'MyBackendApplication'],
    ['description', 'An application to manage lists of tasks'],
  ])
}
