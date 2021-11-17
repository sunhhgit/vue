const { getOptions }  = require('loader-utils')
const { validate } = require('schema-utils')

const schema = require('./schema.json')

module.exports = function (content, map, meta) {
  console.log('This is a loaderC')
  const _options = getOptions(this)
  console.log('This is a loaderC' + _options.name)

  validate(schema, _options, {
    name: 'loaderC'
  })

  return content
}
