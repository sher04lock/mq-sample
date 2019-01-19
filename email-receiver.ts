import * as amqp from "amqplib";
import { connectionString, exchangeName } from "./commons";


const QUEUE_NAME = "mails";
const EXCHANGE_TYPE = "fanout";

async function start() {
    let connection = await amqp.connect(connectionString);

    let channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, EXCHANGE_TYPE, { durable: false });

    let q = await channel.assertQueue(QUEUE_NAME);

    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    console.log(`binding queue ${q.queue} to exchange ${exchangeName}`);
    channel.bindQueue(q.queue, exchangeName, "");

    channel.consume(q.queue, msg => {
        if (msg === null) {
            console.log("null message :o");
            return;
        }

        channel.ack(msg);
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }, { noAck: false })
}

start();
