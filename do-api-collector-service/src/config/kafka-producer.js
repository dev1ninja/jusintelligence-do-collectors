const { Kafka } = require("kafkajs")

module.exports = ( config, jsonData ) => {

    const clientId = config.get("kafka.groupid")
    const brokers = [config.get("kafka.broker")]
    const topic = config.get("kafka.topic")
    const kafka = new Kafka({ ssl: true, clientId, brokers })

    const producer = async () => {
        const producer = kafka.producer()
        await producer.connect()
    
        const states = jsonData.states;

        delete jsonData.states;

        //Getting the env from topic
        const topic_env = topic.split('_');
        const env = topic_env[topic_env.length - 1];
    
        const topicMessages = [];
        states.forEach((elem) => {
            topicMessages.push({
                topic: "do_processor_" + elem.toLowerCase() + "_" + env,
                messages: jsonData,
            })
        })
        console.log("This is jsonData : ", topicMessages)
        await producer.sendBatch({ topicMessages })
    }
    return producer;
}