const run = async (client, message, args) => {
  console.log(Date.now());
  console.log(message.createdTimestamp);
  message.channel.send(

    `> 🏓 Latency is ${Date.now() - message.createdTimestamp} ms.
  > Web socket is ${Math.round(client.ws.ping)} ms.`);
}

export default {
  run,
  help: {
    name: "ping",
    description: "ก็แค่ปิงปองอยากเล่นอะดิ",
  },
}