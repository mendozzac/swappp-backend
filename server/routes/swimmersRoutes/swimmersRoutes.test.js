require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const { initializeServer, app } = require("../..");
const connectDB = require("../../../database");
const Swimmer = require("../../../database/models/swimmer");
const path = require("../../path/path");

const request = supertest(app);
let server;
const fakeSwimmers = [
  {
    _id: "619664f7a6781611df2a88d2",
    name: "Kelvin",
    surname: "Andrew",
    height: 196,
    weight: 85,
    times: [],
  },
  {
    _id: "61965fd7a6781611df2a88cf",
    name: "James",
    surname: "Campbell",
    height: 190,
    weight: 80,
    times: [],
  },
];

beforeAll(async () => {
  await connectDB(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await Swimmer.deleteMany();
  await Swimmer.create(fakeSwimmers);
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

describe("Given the swimmers endpoint", () => {
  describe("When it recives a GET request", () => {
    test("Then it should send a response with a swimmers list", async () => {
      const { body } = await request.get(path.swimmers);

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
