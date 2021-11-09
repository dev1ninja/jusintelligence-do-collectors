const { Kafka } = require("kafkajs");
const springCloudConfigClient = require("cloud-config-client");

module.exports = ( ambiente, sendJsonData ) => {

    var makeMessage = (jsonData) => {
        var newMsg = [];
        for(let i = 0; i < jsonData.length; i++){
            newMsg.push({key: `key${i}`, value: JSON.stringify(jsonData[i])});
        }
        console.log("New Msg-\n", newMsg);
        return newMsg;
    }

    var sendMessage = async (config, jsonData) => {
        const clientId = config.get("kafka.groupid");
        const brokers = [config.get("kafka.broker")];
        const topic = config.get("kafka.topic");

        const kafka = new Kafka({ clientId, brokers });
        const producer = kafka.producer();
        
        await producer.connect();

        await producer.send({
            topic: topic,
            messages: makeMessage(jsonData)
        })
        // await producer.disconnect();
    }

    const producer = async () => {

        let microserviceName = `do-processor-final`;
        springCloudConfigClient.load({
            endpoint: 'https://scc-dev.dataseed.de:443',
            name: microserviceName,
            auth: { user: "root", pass: "s3cr3t"},
            profiles: [ambiente]
        }).then(config => {
            sendMessage(config, sendJsonData);
        }).catch(console.error);
    }
    return producer;
}