const express = require("express")
const app = express()
const dotenv = require("dotenv")
const jwt = require('jsonwebtoken');

dotenv.config()

const accessTokenSecret="65a83e72c7e990a3e6565ae8b7cc071c";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        console.log(authHeader)
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/', authenticateJWT, (req, res) => {
    res.send('holamundo');
});

/*function isAdmin(req, res, next) {
    if (req.body.isAdmin) {
      next();
    } else {
      res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
    }
  }
  

  app.use(express.json());
  

  app.use(isAdmin);
  
  app.get('/dashboard', (req, res) => {
    res.send('You are an admin');
  });*/
  


app.listen(5000)