const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const TierSchema = mongoose.Schema(
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
TierSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tiers', TierSchema);
