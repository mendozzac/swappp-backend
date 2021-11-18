require("dotenv").config();
const { initializeServer } = require("./server");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

initializeServer(port);
