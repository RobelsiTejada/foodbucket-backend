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
.resources('uploads')
.get('/list', 'list#show')
.delete('/list', 'list#destroy')
.patch('/list', 'list#update')
.post('/list', 'list#create')
.get('/restaurants', 'restaurants#show')
.delete('/restaurants', 'restaurants#destroy')
.patch('/restaurants', 'restaurants#update')
.get('/businesses', 'businesses#browse')
