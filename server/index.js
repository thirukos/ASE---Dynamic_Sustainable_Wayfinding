require("dotenv").config();
const express = require("express");
const app = express();

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