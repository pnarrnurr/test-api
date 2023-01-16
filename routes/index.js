const usersRoutes = require('./users');
const authRoutes = require('./auth');

exports.routes = [
    ...usersRoutes.routes,
    ...authRoutes.routes,
    {
        method: 'GET',
        url: '/websocket',
        handler: () => {
            console.log("heep request")
        },
        wsHandler: (conn, req) => {
            console.log(req)
            console.log("ws request");
            conn.socket.on('message', message => {
                conn.socket.send('hi')
            })
        }
    },
];
