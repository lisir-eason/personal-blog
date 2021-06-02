const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

function userValidate(data ={}) {
  return validate(data, SCHEMA)
}

module.exports = userValidate