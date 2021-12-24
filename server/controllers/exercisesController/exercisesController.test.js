const Exercise = require("../../../database/models/exercise");
const { updateExercise } = require("./exercisesController");

describe("Given an updateExercise controller", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the json method of res and call the Exercise.findByIdAndUpdate", async () => {
      const req = { body: { id: 3 } };
      Exercise.findByIdAndUpdate = jest.fn();
      const res = { json: jest.fn() };
      const next = () => {};

      await updateExercise(req, res, next);

      expect(Exercise.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives an object res and invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};
      Exercise.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      const res = { json: jest.fn() };
      const next = jest.fn();

      await updateExercise(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
