const { Kafka } = require("kafkajs")

module.exports = (config, callBackMethod, ambiente) => {

    console.log("This is config : ", config);

    const clientId = config.get("kafka.groupid")
    const brokers = [config.get("kafka.broker")]
    // const topic = config.get("kafka.topic")
    const topic = 'do_processor_ma_local';
    const kafka = new Kafka({ clientId, brokers })
    let consumer;
    
    if(topic == `do_processor_ma_${ambiente}`){
        console.log("Sorry! Can't allow this topic : ", topic)
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
                callBackMethod(config, message.value, ambiente)
            },
        })
    }
    return consume;
}