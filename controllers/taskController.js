
import ErrorHandler from '../middleware/error.js';
import {Task} from '../models/taskModel.js';
export const newTask = async  (req , res, next) => {
    try {
        const {title, description} = req.body;
    
    await Task.create({
        title, 
        description , 
        user: req.user
    });

    res.status(201).json({
        success : true,
        message : 'Task created successfully',

    });
    } catch (error) {
        next(error);
    }
}; 


export const getTask = async (req , res , next) => {

    try {
        // const {title, description} = req.body;
    const userID = req.user._id;

    const tasks = await Task.find({user : userID});

    res.status(200).json({
        success : true,
        tasks
    });
    } catch (error) {
        next(error);
    }


}
export const updateTask = async (req , res, next) => {
    
    try {
        const task = await Task.findById(req.params.id);
    
    if(!task) {
       return next(new ErrorHandler('id not found while updating task' , 404 )); 
    } 

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success : true,
        task,
        message : "task updated"
    });
    } catch (error) {
        next(error)
    }

}

// export const updateTask = async (req, res, next) => { // Add 'next' parameter here
//     try {
//         const task = await Task.findById(req.params.id);

//         if (!task) {
//             // If task is not found, throw an error
//             throw new Error("Task not found");
//         }

//         // Toggle the isCompleted field
//         task.isCompleted = !task.isCompleted;

//         // Save the updated task
//         await task.save();

//         // Send success response
//         res.status(200).json({
//             success: true,
//             task,
//             message: "Task updated"
//         });
//     } catch (error) {
//         // Pass the error to the error handling middleware
//         next(error);
//     }
// };


export const deleteTask = async (req ,  res , next) => {

    try {
        const task = await Task.findById(req.params.id);

    if(!task) {
        return next(new ErrorHandler("task not found while deleting task" , 404) );
    }

    await task.deleteOne();

    res.status(200).json({
        success : true,
        message : "task deleted"
    });
    } catch (error) {
        next(error);
    }

}