const express = require("express");
const configureDB = require("./config/database");
const app = express();
const routes = require("./config/routes");
const cors = require("cors");
const port = 3876;

configureDB();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log("Server running on port ", port);
});
