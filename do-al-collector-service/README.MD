####  1 - Execute Apache Kafka
This is the instructions to execute apache Kafka locally

2 - Start kafka with this commands
```
docker network create kafka-net --driver bridge
docker run --name zookeeper-server -d -p 2181:2181 --network kafka-net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
docker run --name kafka-server1 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -d -p 9092:9092 bitnami/kafka:latest

```


3 - Create a topic "do_processor_al_local". (We will send msg via this topic at first and project will consume msg from this topic)
<br/>
Execute this command in terminal to create a topic:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-topics.sh --create \
  --zookeeper zookeeper-server:2181 \
  --replication-factor 1 \
  --partitions 1 \
  --topic do_processor_al_local
```
<br/>

4 - To send messages to this topic type this command in terminal:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-console-producer.sh \
  --request-required-acks 1 \
  --broker-list localhost:9092 \
  --topic do_processor_al_local
```

5 - Create a topic "do_processor_final_local".

6 - Execute the project
```
  npm start
```

7 - To send the message type a JSON like this in terminal: -> check step 4
```
{"search": "OU", "date_ini": "2021-09-13", "date_end": "2021-09-14"}
```

8 - Removing the topic:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-topics.sh --delete \
  --zookeeper zookeeper-server:2181 \
  --topic do_processor_al_local
```
