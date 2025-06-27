import { ValueObject } from '../value-object'

class TestValueObject extends ValueObject<string> {
  constructor(props: string) {
    super(props)
  }
}

describe('ValueObject', () => {
  it('should fail', () => {
    const vo1 = new TestValueObject('test')
    const vo2 = new TestValueObject('test2')
    expect(vo1.equals(vo2)).toBe(true)
  })
})
