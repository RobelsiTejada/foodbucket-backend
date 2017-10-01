'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const List = models.List
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const show = (req, res) => {
  res.json({
    list: req.List.toJSON({ virtuals: true, user: req.user })
  })
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.List.update(req.body.List)
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  show,
  update
}, { before: [
  { method: setUser, only: ['show'] },
  { method: authenticate, except: ['show'] },
  { method: setModel(List), only: ['show'] },
  { method: setModel(List, { forUser: true }), only: ['update'] }
] })
