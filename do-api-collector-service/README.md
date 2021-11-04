### Notice: If you have an error to run docker, please use this command.
```
docker rmi $(docker images -q)
docker rm kafka-server1 $(docker ps -q)
```

####  1 - Execute Apache Kafka
This is the instructions to execute apache Kafka locally

2.1 Start kafka with this commands
```
docker network create kafka-net --driver bridge
docker run --name zookeeper-server -d -p 2181:2181 --network kafka-net -e ALLOW_ANONYMOUS_LOGIN=yes bitnami/zookeeper:latest
docker run --name kafka-server1 --network kafka-net -e ALLOW_PLAINTEXT_LISTENER=yes -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -d -p 9092:9092 bitnami/kafka:latest

```

2.2 Create a topic (ex: do_processor_ma_local) <!--If we send states, we need to create all topic based on states. In this, we just post only one states. {"search":"something","date_ini":"1995-10-28","date_end":"2021-08-26","states":["MA"]}-->
<br/>
Execute this command in terminal to create a topic:
```
docker exec -ti kafka-server1 \
  /opt/bitnami/kafka/bin/kafka-topics.sh --create \
  --zookeeper zookeeper-server:2181 \
  --replication-factor 1 \
  --partitions 1 \
  --topic do_processor_ma_local
```
<br/>

3 - Execute the project
Starting the project
```
npm start
```

3.1 To send messages to this api/collect, use this curl bash.
```
Post: 
curl -X POST http://localhost:3030/api/collect -H 'Content-Type: application/json' -d '{"search":"something","date_ini":"1995-10-28","date_end":"2021-08-26","states":["MA"]}'

```
