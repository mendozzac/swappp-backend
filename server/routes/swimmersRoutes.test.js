require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const { initializeServer, app } = require("..");
const connectDB = require("../../database");
const Swimmer = require("../../database/models/swimmer");

const request = supertest(app);
let server;
const fakeSwimmers = [
  {
    _id: "619664f7a6781611df2a88d2",
    name: "Kelvin",
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
    _id: "61965fd7a6781611df2a88cf",
    name: "James",
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

beforeAll(async () => {
  await connectDB(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
  // await Swimmer.deleteMany();
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

beforeEach(async () => {
  await Swimmer.deleteMany();
  await Swimmer.create(fakeSwimmers);
});

describe("Given the '/nadadores' endpoint", () => {
  describe("When it recives a GET request", () => {
    test("Then it should send a response with a swimmers list", async () => {
      const { body } = await request.get("/nadadores");

      const fakeSwimmersWithId = fakeSwimmers.map((fakeSwimmer) => {
        const fakeSwimmerWithId = {
          ...fakeSwimmer,
          // eslint-disable-next-line no-underscore-dangle
          id: fakeSwimmer._id,
        };
        // eslint-disable-next-line no-underscore-dangle
        delete fakeSwimmerWithId._id;
        return fakeSwimmerWithId;
      });
      expect(body).toHaveLength(fakeSwimmersWithId.length);
    });
  });
});

describe("Given the '/registro' endpoint", () => {
  describe("When it receives a POST request", () => {
    test("Then it should send a response with the swimmers and status 201", async () => {
      const swimmer = {
        name: "Charles",
        surname: "Andrew",
        birthdate: "27/04/93",
        image: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
        height: 198,
        weight: 85,
        times: {
          distance: 100,
          style: "Braza",
          date: "20/03/20",
          time: "1:00.09",
          pool: 50,
        },
      };
      const { body } = await request
        .post("/registro")
        .send(swimmer)
        .expect(201);

      expect(body).toHaveProperty("name", "Charles");
    });
  });
});
