const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type:String, trim: true, required: true, minLength:3
    },
    _listId:{
        type:mongoose.Types.ObjectId, required: true
    },
    completed:{
        type: Boolean, required: true, default: false
    }
});

const Tasks = mongoose.model('Task', taskSchema);
module.exports = Tasks;