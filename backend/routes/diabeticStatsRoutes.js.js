const express = require('express');
const router = express.Router();

const {
  getDiabeticStats,
  getDiabeticStat,
  createDiabeticStat,
  deleteDiabeticStat,
  updateDiabeticStat,
} = require('../controllers/diabeticStatsController.js');

const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);


router.get('/', getDiabeticStats);

router.get('/:id', getDiabeticStat);


router.post('/', createDiabeticStat);

router.delete('/:id', deleteDiabeticStat);

router.patch('/:id', updateDiabeticStat);

module.exports = router;
