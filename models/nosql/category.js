const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Category = mongoose.Schema(
  {
    name: {
      type: String,
    },
    tags:[{
        name: {
            type:String
        },
      }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
Category.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('category', Category);
