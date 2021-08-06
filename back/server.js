const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers')
const {sequelize} = require('./models');

sequelize.sync({force:true})
.then(()=>{console.log('DB 연결 성공')})
.catch(()=>{console.log('DB 연결 실패')})

app.use(bodyParser.urlencoded({extended:false,}));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('asdf')
})

app.listen(3000,()=>{
    console.log('server start : 3000')
})


