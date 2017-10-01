'use strict'

const HttpError = require('lib/wiring/errors/http-error')

const setMongooseModel = (models, options) =>
  function (req, res, next) {
    const search = { _id: req.params.id }
    if (options && options.forUser) {
      search._owner = req.user
    }

    models.findOne(search, (error, document) => {
      error = error || !document && new HttpError(404)
      if (error) {
        return next(error)
      }

      req[models.modelName.toLowerCase()] = document
      next()
    })
  }

module.exports = setMongooseModel
