const express = require("express");
const router = express.Router();

module.exports = (config) => {
    router
        .route("/collect").post((req, res) => {
            console.log("this is post json: ", req.body);
            res.send(req.body)
            const producer = require("../config/kafka-producer")(config, req.body);
            producer().catch((err) => {
                console.error("error in consumer: ", err)
            })
        });
    return router;
}