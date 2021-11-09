const springCloudConfigClient = require('cloud-config-client');
const { Kafka } = require("kafkajs");

module.exports = ( jsonData, ambiente ) => {

  var sendMessage = async (config, jsonData) => {
    const clientId = config.get("kafka.groupid");
    const brokers = [config.get("kafka.broker")];
    const topic = config.get("kafka.topic");

    const kafka = new Kafka({ clientId, brokers });
    const producer = kafka.producer();
    
    await producer.connect();

    await producer.send({
        topic: topic,
        messages: [{key: topic, value: JSON.stringify(jsonData)}]
    })
    // await producer.disconnect();
  }

  const producer = async () => {
      
    const states = jsonData.states;

    delete jsonData.states;

    for(let i = 0; i < states.length; i++){
      let microserviceName = `do-processor-${states[i].toLowerCase()}`;
      springCloudConfigClient.load({
        endpoint: 'https://scc-dev.dataseed.de:443',
        name: microserviceName,
        auth: { user: "root", pass: "s3cr3t"},
        profiles: [ambiente] 
      }).then(config => {
        sendMessage(config, jsonData);
      }).catch(console.error);
    }
  }
  return producer;
}