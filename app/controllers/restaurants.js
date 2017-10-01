'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Restaurants = models.restaurants

const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Restaurants.find()
    .then(restaurants => res.json({
      restaurant: restaurants.map((e) =>
        e.toJSON())
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    restaurant: req.restaurants.toJSON()
  })
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

const create = (req, res, next) => {
  const restaurantsA = Object.assign(req.body.restaurants, {
    _owner: req.user._id
  })
  Restaurants.create(restaurantsA)
    .then(restaurants =>
      res.status(201)
        .json({
          restaurant: restaurants.toJSON()
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
  { method: setModel(Restaurants), only: ['index', 'show', 'destroy', 'create', 'update'] }
] })
