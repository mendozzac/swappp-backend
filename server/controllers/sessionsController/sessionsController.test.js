const Session = require("../../../database/models/session");
const {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
} = require("./sessionsController");

jest.mock("../../../database/models/session");

describe("Given a getSession controller", () => {
  describe("When it receives an object ress", () => {
    test("Then it should invoke the json method", async () => {
      const sessions = [
        {
          date: "11-03-20",
          exercises: [{ meters: 400, description: "nado con palas" }],
        },
        {
          date: "11-03-21",
          exercises: [{ meters: 200, description: "nado con palas" }],
        },
      ];
      Session.find = jest.fn().mockResolvedValue(sessions);
      const res = { json: jest.fn() };

      await getSessions(null, res);

      expect(res.json).toHaveBeenCalledWith(sessions);
    });
  });
});

describe("Given a getSessionById controller", () => {
  describe("When it receives a request with an id 8, a res object and a next function", () => {
    test("Then it should invoke Session.findById with a 8", async () => {
      Session.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue({}) });
      const idSession = 8;
      const req = { params: { idSession } };
      const res = { json: () => {} };
      const next = () => {};

      await getSessionById(req, res, next);

      expect(Session.findById).toHaveBeenCalledWith(idSession);
    });
  });
  describe("And Session.findById returns undefined", () => {
    test("Then it should invoke next function with an error", async () => {
      const error = new Error("No se encuentra el entrenamiento");
      Session.findById = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(undefined) });
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();

      await getSessionById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createSession controller", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the json method", async () => {
      const session = {
        date: "",
        exercises: [{ meters: 800, description: "nado con palas" }],
      };
      const req = { body: session };
      Session.create = jest.fn().mockResolvedValue(session);
      const res = {
        status: () => {},
        json: jest.fn(),
      };

      await createSession(req, res);

      expect(Session.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(session);
    });
  });
  describe("When it receives and object res and a invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};
      Session.create = jest.fn().mockRejectedValue(error);
      const res = { json: jest.fn() };
      const next = jest.fn();

      await createSession(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given an updateSession controller", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the json method of res and call the Session.findByIdAndUpdate", async () => {
      const req = { body: { id: 3 } };
      Session.findByIdAndUpdate = jest.fn();
      const res = { json: jest.fn() };
      const next = () => {};

      await updateSession(req, res, next);

      expect(Session.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an object res and an invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};
      Session.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      const res = { json: jest.fn() };
      const next = jest.fn();

      await updateSession(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
