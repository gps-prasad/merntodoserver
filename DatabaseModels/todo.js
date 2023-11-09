const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Todo = mongoose.model('Todo',TodoSchema);

module.exports = Todo