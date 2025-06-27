import { Ports } from '../ports'
import { Port } from '../port'

class TestPort implements Port {}

class TestPortImpl implements TestPort {}

describe('Ports', () => {
  it('should fail', () => {
    Ports.set(TestPort, new TestPortImpl())
    const port = Ports.get(TestPort)
    expect(port).toBeInstanceOf(TestPort)
  })
})
