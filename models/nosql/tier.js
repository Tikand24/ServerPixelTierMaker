const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const TierSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    templateId: {
      type: mongoose.Types.ObjectId,
    },
    order: {
      type: Number,
    },
    color: {
      type: String,
    },
    itemSelected: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
TierSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tier', TierSchema);
