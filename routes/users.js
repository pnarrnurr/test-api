const UsersController = require('../controllers/users');
const userSchemas = require('../schemas/users');

exports.routes = [
    {
        method: 'GET',
        url: '/api/users/:id',
        schema: userSchemas.getUserSchema,
        handler: UsersController.get
    },
    {
        method: 'POST',
        url: '/api/users',
        schema: userSchemas.createUserSchema,
        handler: UsersController.create
    },
    {
        method: 'PUT',
        url: '/api/users/:id',
        schema: userSchemas.updateUserSchema,
        handler: UsersController.update
    },
    {
        method: 'DELETE',
        url: '/api/users/:id',
        schema: userSchemas.deleteUserSchema,
        handler: UsersController.deleteOne
    },
    {
        method: 'GET',
        url: '/api/users',
        schema: userSchemas.getAllUserSchema,
        handler: UsersController.getAll
    }
]