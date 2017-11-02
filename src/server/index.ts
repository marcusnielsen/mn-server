const listen = (port: number, handler, server) => server.listen(port, handler)

const onListen = port => serverInfo => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening on port ${port}`)
}

export default ({ config, server, amqp }) => {
  const { MN_SERVER_PORT } = config

  listen(MN_SERVER_PORT, onListen(MN_SERVER_PORT), server)
}
