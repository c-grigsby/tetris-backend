// @packages
const async = require('async');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
// @scripts
const asyncHandler = require('../middleware/async');
const scoreboard_path = path.join(process.cwd(), '/data/scoreboard.json');

// @desc    Get scoreboard data for I Just Want To Play Tetris
// @route   GET /api/v1/scoreboard
exports.getScoreboard = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    err ? next(err) : res.send(jsonStr);
  });
});

// @desc    Get top 5 scores for I Just Want To Play Tetris
// @route   GET /api/v1/scoreboard/leaders
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
  // filter data for leaders
  res.status(200).json({
    success: true,
  });
});

// @desc    Add new scoreboard data for I Just Want To Play Tetris
// @route   POST /api/v1/scoreboard
exports.postScore = asyncHandler(async (req, res, next) => {
  const newScore = {
    id: uuid.v4(),
    player: req.body.player,
    score: req.body.score,
  };

  if (!newScore.player || !newScore.score) {
    return res.status(400).json({ msg: 'Please include a player and score' });
  }

  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const scoreboard_data = JSON.parse(jsonStr);
        score_data.push(newScore);
        fs.writeFile(
          scoreboard_path,
          JSON.stringify(scoreboard_data, null, 2),
          (err) => {
            err
              ? next(err)
              : res.status(201).json({
                  success: true,
                  id: newScore.id,
                  player: newScore.player,
                  score: newScore.score,
                });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Remove a scoreboard entry for I Just Want To Play Tetris
// @route   DELETE /api/v1/scoreboard/:id
exports.removeScore = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        console.log("Request param", req.param);
        const idToRemove = req.param;
        let scoreboard_data = JSON.parse(jsonStr);

        scoreboard_data = scoreboard_data.filter((child) => parseInt(child.id) !== idToRemove);

        fs.writeFile(
          scoreboard_path,
          JSON.stringify(scoreboard_data, null, 2),
          (err) => {
            err
              ? next(err)
              : res.status(200).json({
                  success: true,
                  player_scoreboard: scoreboard_data,
                });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Update a scoreboard entry for I Just Want To Play Tetris
// @route   PUT /api/v1/scoreboard/:id
exports.updateScore = asyncHandler(async (req, res, next) => {
  // look for id
  const found = true;

  if (found) {
    // update score
    res.json({ msg: 'score deleted' });
  } else {
    res.status(400).json({ msg: `No score with the id of ${req.params.id}` });
  }
});
