const { Schema, model } = require('mongoose');

const RollSchema = Schema({
  roll: {
    type: Schema.Types.String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

RollSchema.index({ roll: 1 }, { unique: true });
module.exports = model('roll', RollSchema);
