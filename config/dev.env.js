'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8103/activity/drip-web"'
  // BASE_API: '"http://47.98.53.243:8103/activity/drip-web"'
})
