import * as amqp from "amqplib";
import { connectionString, exchangeName } from "./commons";
import moment = require('moment');

main();

let connection: amqp.Connection;
let channel: amqp.Channel;


async function main() {
    connection = await amqp.connect(connectionString);
    channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    listenForInput();
}

function printPrompt() { process.stdout.write("> ") };

function listenForInput() {
    console.log("Tell me what to send!");

    var stdin = process.openStdin();
    printPrompt();
    stdin.addListener("data", async data => {
        let msg = data.toString().trim();
        await publish(msg);
        printPrompt();
    });
}

async function publish(msg: any) {
    channel.publish(exchangeName, '', new Buffer(msg));
    console.log(`[x] Sent '${msg}'`);
}
