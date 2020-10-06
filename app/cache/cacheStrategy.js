const redis = require('redis');

const client = redis.createClient();

const buildKey = (url, params) => {
    return JSON.stringify({url, params});
}

const theKeys = [];

const cache = (req, res, next) => {
    const theKey = buildKey(req.originalUrl, req.params);
    theKeys.push(theKey);
    client.exists(theKey, (_, itExists) => {
        if (itExists) {
            client.get(theKey, (_, result) => {
                res.json(JSON.parse(result));
            });
        } else {
            const sendJson = res.json.bind(res);
            res.json = (result) => {
                client.setex(
                    theKey,
                    process.env.REDIS_EXPIRY || 30,
                    JSON.stringify(result),
                    _ => sendJson(result)
                );
            }
            next();
        }
    });
}

const flush = (req, res, next) => {
    client.del(theKeys, _ => {
        theKeys.length = 0;
        next();
    });
}

module.exports = { flush, cache }; 