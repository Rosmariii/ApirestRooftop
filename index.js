const express = require("express")
const app = express()
const dotenv = require("dotenv")
const fs = require('fs')

dotenv.config()

const accessTokenSecret="65a83e72c7e990a3e6565ae8b7cc071c";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log('a')
        const token = authHeader.split(' ')[1];

        if (token == accessTokenSecret) {
           
             res.status(200).json({message:"authorized"})       
        } else {
           
             res.status(403).json({message:"unauthorized"})      
        }
    } else {   
         return res.status(404).json({message:"error"});    
    }
   
    next()
};

const log = (req, res, next) => {
    
    let date = new Date()
    let titulo = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    let horas = date.getHours().toString().padStart(2, '0')
    let minutos = date.getMinutes().toString().padStart(2, '0')
    let segundos = date.getSeconds().toString().padStart(2, '0')

    let hora_evento = `${date.getFullYear()}`
    let {ip, url, method} = req
    
    fs.appendFile(`${titulo}.log`, `${ip}, ${titulo} ${horas}:${minutos}:${segundos}, ${method}, ${url}\n`, (error) => {
        if (error) {
            throw error; 
        }
    })
    next()
}

app.use(log)

app.get('/', authenticateJWT, (req, res) => {
    res.send('holamundo');
});

app.listen(process.env.PORT)