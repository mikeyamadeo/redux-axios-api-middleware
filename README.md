# redux-axios-api-middleware


### schema

```js
// simple schema transform
let schema: {
  id: '_id',
  name: 'users'
}

let apiResponse: {
  _id: 1,
  firstName: 'tina'
}

let output: {
  entities: {
    '1': { _id: 1, firstName: 'tina' }
  },
  result: [1]
}

// schema transform on response object
let schema: {
  key: 'entities',
  id: '_id',
  name: 'users'
}

let apiResponse: {
  entities: [
    {
      _id: 1,
      firstName: 'tina'
    }
  ]
}

let output: {
  entities: {
    '1': { _id: 1, firstName: 'tina' }
  },
  result: [1]
}

// schema transform with entity transform
let schema: {
  key: 'entities',
  id: '_id',
  name: 'users',
  entityTransform: entity => entity.person
}

let apiResponse: {
  entities: [
    {
      person: {
        _id: 1,
        firstName: 'tina'
      },
      otherProperty: {}
    }
  ]
}

let result: {
  entities: {
    '1': { _id: 1, firstName: 'tina' }
  },
  result: [1]
}
```
