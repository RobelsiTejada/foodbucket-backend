'use strict'

module.exports = require('../lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
.delete('/list', 'list#destroy')
.patch('/list', 'list#update')
.post('/list', 'list#create')
.resources('list', { only: ['index', 'show'] })
.delete('/restaurants', 'restaurants#destroy')
.patch('/restaurants', 'restaurants#update')
.post('/restaurants', 'restaurants#create')
.resources('restaurants', { only: ['index', 'show'] })
.get('/businesses', 'businesses#browse')
