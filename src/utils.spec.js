import expect from 'expect'
import { applySchema } from './utils'

describe('redux-axios-api-middleware', () => {
  describe('applySchema', () => {
    it('Transform simple response correctly', () => {
      const schema = { id: '_id', name: 'test' }

      const response = [ { _id: '123', test: 'mikey' } ]

      const result = applySchema(schema, response)

      expect(result.result).toExist()
      expect(result.result[0]).toEqual(response[0]._id)
      expect(result.entities.test).toExist()
      expect(result.entities.test[123]).toExist()
      expect(result.entities.test[123]).toEqual(response[0])
    })
    it('Transforms complex response correctly', () => {
      const schema = { id: '_id', name: 'users', key: 'entities' }

      const response = { entities: [ { _id: '123', test: 'mikey' } ] }

      const result = applySchema(schema, response)

      expect(
        result.entities.users
      ).toEqual({ '123': { _id: '123', test: 'mikey' } })
    })
    it('Enables entity transformation', () => {
      const schema = {
        id: '_id',
        name: 'users',
        key: 'entities',
        entityTransform: data => data.entity
      }

      const response = {
        entities: [ { entity: { _id: '123', test: 'mikey' }, other: 123 } ]
      }

      const result = applySchema(schema, response)

      expect(
        result.entities.users
      ).toEqual({ '123': { _id: '123', test: 'mikey' } })
    })
  })
})
