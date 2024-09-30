import {ApplicationConfig, FriendApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new FriendApplication(options);
  await app.boot(); 1
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url} / ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),  // Port is set from the environment variable
      host: process.env.HOST !== undefined ? process.env.HOST : '0.0.0.0',  // Host defaults to 0.0.0.0
      gracePeriodForClose: 5000,  // 5 seconds grace period for closing connections
      openApiSpec: {
        setServersFromRequest: true,  // OpenAPI settings
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
