export default ({ config, server }: { config: any; server: any }) => {
  const onListen = () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${config.MN_SERVER_PORT}`);
  };

  server.listen(config.MN_SERVER_PORT, onListen);
};
