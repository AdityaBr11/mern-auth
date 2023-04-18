const express=require("express");
const env=require("dotenv");
const cors=require("cors")
const { connection } = require("./config/db");
const { router } = require("./routes/user.route");


env.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/user",router)
app.get("/",(req,res)=>{
    res.status(201).send({
        success:true,
        msg:"Working fine"
    })
})

app.listen(process.env.port||4500,async ()=>{
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at port ${process.env.port}`)
})