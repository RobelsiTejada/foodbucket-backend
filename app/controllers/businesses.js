'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
// const http = require('http')
// const fs = require('fs')

const browse = function () {
  const yelp = require('yelp-fusion')
  const clientId = 'xlACoXuuSZmb83hJcDxgSg'
  const clientSecret = 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search({
      term: 'restaurants',
      latitude: '41.792875',
      longitude: '-71.414163',
      radius: 8047,
      limit: 10
    }).then(response => {
      // JSON.parse(response.jsonBody.businesses)
      console.log(response.jsonBody)
      console.log(response.jsonBody.businesses)
      console.log(response.jsonBody.businesses[0].id)
      console.log(response.jsonBody.businesses[0].name)
      console.log(response.jsonBody.businesses[0].image_url)
      console.log(response.jsonBody.businesses[0].display_phone)
      console.log(response.jsonBody.businesses[0].display_address)
      console.log(response.jsonBody.businesses[0].url)
      console.log(response.jsonBody.businesses[0].is_closed)
    })
  }).catch()(e => {
    console.log(e)
  })
}

module.exports = controller({
  browse
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['browse'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
