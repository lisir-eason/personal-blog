const Ajv = require('ajv')
const ajv = new Ajv()

function validate(data, schema) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors
  }
}

module.exports = validate