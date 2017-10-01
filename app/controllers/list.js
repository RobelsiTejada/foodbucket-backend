'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const List = models.list

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  console.log(res)
  List.find()
    .then(list => res.json({ list }))
    .catch(next)
}

const show = (req, res, next) => {
  List.findById(req.params.id)
    .then(list => list ? res.json({ list }) : next())
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.list.update(req.body.list)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.list.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

const create = (req, res, next) => {
  const list = Object.assign(req.body.list, {
    _owner: req.user._id
  })
  List.create(list)
  .then(list =>
    res.status(201)
      .json({
        list: list.toJSON({ virtuals: true, user: req.user })
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
  { method: setModel(List), only: ['show'] },
  { method: setModel(List, { forUser: true }), only: ['update', 'destroy'] }
] })
