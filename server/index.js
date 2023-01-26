require("dotenv").config();
const express = require("express");
const app = express();

//Database connection
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://TCD_ASE_Group8_2023:0hEBbOQQUvwFuhIZ@clusterdsw1.9iyylds.mongodb.net/?retryWrites=true&w=majority")

//database-name = MyDSW-DB
//tables = [users, ..]

//to process json data
const bodyParser=require("body-parser")
app.use(bodyParser.json())

//for authentication 
const authentication=require("./routes/authentication")
app.use("",authentication)




//check point
app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server runs!");
    console.log(`Server started on port: ${process.env.PORT}`);
});
