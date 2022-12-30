const UsersController = require('../controllers/users');

exports.routes = [
    {
        method: 'GET',
        url: '/api/users/:id',
        handler: UsersController.get,
    },
    {
        method: 'POST',
        url: '/api/users',
        handler: UsersController.create
    },
    {
        method: 'PUT',
        url: '/api/users/:id',
        handler: UsersController.update,
        schema: {
            description: 'post some data',
            tags: ['user', 'code'],
            summary: 'qwerty',
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'user id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' }
                }
            },
            response: {
                201: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' }
                    }
                },
                default: {
                    description: 'Default response',
                    type: 'object',
                    properties: {
                        name: { type: 'string' }
                    }
                }
            },
            // security: [
            //     {
            //         "apiKey": []
            //     }
            // ]
        }
    },
    {
        method: 'DELETE',
        url: '/api/users/:id',
        handler: UsersController.deleteOne
    },
    {
        method: 'GET',
        url: '/api/users',
        handler: UsersController.getAll
    }
]