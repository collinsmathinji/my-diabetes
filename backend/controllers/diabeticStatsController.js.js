const DiabeticStats = require('../models/diabeticStatsModel');
const mongoose = require('mongoose');

// Get all diabetic stats
const getDiabeticStats = async (req, res) => {
  const user_id = req.user._id;

  const diabeticStats = await DiabeticStats.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(diabeticStats);
};

// Get a single diabetic stat
const getDiabeticStat = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such diabetic stat' });
  }

  const diabeticStat = await DiabeticStats.findById(id);

  if (!diabeticStat) {
    return res.status(404).json({ error: 'No such diabetic stat' });
  }

  res.status(200).json(diabeticStat);
};

// Create new diabetic stat
const createDiabeticStat = async (req, res) => {
  const { bloodSugarLevel, insulinIntake, medication } = req.body;

  let emptyFields = [];

  if (!bloodSugarLevel) {
    emptyFields.push('bloodSugarLevel');
  }
  if (!insulinIntake) {
    emptyFields.push('insulinIntake');
  }
  if (!medication) {
    emptyFields.push('medication');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const diabeticStat = await DiabeticStats.create({ bloodSugarLevel, insulinIntake, medication, user_id });
    res.status(200).json(diabeticStat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a diabetic stat
const deleteDiabeticStat = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such diabetic stat' });
  }

  const diabeticStat = await DiabeticStats.findOneAndDelete({ _id: id });

  if (!diabeticStat) {
    return res.status(400).json({ error: 'No such diabetic stat' });
  }

  res.status(200).json(diabeticStat);
};

// Update a diabetic stat
const updateDiabeticStat = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such diabetic stat' });
  }

  const diabeticStat = await DiabeticStats.findOneAndUpdate({ _id: id }, {
    ...req.body
  });

  if (!diabeticStat) {
    return res.status(400).json({ error: 'No such diabetic stat' });
  }

  res.status(200).json(diabeticStat);
};

module.exports = {
   getDiabeticStats,
   getDiabeticStat ,
  createDiabeticStat,
  deleteDiabeticStat,
  updateDiabeticStat
};
