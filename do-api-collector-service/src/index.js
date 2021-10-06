const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3030;
let ambiente = process.env.AMBIENTE || "local";

require("./routes")(app, ambiente);
app.listen(port, () =>
    console.log(`App working at http://localhost:${port}`)
);