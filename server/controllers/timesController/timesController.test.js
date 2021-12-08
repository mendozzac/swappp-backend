const Time = require("../../../database/models/time");
const { updateTime } = require("./timesController");

describe("Given an updateTime controller", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the json method of res and call the Time.findByIdAndUpdate", async () => {
      const req = { body: { id: 6 } };
      Time.findByIdAndUpdate = jest.fn();
      const res = { json: jest.fn() };
      const next = () => {};

      await updateTime(req, res, next);

      expect(Time.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an object res and invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};
      Time.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      const res = { json: jest.fn() };
      const next = jest.fn();

      await updateTime(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
