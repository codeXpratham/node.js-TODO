import express from 'express';
import mongoose from 'mongoose';


const schema = mongoose.Schema({
    title : {
        type :String,
        required : true,
    }, 
    description : {
        type : String,
        require : true,
        
    },
    isCompleted : {
        type : Boolean,
        default : false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    crearedAt : {
        type : Date,
        default : Date.now,
    }
 });    
 
 export const Task = mongoose.model('Task' , schema);

//  {
//     type : String,
//     unique : true,
//     require : true,
// },