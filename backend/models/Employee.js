const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salary:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
    });
  const Employee = mongoose.model('employee', employeeSchema);
  module.exports = Employee;