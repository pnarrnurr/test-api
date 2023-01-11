const usersRoutes = require('./users');
const authRoutes = require('./auth');

exports.routes = [
    ...usersRoutes.routes,
    ...authRoutes.routes
];