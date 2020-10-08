require('dotenv').config();

const express = require('express');
const router = require('./router');
const cors = require('cors');
const expressSwagger = require('express-swagger-generator');

const app = express();
const swaggerGenerator = expressSwagger(app);

const port = process.env.PORT || 5555;

// Sert les fichiers statics
app.use( express.static(__dirname + '/../public') );

// * autorise n'importe qui à utiliser l'API
app.use(cors({
	origin: '*'
}));

// Middleware permettant d'envoyer et de recevoir du json dans les requêtes
app.use(express.json());

// Version 1 de l'API
app.use('/v1', router);

// On configure les options d'express-swagger-generator
let options = {
    swaggerDefinition: {
        info: {
            description: 'API permettant de gérer une collection de pops',
            title: 'Oh My Pop!',
            version: '1.0.0',
        },
        host: `localhost:${port}`,
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {}
    },
    basedir: __dirname, //app absolute path
    files: ['./router.js'] //Path to the API handle folder
};

// On génère la doc express-swagger
swaggerGenerator(options);

// Fonction permettant de lancer le serveur depuis ../index.js
app.launch = () => {
    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
}

module.exports = app;