const { Kafka } = require("kafkajs")

module.exports = (config, callBackMethod) => {
    const clientId = config.get("kafka.groupid")
    const brokers = [config.get("kafka.broker")]
    const topic = config.get("kafka.topic")
    const kafka = new Kafka({ clientId, brokers })
    const consumer;
    
    if(!topic.includes("do_processor_ma_")){
        console.log("Sorry! Can't allow this topic")
        return;
    } else{
        consumer = kafka.consumer({ groupId: clientId })
        console.log(`Your topic is : ${topic}`);
    }

    const consume = async () => {
        await consumer.connect()
        await consumer.subscribe({ topic })
        await consumer.run({
            eachMessage: ({ message }) => {
                console.log(`received message: ${message.value}`)
                callBackMethod(message.value, config)
            },
        })
    }
    return consume
}