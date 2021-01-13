const object2output = (schema) => {
  const output = {}
  const properties = schema.properties
  for (const key in properties) {
    // if (properties.hasOwnProperty(key)) {
    if (properties[key].type === 'object') {
      output[key] = object2output(properties[key])
    } else if (properties[key].type === 'object') {
      output[key] = array2output(properties[key])
    } else {
      output[key] = properties[key].default || null
    }
    // }
  }
  return output
}

const array2output = (schema) => {
  return schema.default ? schema.default : []
}

const schema2output = (schema) => {
  return schema.type === 'object' ? object2output(schema) : array2output(schema)
}

export default schema2output
