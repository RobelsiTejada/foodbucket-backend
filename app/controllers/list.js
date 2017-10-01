'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const List = models.list

const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  List.find()
    .then(list => res.json({
      lists: list.map((e) =>
        e.toJSON({ virtuals: true }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    lists: req.list.toJSON({ virtuals: true })
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
        lists: list.toJSON({ virtuals: true })
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
  { method: setModel(List), only: ['index', 'show', 'destroy', 'update'] },
  { method: setModel(List, { forUser: true }), only: ['create', 'update', 'destroy'] }
] })
