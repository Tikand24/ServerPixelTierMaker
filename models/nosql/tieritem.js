const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const TierItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    tags:[{
      name: {
          type:String
      },
    }],
    tierId: {
      type: mongoose.Types.ObjectId,
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
TierItemSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tieritem', TierItemSchema);
