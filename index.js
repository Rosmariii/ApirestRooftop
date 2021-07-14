const express = require("express")
const app = express()
const dotenv = require("dotenv")
var audit = require('express-requests-logger')

dotenv.config()

const accessTokenSecret="65a83e72c7e990a3e6565ae8b7cc071c";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token == accessTokenSecret) {
            return res.sendStatus(200).json({message:"authorized"})
        } else {

            return res.sendStatus(403).json({message:"unauthorized"})
        }
    } else {
        res.sendStatus(404).json({message:"error"});
    } next()
};

app.get('/', authenticateJWT, (req, res) => {
    res.send('holamundo');
});

app.use(audit({
    logger: logger,


app.listen(process.env.PORT)