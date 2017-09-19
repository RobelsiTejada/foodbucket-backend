'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  _restaurants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants'
  }
}, {
  timestamps: true
})
const List = mongoose.model('List', listSchema)

module.export = List
