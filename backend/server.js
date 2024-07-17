const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const bodyparser = require('body-parser');
const port = 3306;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

 



        

app.listen(port,()=> console.log('server is running! '));



