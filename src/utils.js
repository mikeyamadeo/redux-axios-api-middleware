const DEFAULT_METHOD = `GET`

export function composeConfig (callAPI) {
  let {
    apiRoot,
    url,
    endpoint,
    method,
    headers,
    transformResponse,
    params,
    data
  } = callAPI

  if (!url) {
    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.')
    }

    url = apiRoot + endpoint
  }

  if (!method) {
    method = DEFAULT_METHOD
  }

  return { url, method, headers, transformResponse, params, data }
}

/**
 * INPUT ->
 * Schema: {
 *  id: '_id',
 *  name: 'users'
 * }
 * +
 * Data: {
 *  _id: 1
 *  firstName: 'tina'
 * }
 *
 * OUTPUT ->
 * Result: {
 *  entities: {
 *    '1': { _id: 1, firstName: 'tina'}
 *  }
 *  result: [1]
 * }
 *
 * 1. assume if key is provide, response will be an object with a property
 * of the desired data to be transformed.
 * 2. if no key is provided, assume response is either a single entity,
 * or an array of entities.
 * 3. if it is a single entity, wrap in array for ease of transformation
 */
export function applySchema (schema, response) {
  if (!schema) return response
  const { key, name, id } = schema
  const entityTransform = schema.entityTransform
    ? schema.entityTransform
    : data => data

  if (key && !response[key]) {
    throw new Error(
      `key of '${key}' provided in schema, but no property with value of '${key}' found in response.`
    )
  }

  let data = key ? response[key] /* [1] */ : response

  /* [2] */
  if (data.constructor !== Array) {
    data = [ data ] /* [3] */
  }

  const entities = { [schema.name]: {} }

  let result = []

  data.forEach((item, i) => {
    const entity = entityTransform(item)
    let _id = entity[id]
    entities[name][_id] = entity
    result.push(_id)
  })

  const transformation = { entities, result }

  return key ? { ...response, ...transformation } : transformation
}

export function maybeParse (data) {
  if (!isJSON(data)) {
    return data
  }

  return JSON.parse(data)
}

function isJSON (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
