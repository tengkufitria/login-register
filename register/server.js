const Hapi = require('@hapi/hapi');
const authRoutes = require('./authentications/authRoutes'); // Impor rute autentikasi

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Register routes
    server.route(authRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
