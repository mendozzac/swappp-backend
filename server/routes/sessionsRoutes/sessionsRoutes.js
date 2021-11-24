const express = require("express");
const {
  getSessionById,
  getSessions,
  createSession,
  updateSession,
} = require("../../controllers/sessionsController/sessionsController");
const path = require("../../path/path");

const router = express.Router();

router.get(path.season, getSessions);

router.get(path.session, getSessionById);

router.post(path.newSession, createSession);

router.put(path.session, updateSession);

module.exports = router;
