'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Businesses = models.businesses
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const Yelp = require('yelpv3')
const yelp = new Yelp({
  app_id: 'xlACoXuuSZmb83hJcDxgSg',
  app_secret: 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
})

const browse = function (req, res, next) {
  // https://www.yelp.com/developers/documentation/v3/business_search
  yelp.search({
    term: 'restaurants',
    latitude: '41.82399',
    longitude: '-71.41283',
    radius: 8047,
    limit: 10
  })
  .then(response => {
    res.send(JSON.parse(response))
  })
  .catch(function (err) {
    res.send(JSON.parse(err))
  })
}

module.exports = controller({
  browse
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['browse'] },
  { method: setModel(Businesses, { forUser: true }), only: ['update', 'destroy'] }
] })
