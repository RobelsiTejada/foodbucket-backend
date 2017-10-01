'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  restaurants: {
    type: Array,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

listSchema.virtual('length').get(function length () {
  return this.restaurants.length
})

const List = mongoose.model('List', listSchema)

module.export = List
