'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurant = models.restaurants

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Restaurant.find()
    .then(examples => res.json({
      examples: examples.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    example: req.example.toJSON({ virtuals: true, user: req.user })
  })
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.restaurant.update(req.body.restaurant)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.restaurant.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

const create = (req, res, next) => {
  const restaurant = Object.assign(req.body.restaurant, {
    _owner: req.user._id
  })
  Restaurant.create(restaurant)
    .then(restaurant =>
      res.status(201)
        .json({
          restaurant: restaurant.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  update,
  destroy,
  create
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Restaurant), only: ['show'] },
  { method: setModel(Restaurant, { forUser: true }), only: ['update', 'destroy'] }
] })
