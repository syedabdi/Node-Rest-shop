
const express = require('express');
var cors = require('cors')
const app = express();
const morgan = require('morgan');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(morgan('dev'));

mongoose.connect('mongodb://haiderofbme:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-1hoek.mongodb.net:27017,cluster0-shard-00-01-1hoek.mongodb.net:27017,cluster0-shard-00-02-1hoek.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
{
    useMongoClient:true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(cors);
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.method === 'OPTIONS'){
    res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
    return res.statusCode(200).json({});
    }
    next();
});

// app.use((req, res,next)=>{
// res.status(200).json({
//     message: 'It works!'
//   });
// });

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status =404; 
    next(error);
});

app.use((error,req,res,next)=>{
res.status(error.status || 500);
res.json({
    message:error.message
})
});
module.exports =app;