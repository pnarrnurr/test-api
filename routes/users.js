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
        handler: UsersController.update
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