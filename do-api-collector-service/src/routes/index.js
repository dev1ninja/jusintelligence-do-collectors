module.exports = (app, config, ambiente) => {
    app.get('/', function (req, res) { res.send('Microservice is working') });
    app.use("/api", require("../controller/api-controller")(config, ambiente));
};