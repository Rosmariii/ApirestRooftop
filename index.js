const express = require("express")
const app = express()
const dotenv = require("dotenv")

dotenv.config()
app.use(express.json());
app.use(isAdmin);


function isAdmin(req, res, next) {
    if (req.body.isAdmin) {
      next();
    } else {
      res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
    }
  }
  
  app.get('/dashboard', (req, res) => {
    res.send('You are an admin');
  });
  

app.listen(process.env.PORT)