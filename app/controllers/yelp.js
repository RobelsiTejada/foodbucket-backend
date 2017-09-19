'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const yelp = require('yelp-fusion')
const clientId = 'xlACoXuuSZmb83hJcDxgSg'
const clientSecret = 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
const request = require('request')

// gets access token for yelp

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token)

  client.search({
    term: 'restaurants',
    location: 'providence, ri'
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name)
  })
}).catch(e => {
  console.log(e)
})

const getinfo = () => {
  request.get('https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=41.792875&longitude=-71.414163&radius=8047/', {
    'auth': {
      'bearer': 'NHG0larijXXaQKiCWF1D7zz_vpxcnFDPMoIz-i1tRcxdx3Af18IVCYYLXfQGes0o_0R-2TiXKv3qHYs981_sNJiE3yjYZJAkDGEuqNKmzBpZuaxeaBnjF_PtQWC9WXYx'
    }
  })
  console.log(request.jsonBody)
}

module.exports = controller({
  getinfo
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show', 'getinfo'] },
  { method: setModel(Restaurants), only: ['show'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
