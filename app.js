//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Student = require('./models/Student');
const app = express();

//db connection
mongoose.connect('mongodb://localhost:27017/base')
mongoose.connection.on('connected', () => {
    console.log("database connected successfully")
})
mongoose.connection.on('error', () => {
    console.log("error occurred")
})

//middlewares
app.use(cors());
app.use(express.json());


//routes
app.get('/', (req, res) => {
    Student.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})

app.post('/student', (req, res) => {
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);

    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place
    });
    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({ msg: "Details Successfully Submitted" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error Occurred" });
        })
})

app.delete('/student/:id',(req,res)=>{
    const id=req.params.id;
    Student.remove({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            res.status(200).send('Error Occurred');
        }else{
            res.status(200).json({msg:"Successfully Deleted"});
        }
    })
})

app.put('/student/:id',(req,res)=>{
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const place=req.body.place;
    const id=req.params.id;
    Student.updateOne({_id:id},
        {$set:{firstname:firstname,lastname:lastname,place:place}})
        .then(result=>{
            console.log(result);
            res.status(200).json({msg:"Details successfully updated"});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({msg:"Error Occurred"});
        })
})

//server
app.listen(5000, () => {
    console.log("App listening at port 5000")
})