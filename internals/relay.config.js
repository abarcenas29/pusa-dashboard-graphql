const path = require('path')

module.exports = {
  src: path.resolve(__dirname, '../app'),
  schema: path.resolve(__dirname, '../data/schema.graphql'),
  artifactDirectory: path.resolve(__dirname, '../__generated__/relay'),
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**']
}
