module.exports = (app, config) => {
    app.get('/', function (req, res) { res.send('Microservice is working') });
    app.use("/api", require("../controller/api-controller")(config));
};