const springCloudConfigClient = require("cloud-config-client");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;
let microserviceName = "do-processor-al";
let ambiente = process.env.AMBIENTE || "local";

springCloudConfigClient.load({
    endpoint: 'https://scc-dev.dataseed.de:443',
    name: microserviceName,
    auth: { user: "root", pass: "s3cr3t"},
    profiles: [ambiente] })
  .then(config => {
    require("./routes")(app, config);
    const consume = require("./config/kafka-consumer")(config, require("./listener/listener-search-url"), ambiente);
    console.log(consume);
    consume().catch((err) => {
        console.error("error in consumer: ", err)
    })
    // const consume = async () => require("./listener/listener-search-url")(config, '{"search": "OU", "date_ini": "2021-09-13", "date_end": "2021-09-14"}', ambiente)
    // consume();
    // app.listen(port, () =>
    //     console.log(`App working at http://localhost:${port}`)
    // );
  }).catch(console.error)