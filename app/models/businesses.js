'use strict'

const mongoose = require('mongoose')

const businessesSchema = new mongoose.Schema({
  businesses: [
    {
      rating: {
        type: Number,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      phone: {
        type: Number,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      is_closed: {
        type: Boolean,
        required: true
      },
      categories: [
        {
          alias: {
            type: String,
            required: true
          },
          title: {
            type: String,
            required: true
          }
        }
      ],
      review_count: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      url: {
        https: {
          type: String,
          required: true
        }
      },
      coordinates: {
        latitude: {
          type: Number,
          required: true
        },
        longitude: {
          type: Number,
          required: true
        }
      },
      image_url: {
        http: {
          type: String,
          required: true
        }
      },
      location: {
        city: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        address2: {
          type: String,
          required: true
        },
        address3: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        address1: {
          type: String,
          required: true
        },
        zip_code: {
          type: Number,
          required: true
        }
      },
      distance: {
        type: Number,
        required: true
      },
      transactions: ['']
    }
  ],
  region: {
    center: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }
  },
  _restaurants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurants'
  }
})

const Businesses = mongoose.model('Businesses', businessesSchema)

module.export = Businesses
