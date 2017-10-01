'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  restaurants_id: {
    type: Array,
    required: false
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})
const List = mongoose.model('List', listSchema)

module.export = List
