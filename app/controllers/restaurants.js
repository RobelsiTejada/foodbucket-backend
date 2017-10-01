'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Restaurants.find()
    .then(restaurant => res.json({
      restaurant: restaurant.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    restaurants: req.restaurants.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const restaurants = Object.assign(req.body.restaurants, {
    _owner: req.user._id
  })
  Restaurants.create(restaurants)
    .then(restaurants =>
      res.status(201)
        .json({
          restaurants: restaurants.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.restaurants.update(req.body.restaurants)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.restaurants.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Restaurants), only: ['show'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy'] }
] })
