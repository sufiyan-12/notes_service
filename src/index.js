const express = require("express")
const app = express()
const quotes = require("./quotes.json");
const userRouter = require("./routes/userRoutes");
const noteRoute = require("./routes/noteRoute");
const cors = require("cors")
require("dotenv").config();

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/note", noteRoute)

app.get("/", (req, res)=>{
    res.send("This is a root.")
});

const PORT = process.env.PORT || 5000;

if(process.env.MONGO_URL === undefined){
    const url = "mongodb+srv://msufiyan576:sufiyan1234@cluster0.b6e1x.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(url)
    .then(()=>{
        app.listen(PORT, ()=>{
        console.log("Server started on port no: 5000")
        });
    }).catch((error)=>{
        console.log(error);
    })
} else{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT, ()=>{
        console.log("Server started on port no: 5000")
        });
    }).catch((error)=>{
        console.log(error);
    })
}