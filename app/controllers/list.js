'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const List = models.list

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')

const index = (req, res, next) => {
  List.find()
    .then(list => res.json({
      lists: list.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    lists: req.list.toJSON({ virtuals: true, user: req.user })
  })
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
  const lists = Object.assign(req.body.list, {
    _owner: req.user._id
  })
  List.create(lists)
  .then(list =>
    res.status(201)
      .json({
        lists: list.toJSON({ virtuals: true, user: req.user })
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
  { method: authenticate, except: ['index', 'show'] }
] })
