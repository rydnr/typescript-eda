import { Event } from '../event'

describe('Event', () => {
  it('should fail', () => {
    const event = new Event({ test: 'test' })
    expect(event.payload).toEqual({ test: 'test2' })
  })
})
