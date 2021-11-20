const Swimmer = require("../../database/models/swimmer");
const { getSwimmers, createSwimmer } = require("./swimmersController");

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
