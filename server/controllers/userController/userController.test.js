require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../database/models/user");
const { userLogin } = require("./userController");

jest.mock("../../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given an userLogin function", () => {
  describe("When it receives a req with an incorrect username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const username = "Paul";
      const req = { body: { username } };
      User.findOne = jest.fn().mockResolvedValue(false);
      const res = {};
      const error = new Error("Usuario no encontrado");
      const next = jest.fn();

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a req with a correct username and an incorrect password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const req = {
        body: {
          username: "Paul",
          password: "mal",
        },
      };
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "Paul", password: "bien" });
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const res = {};
      const next = jest.fn();
      const error = new Error("Contraseña incorrecta");

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a req with a correct username and password", () => {
    test("Then it should invoke res.json with an object with a token", async () => {
      const req = { body: { username: "Paul", password: "bien" } };
      const res = { json: jest.fn() };
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "Paul", password: "bien" });
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedToken = "token";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);
      const expectedRes = { token: expectedToken };

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedRes);
    });
  });
});
