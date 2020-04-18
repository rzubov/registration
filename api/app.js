const restify = require('restify');
const morgan = require('morgan');

const apicache = require('apicache');
const redis = require('redis');
const i18n = require("i18n");

i18n.configure({
    locales: ['en', 'ru'],
    directory: __dirname + '/locales'
});


const server = restify.createServer({
    name: 'registration'
});

const setLanguage = require(`./middlewares/setLanguage`);

server.use(i18n.init);
server.use(morgan('dev'));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.throttle({burst: 1000, rate: 50, ip: true}));
server.use(setLanguage);


let cacheWithRedis = apicache.options({
    headers: {
        'cache-control': 'no-cache',
    },
    redisClient: redis.createClient(6379, process.env.REDIS_HOST)
}).middleware


const registerRoutes = require('./routes/register');
const registrationConfirm = require('./routes/registration-confirm');


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
