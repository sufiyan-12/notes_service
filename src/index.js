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

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server started on port no: 5000")
    });
}).catch((error)=>{
    console.log(error);
})