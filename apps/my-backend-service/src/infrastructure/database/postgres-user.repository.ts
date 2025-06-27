import { AdapterFor } from 'packages/eda-core/src'
import { UserRepository } from '../../domain/user/user.repository'

@AdapterFor(UserRepository)
export class PostgresUserRepository implements UserRepository {
  // TODO: Add methods
}
