const authController = require('../controllers/auth');
const authSchemas = require('../schemas/auth');

exports.routes = [
    {
        method: 'POST',
        url: '/api/login',
        schema: authSchemas.userLoginSchema,
        handler: authController.login
    },
    {
        method: 'GET',
        url: '/api/logout',
        preHandler: authController.authentication,
        handler: authController.logout
    }
]