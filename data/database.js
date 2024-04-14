import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI , {
    dbname : "newbackend",
})
.then((c) => {console.log(`DB Connected ${c.connection.host}`)} )
.catch((e) => {console.log(e)})
;
};
