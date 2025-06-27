import { Application } from './application'

export interface PrimaryPort {
  accept(app: Application): Promise<void>
}
