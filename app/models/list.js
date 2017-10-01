'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  restaurants: {
    type: Array,
    required: false
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

listSchema.virtual('length').get(function length () {
  return this.text.length
})
const List = mongoose.model('List', listSchema)

module.export = List
