const userModel = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.MONGO_URL

const signup = async (req, res) => {
    // existing user check
    // hashed password
    // user creation
    // token generation

    const {username, email, password} = req.body;
    try{
        
        const existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({code: 0, message: "User already exist."})
        }

        if(!(password === undefined || password == null)){
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const result = await userModel.create(
                {
                    username: username, 
                    password: hashedPassword,
                    email: email
                }
            )

            const token = jwt.sign({email:email, id: result._id}, SECRET_KEY)
            res.status(201).json({user: result, token: token})
        } else{
            console.log(password);
            res.status(401).json({message: "Invalid password."})
        }

    } catch(error){
        console.log(error)
        res.status(200).json({code: 400, message: "Something went wrong, please try again."});
    }
}

const signin = async (req, res) => {
    
    const {email, password} = req.body;
    try{
        
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({code: 0, message: "User not found."})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        
        if(!matchPassword){
            res.status(404).json({code: 404, message: "Invalid Credentials."})
        }

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, SECRET_KEY)
        res.status(200).json({user: existingUser, token: token});

    } catch(error){
        console.log(error)
        res.status(200).json({code: 400, message: "Something went wrong, please try again."});
    }
}

module.exports = {signup, signin};