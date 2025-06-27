import { Entity } from '../entity'

class TestEntity extends Entity<{ id: string }> {
  constructor(props: { id: string }) {
    super(props)
  }
}

describe('Entity', () => {
  it('should fail', () => {
    const entity1 = new TestEntity({ id: '1' })
    const entity2 = new TestEntity({ id: '2' })
    expect(entity1.equals(entity2)).toBe(true)
  })
})
