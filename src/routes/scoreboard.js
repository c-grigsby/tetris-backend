// @packages
const express = require('express');
// @scripts
const { getScoreboard, getLeaderboard, postScore, removeScore, updateScore } = require('../controllers/scoreboard-controller');

const router = express.Router();

// @route /api/v1/scoreboard
router.route('/').get(getScoreboard);

router.route('/leaders').get(getLeaderboard);

router.route('/').post(postScore);

router.route('/:id').put(updateScore);

router.route('/:id').delete(removeScore);

module.exports = router;