const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postAuthenticationsHandler,
  },
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUsersHandler,
    options: {
      auth: 'project-jwt'
    }
  },
];

module.exports = routes;
