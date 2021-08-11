require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers')
const {sequelize} = require('./models');

sequelize.sync({force: false,})
.then(()=>{console.log('DB 연결 성공')})
.catch(()=>{console.log('DB 연결 실패')})

app.use(bodyParser.urlencoded({extended:false,}));
app.use(cors());
app.use(bodyParser.json());


app.use('/', router)

app.listen(port,()=>{
    console.log('server start : 3000')
})


