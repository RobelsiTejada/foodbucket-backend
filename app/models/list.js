'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  restaurants: {
    type: Array,
    required: false
  // },
  // _user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // }
  }
})

listSchema.virtual('length').get(function length () {
  return this.text.length
})
const List = mongoose.model('List', listSchema)

module.export = List
