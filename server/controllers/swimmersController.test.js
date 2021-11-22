const Swimmer = require("../../database/models/swimmer");
const {
  getSwimmers,
  createSwimmer,
  getSwimmerById,
} = require("./swimmersController");

jest.mock("../../database/models/swimmer");

describe("Given a getSwimmers function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the json method", async () => {
      const swimmers = [
        {
          name: "Kevin",
          surname: "Andrew",
          image: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
          birthdate: "27/04/93",
          height: 196,
          weight: 85,
          times: {
            distance: 100,
            style: "Mariposa",
            date: "20/03/20",
            time: "52.09",
            pool: 50,
          },
        },
        {
          name: "Geofrey",
          surname: "Campbell",
          image: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
          birthdate: "11/08/90",
          height: 190,
          weight: 80,
          times: {
            distance: 200,
            style: "Espalda",
            date: "22/09/19",
            time: "1:56.09",
            pool: 50,
          },
        },
      ];
      Swimmer.find = jest.fn().mockResolvedValue(swimmers);
      const res = {
        json: jest.fn(),
      };

      await getSwimmers(null, res);

      expect(res.json).toHaveBeenCalledWith(swimmers);
    });
  });
});

describe("Given a getSwimmerById function", () => {
  describe("When it receives a request with an id 9, a res object and a next function", () => {
    test("Then it should invoke Swimmer.findById with a 9", async () => {
      Swimmer.findById = jest.fn().mockResolvedValue({});
      const idSwimmer = 9;
      const req = {
        params: {
          idSwimmer,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getSwimmerById(req, res, next);

      expect(Swimmer.findById).toHaveBeenCalledWith(idSwimmer);
    });
  });
  describe("And Swimmer.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Swimmer.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getSwimmerById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("And Swimmer.findById returns undefined", () => {
    test("Then it should invoke next function with an error", async () => {
      const error = new Error("No se encuentra el nadador");
      Swimmer.findById = jest.fn().mockResolvedValue(undefined);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getSwimmerById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createSwimmer function", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the json method", async () => {
      const swimmer = {
        name: "Geofrey",
        surname: "Campbell",
        image: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
        birthdate: "11/08/90",
        height: 190,
        weight: 80,
        times: {
          distance: 200,
          style: "Espalda",
          date: "22/09/19",
          time: "1:56.09",
          pool: 50,
        },
      };
      const req = {
        body: swimmer,
      };

      Swimmer.create = jest.fn().mockResolvedValue(swimmer);
      const res = {
        status: () => {},
        json: jest.fn(),
      };

      await createSwimmer(req, res);

      expect(Swimmer.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(swimmer);
    });
  });
});
