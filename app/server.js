require('dotenv').config();

const express = require('express');
const router = require('./router');

const app = express();

const port = process.env.PORT || 5555;

// Middleware permettant d'envoyer et de recevoir du json dans les requêtes
app.use(express.json());

// Version 1 de l'API
app.use('/v1', router);

// Fonction permettant de lancer le serveur depuis ../index.js
app.launch = () => {
    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
}

module.exports = app;