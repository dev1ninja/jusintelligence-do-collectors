const springCloudConfigClient = require('cloud-config-client');
const { Kafka, CompressionTypes, logLevel } = require("kafkajs");

module.exports = ( jsonData, ambiente ) => {

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
      }).then(async config => {
          const clientId = config.get("kafka.groupid");
          const brokers = [config.get("kafka.broker")];
          console.log("This is brokers...", brokers);
          const topic = config.get("kafka.topic");
          console.log("This is topic: \n", topic);
          const kafka = new Kafka({ clientId, brokers });
          const producer = kafka.producer();
          console.log("Calling producer connect...");
          await producer.connect();
          console.log("Producer Connect Ended...")
          await producer.send({
              topic: topic,
              messages: jsonData,
          })

        }).catch(console.error);
    }
  }
  return producer;
}