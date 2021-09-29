const { Kafka } = require("kafkajs")

module.exports = ( config, ambiente, sendJsonData ) => {

    const clientId = config.get("kafka.groupid")
    const brokers = [config.get("kafka.broker")]
    const topic = config.get("kafka.topic")
    const kafka = new Kafka({ ssl: true, clientId, brokers })

    const producer = async () => {
        const producer = kafka.producer()
        await producer.connect()
    
        await producer.send({
            topic: `do_processor_final_${ambiente}`,
            messages: sendJsonData,
        })
    }
    return producer;
}