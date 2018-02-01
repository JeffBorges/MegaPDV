let server = require('http');
let router = require('router');
let auth   = require('authentication');

let routers = require('./common/router/routers');
let middleware = require('./common/router/middleware');

middleware.registerMiddleware(router, auth);
routers.registerRouter(router);

server.createServer(8778, router);
