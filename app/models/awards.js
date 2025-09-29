import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
    {
    title : {type : String, required : true},
    description : {type : String, required : true},
    date : {type : Date, required : true},
    image : {type : String},
},
{ timestamps: true }
);

export default mongoose.model("Awards", awardSchema);