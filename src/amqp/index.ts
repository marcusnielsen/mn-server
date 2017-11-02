import * as amqplib from 'amqplib'

const exchanges = [
  { notifications: ['admin', 'user'] },
  { events: ['system', 'admin', 'user'] },
]

const q = 'hello'

const makeAmqp = config => {
  const amqp = amqplib
    .connect(config.MN_AMQP_CONNECTION)
    .then(conn => {
      process.once('SIGINT', () => {
        conn.close()
      })

      return conn.createChannel()
    })
    .then(channel => {
      channel.assertQueue(q, { durable: false })
      // Note: on Node 6 Buffer.from(msg) should be used
      channel.sendToQueue(q, Buffer.from('Hello World!'))
      // tslint:disable-next-line:no-console
      console.log("[x] Sent 'Hello World!'")
      return channel
    })
    .then(channel =>
      channel.consume(
        q,
        msg => {
          // tslint:disable-next-line:no-console
          console.log('[x] Received %s', msg ? msg.content : msg)
        },
        { noAck: true }
      )
    )
    // .then(channel => {
    //   Promise.all(
    //     Object.entries(exchanges).reduce(
    //       (acc, [exchange, types]) =>
    //         acc.concat(
    //           types.map(type =>
    //             channel.assertExchange(exchange, type, { durable: false })
    //           )
    //         ),
    //       []
    //     )
    //   ).then(() => channel);
    // })
    // .then(channel => {

    // })
    // .then(channel => {
    //   Promise.all(
    //     Object.entries(exchanges).reduce(
    //       (acc, [exchange, types]) =>
    //         acc.concat(
    //           types.map(type =>
    //             channel.assertExchange(exchange, type, { durable: false })
    //           )
    //         ),
    //       []
    //     )
    //   ).then(() => channel);
    // })
    // .then(channel => {

    // })
    .catch(console.error)
}

export default makeAmqp
