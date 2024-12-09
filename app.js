const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const  bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
const port =5500;
app.use(express.static(path.join(__dirname , 'public')));


mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongo is connected');
})

const Schema = mongoose.Schema;
const dataschema = new Schema({
    name:String,
    email:String,
    message:String,
});


const Data = mongoose.model('Data',dataschema);

app.post('/submit',(req,res)=>{
    const{name,email,message} = req.body;
    const newData = new Data({
        name,
        email,
        message,
    })
    newData.save();
    res.send('Data Submitted Successfully');
})

app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`);
})