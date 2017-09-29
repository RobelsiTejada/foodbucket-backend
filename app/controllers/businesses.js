'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
// const http = require('http')
// const fs = require('fs')
const Yelp = require('yelpv3')
const yelp = new Yelp({
  app_id: 'xlACoXuuSZmb83hJcDxgSg',
  app_secret: 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
})

const browse = function (res, req, next) {
  // https://www.yelp.com/developers/documentation/v3/business_search
  yelp.search({term: 'food', location: '90210', limit: 10})
  // ({
  //   term: 'restaurants',
  //   latitude: '41.792875',
  //   longitude: '-71.414163',
  //   radius: 8047,
  //   limit: 1})
  .then(function (data) {
    JSON.parse(data)
    res.send(data)
    // console.log(data)
  })
  .catch(function (err) {
    console.error(err)
  })

//   const yelp = require('yelp-fusion')
//   const clientId = 'xlACoXuuSZmb83hJcDxgSg'
//   const clientSecret = 'qiH6mwAcjzmzaW1hZ8uvkD9ESq8JWCCUtmBbz3NWs0cbRZRHyFa7J8r0JjT36Gaz'
//
//   yelp.accessToken(clientId, clientSecret).then(response => {
//     const client = yelp.client(response.jsonBody.access_token)
//
//     client.search({
//       term: 'restaurants',
//       latitude: '41.792875',
//       longitude: '-71.414163',
//       radius: 8047,
//       limit: 10
//     }).then(response => {
//       const data = fs.readFileSync('index.html')
//       if (data) {
//         response.send(data.replace('param1Place', 'response'))
//       }
//
//       // const data = response.jsonBody.businesses
//       // // send the html
//       // response.get('/', (req, res) => res.sendFile('index'))
//       // // send json data
//       // response.get('/data', (req, res) => res.json(data))
//
//       console.log(response.jsonBody.businesses)
//       console.log(response.jsonBody.businesses[0].id)
//       console.log(response.jsonBody.businesses[0].name)
//       console.log(response.jsonBody.businesses[0].image_url)
//       console.log(response.jsonBody.businesses[0].display_phone)
//       console.log(response.jsonBody.businesses[0].display_address)
//       console.log(response.jsonBody.businesses[0].url)
//       console.log(response.jsonBody.businesses[0].is_closed)
//     })
//   }).catch()(e => {
//     console.log(e)
//   })
}

module.exports = controller({
  browse
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['browse'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
