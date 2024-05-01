const dotenv = require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // To allow request to this backend from a frontend since backend and frontend are going to be deployed
// separately
app.use(express.json());

const mainRouter = require("./routes/index");

// All the requests that got to api/v1 will go to mainRouter that is in router/index.js
app.use("/api/v1", mainRouter);





app.listen(port, () => {
    console.log(`Server is running on ${port}...`);
})