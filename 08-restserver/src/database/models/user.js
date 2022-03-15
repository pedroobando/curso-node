const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'The name is required'],
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'Email is required'],
    trim: true,
  },
  password: {
    type: Schema.Types.String,
    required: [true, 'Password is required'],
    trim: true,
  },
  imagen: {
    type: Schema.Types.String,
    required: false,
  },
  roll: {
    type: Schema.Types.String,
    required: true,
    enum: ['ADMIN_ROLL', 'USER_ROLL'],
  },
  active: {
    type: Schema.Types.Boolean,
    required: true,
    default: true,
  },
  google: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
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

UserSchema.methods.toJSON = function () {
  const { __v, password, ...theUser } = this.toObject();
  return theUser;
};

UserSchema.index({ name: 1 }, { unique: false });
UserSchema.index({ email: 1 }, { unique: true });
module.exports = model('usuario', UserSchema);
