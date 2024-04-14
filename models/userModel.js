import express from 'express';
import mongoose from 'mongoose';


const schema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        unique : true,
        require : true,
    },
    password : {
        type : String,
        select : true,
        require : true,
    },
    crearedAt : {
        type : Date,
        default : Date.now,
        
    }
 });
 
 export const User = mongoose.model('User' , schema);