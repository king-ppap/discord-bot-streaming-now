const run = async (client, message, args, slash = false) => {
  if (!slash) {
    message.channel.send(
      `> 🏓 Latency is ${Date.now() - message.createdTimestamp} ms.
      > Web socket is ${Math.round(client.ws.ping)} ms.`);
  } else {
    client.api.interactions(message.id, message.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `> Web socket is ${Math.round(client.ws.ping)} ms.`
        }
      }
    })
  }
}

export default {
  run,
  help: {
    name: "ping",
    description: "ก็แค่ปิงปองอยากเล่นอะดิ",
  },
}