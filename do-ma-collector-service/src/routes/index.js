module.exports = (app, config) => {
    app.get('/', function (req, res) { res.send('Microservice is working') })
    app.use("/api/model", require("../controller/model-controller")(config));
};