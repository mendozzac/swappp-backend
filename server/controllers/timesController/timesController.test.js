// const Swimmer = require("../../../database/models/swimmer");
const Time = require("../../../database/models/time");
const { updateTime } = require("./timesController");

// describe("Given a createTime controller", () => {
//   describe("When it receives an object res an object req with a body", () => {
//     test("Then it should invoke the json method", async () => {
//       const { idSwimmer } = "61ac95d6104ed79f6ed2cbe6";
//       const time = {
//         distance: 200,
//         style: "Espalda",
//         date: "22/09/19",
//         time: "1:56.09",
//         pool: 50,
//       };
//       const req = { body: time };
//       Time.create = jest.fn().mockResolvedValue(time);
//       Swimmer.findByIdAndUpdate = jest.fn(idSwimmer);
//       const res = { status: () => {}, json: jest.fn() };

//       await createTime(req, res);

//       expect(Time.create).toHaveBeenCalled();
//       expect(res.json).toHaveBeenCalledWith(time);
//     });
//   });
//   describe("When it receives an object res and a invalid object req", () => {
//     test("Then it should invoke next with an error", async () => {
//       const req = {};
//       const error = {};
//       Time.create = jest.fn().mockRejectedValue(error);
//       const res = { json: jest.fn() };
//       const next = jest.fn();

//       await createTime(req, res, next);

//       expect(next).toHaveBeenCalledWith(error);
//     });
//   });
// });

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
