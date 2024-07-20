const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username :
        {
            type : String,
            required : [true, "Please provide Username"]
        },

        password : 
        {
            type : String,
            required : [true, "Please provide Password"]
        },

        email : 
        {
            type : String,
            required : [true, 'Please Provide a email'],
            match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
            unique : true
        }
    }
)


module.exports = mongoose.model('User', userSchema)