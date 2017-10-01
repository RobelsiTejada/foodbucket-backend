'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const show = (req, res) => {
  res.json({
    restaurants: req.Restaurants.toJSON({ virtuals: true, user: req.user })
  })
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.Restaurants.update(req.body.Restaurants)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.Restaurants.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

const create = (req, res, next) => {
  const restaurants = Object.assign(req.body.Restaurants, {
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

module.exports = controller({
  show,
  update,
  destroy,
  create
}, { before: [
  { method: setUser, only: ['show'] },
  { method: authenticate, except: ['show'] },
  { method: setModel(Restaurants), only: ['show', 'update', 'destroy', 'create'] },
  { method: setModel(Restaurants, { forUser: true }), only: ['update', 'destroy', 'create'] }
] })
