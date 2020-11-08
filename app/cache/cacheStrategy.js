const redis = require('redis');

let cache;
let flush;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    const client = redis.createClient({
        auth_pass: process.env.REDIS_PASSWORD
    });

    const buildKey = (url, params) => {
        return JSON.stringify({url, params});
    }

    const theKeys = [];

    cache = (req, res, next) => {
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

    flush = (req, res, next) => {
        client.del(theKeys, _ => {
            theKeys.length = 0;
            next();
        });
    }
} else {
    cache = (req, res, next) => {
        next();
    }
    flush = (req, res, next) => {
        next();
    }
}


module.exports = { flush, cache }; 