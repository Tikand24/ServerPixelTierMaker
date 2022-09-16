const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const TemplateSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    medias: [String],
    categoryId: {
      type: mongoose.Types.ObjectId,
    },
    tiers: [
      {
        name: {
          type: String,
        },
        order: {
          type: Number,
        },
        color: {
          type: String,
        },
        itemSelected: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
TemplateSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('template', TemplateSchema);
