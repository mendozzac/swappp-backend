const Swimmer = require("../../database/models/swimmer");
const getSwimmers = require("./swimmersController");

describe("Given a getSwimmers function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the json method", async () => {
      const swimmers = [
        {
          name: "Kevin",
          surname: "Andrew",
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
      const res = {
        json: jest.fn(),
      };
      Swimmer.find = jest.fn().mockResolvedValue(swimmers);

      await getSwimmers(null, res);

      expect(res.json).toHaveBeenCalledWith(swimmers);
    });
  });
});
