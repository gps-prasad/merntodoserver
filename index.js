const express = require('express');
const Todo = require('./DatabaseModels/todo');
const cors = require('cors');
require('dotenv').config();
require('./connect')

app = express();
app.use(cors())
app.use(express.json());

// Todos

app.get('/',async (req,res)=>{
    try{
        const todos = await Todo.find({}).sort({createdAt:-1})
        res.status(200).json(todos)
        console.log('Todos....')
    }
    catch(err){
        console.log(err)
    }
})

// add todo
app.post('/add',async(req,res)=>{
    try{
    console.log('request recieved')
    const {todo} = req.body
    console.log(todo)
    newTodo = new Todo({todo:todo})
    await newTodo.save().then(()=>{
        console.log('Todo is saved....')
        res.send({message:'todo added succesfully',todo:newTodo})
    })}
    catch(err){
        res.send(err)
    }
})

// get todo

app.get('/get/:id',async(req,res)=>{
    try{
    const id = req.params.id
    const todo = await Todo.findById(id);
    res.send(todo);
    }
    catch(err){
        res.send(err)
    }
})

// update todo

app.post('/update/:id',async(req,res)=>{
    try{
    const id = req.params.id
    const {todo,isCompleted} = req.body
    await Todo.findByIdAndUpdate(id,{todo,isCompleted})
    console.log('todo updated')
    res.json({message:'todo updated'})
    }
    catch(err){
        res.send(err)
    }
})

// delete todo

app.post('/delete/:id',async(req,res)=>{
    try{
    const id = req.params.id
    await Todo.findByIdAndDelete(id).then(()=>console.log('todo deleted')).then(res.json({message:'todo deleted'}))
    }
    catch(err){
        res.send(err)
    }
})

app.listen(3001,(req,res)=>{
    console.log('server is running...')
})
