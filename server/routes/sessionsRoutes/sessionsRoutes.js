const express = require("express");
const { validate } = require("express-validation");
const {
  getSessionById,
  getSessions,
  createSession,
  updateSession,
} = require("../../controllers/sessionsController/sessionsController");
const path = require("../../path/path");
const sessionSchema = require("../../schemas/sessionSchema");

const router = express.Router();

router.get(path.season, getSessions);

router.get(path.session, getSessionById);

router.post(path.newSession, validate(sessionSchema), createSession);

router.put(path.session, validate(sessionSchema), updateSession);

module.exports = router;
