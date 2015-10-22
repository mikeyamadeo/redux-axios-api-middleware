import expect from 'expect'
import { applySchema } from './utils'

describe('redux-axios-api-middleware', () => {

  describe('applySchema', () => {

    it('Transform simple response correctly', () => {
      const schema = {
        id: '_id',
        name: 'test'
      }

      const response = [
        {
          _id: '123',
          test: 'mikey'
        }
      ]

      const result = applySchema(schema, response)

      expect(result.result).toExist()
      expect(result.result[0]).toEqual(response[0]._id)
      expect(result.entities.test).toExist()
      expect(result.entities.test[123]).toExist()
      expect(result.entities.test[123]).toEqual(response[0])

    })
  })

})
