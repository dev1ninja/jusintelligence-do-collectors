const express = require("express");
const router = express.Router();

module.exports = (ambiente) => {
    router
        .route("/collect").post((req, res) => {
            console.log("this is post json: ", req.body);
            res.send(req.body)
            const producer = require("../config/kafka-producer")(req.body, ambiente);
            producer().catch((err) => {
                console.error("error in consumer: ", err)
            })
        });
    return router;
}