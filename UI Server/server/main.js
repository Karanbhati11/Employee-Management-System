const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.APP_PORT;

// middleware
app.use(express.static("public"));

// listening
app.listen(PORT, function () {
    console.log(`App started on port http://localhost:${PORT}`);
});
