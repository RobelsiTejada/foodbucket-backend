'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
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
