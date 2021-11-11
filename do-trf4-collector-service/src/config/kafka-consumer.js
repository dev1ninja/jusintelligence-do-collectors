const { Kafka } = require("kafkajs")

module.exports = (config, callBackMethod, ambiente) => {

    console.log("This is config : ", config);

    const clientId = config.get("kafka.groupid");
    const brokers = [config.get("kafka.broker")];
    const topic = config.get("kafka.topic");
    const kafka = new Kafka({ clientId, brokers });
    let consumer;
    
    consumer = kafka.consumer({ groupId: clientId });
    console.log(`Your topic is : ${topic}`);

    const consume = async () => {
        await consumer.connect()
        await consumer.subscribe({ topic })
        await consumer.run({
            eachMessage: ({ message }) => {
                console.log(`received message: ${message.value}`)
                callBackMethod(config, message.value, ambiente)
            },
        })
    }
    return consume;
}