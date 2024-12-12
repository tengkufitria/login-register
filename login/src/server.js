const Hapi = require('@hapi/hapi')

const Jwt = require('@hapi/jwt');

const authentications = require('./api/authentications');
const TokenManager = require('./utils/TokenManager');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 8089,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    }
  ]);

  server.auth.strategy('project-jwt', 'jwt', {
    keys: 'process.env.ACCESS_TOKEN_KEY',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 1800,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        usersId: artifacts.decoded.payload.usersId,
        roleId: artifacts.decoded.payload.roleId,
      }
    }),
  });

  await server.register([
    {
      plugin: authentications,
      options: {
        tokenManager: TokenManager,
      },
      routes: {
        prefix: '/authentications'
      }
    }
  ]);

  await server.start();
  console.log(`server start at ${server.info.uri}`);
}

init();
