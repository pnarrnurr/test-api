const UsersController = require('../controllers/users');
const userSchemas = require('../schemas/users');
const authController = require('../controllers/auth');

exports.routes = [
    {
        method: 'GET',
        url: '/api/users/:id',
        schema: userSchemas.getUserSchema,
        preHandler: authController.authentication,
        handler: UsersController.get
    },
    {
        method: 'POST',
        url: '/api/users',
        schema: userSchemas.createUserSchema,
        preHandler: authController.authentication,
        handler: UsersController.create
    },
    {
        method: 'PUT',
        url: '/api/users/:id',
        schema: userSchemas.updateUserSchema,
        preHandler: authController.authentication,
        handler: UsersController.update
    },
    {
        method: 'DELETE',
        url: '/api/users/:id',
        schema: userSchemas.deleteUserSchema,
        preHandler: authController.authentication,
        handler: UsersController.deleteOne
    },
    {
        method: 'GET',
        url: '/api/users',
        schema: userSchemas.getAllUserSchema,
        preHandler: authController.authentication,
        handler: UsersController.getAll
    }
]