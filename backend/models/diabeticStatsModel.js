const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diabeticStatsSchema = new Schema({
  bloodSugarLevel: {
    type: Number,
    required: true,
  },
  insulinIntake: {
    type: Number,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('DiabeticStats', diabeticStatsSchema);
