'use strict'

const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
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

restaurantsSchema.virtual('length').get(function length () {
  return this.businesses.length
})

const Restaurants = mongoose.model('Restaurants', restaurantsSchema)

module.export = Restaurants
