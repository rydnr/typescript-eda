import { MyBackendApplication } from './my-backend.application'

async function main() {
  const app = new MyBackendApplication()
  await app.start()
}
main()
