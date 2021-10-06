####  1 - Execute Apache Kafka
This is the instructions to execute apache Kafka locally

2.1 Start kafka with this commands
```
docker network create kafka-net --driver bridge
docker run --name zookeeper-server -d -p 2181:2181 --network kafka-net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
docker run --name kafka-server1 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -d -p 9092:9092 bitnami/kafka:latest

```


2.2 Create a topic (ex: topic_model_local)
<br/>
Execute this command in terminal to create a topic:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-topics.sh --create \
  --zookeeper zookeeper-server:2181 \
  --replication-factor 1 \
  --partitions 1 \
  --topic topic_model_local
```
<br/>

2.3 To send messages to this topic type this command in terminal:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-console-producer.sh \
  --request-required-acks 1 \
  --broker-list localhost:9092 \
  --topic topic_model_local
```
2.3.1 To send the message type a JSON like this in terminal:
```
{"id": "12345"}
```

Press Ctrl + C to go out.

2.3.2 To consume messages using terminal type this:
```
docker exec -ti kafka-server1 /opt/bitnami/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic topic_model_local \
  --from-beginning
```

2.3.3  Removing the topic:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-topics.sh --delete \
  --zookeeper zookeeper-server:2181 \
  --topic topic_model_local
```

####  2 - Execute the project
Starting the project:
```
npm start
```

```
Post
curl -X POST http://localhost:3030/api/collect -H 'Content-Type: application/json' -d '{"search":"something","date_ini":"1995-10-28","date_end":"2021-08-26","states":["MA"]}'

```
docker rmi $(docker images -q)
docker rm kafka-server1 $(docker ps -q)