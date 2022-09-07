const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    tags:[{
      name: {
          type:String
      },
    }],
    iterItemId: {
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
ItemSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('items', ItemSchema);
