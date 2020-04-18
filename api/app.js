const restify = require('restify');
const morgan = require('morgan');

const apicache = require('apicache');
const redis = require('redis');

const registerRoutes = require('./routes/register');
const registrationConfirm = require('./routes/registration-confirm');


const server = restify.createServer({
    name: 'registration'
});

server.use(morgan('dev'));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.throttle({burst: 1000, rate: 50, ip: true}));


let cacheWithRedis = apicache.options({
    headers: {
        'cache-control': 'no-cache',
    },
    redisClient: redis.createClient(6379, process.env.REDIS_HOST)
}).middleware


server.post('/user/register',
    registerRoutes.post
);

server.get('/users',
    cacheWithRedis('1 day'),
    registerRoutes.get
);

server.get('/registration-confirm/:code',
    registrationConfirm.get
);


server.listen(5050, function () {
    console.log('%s listening at %s', server.name, server.url);
});


module.exports = server
