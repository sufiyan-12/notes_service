const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTES_API"

const auth = (req, res, next) =>{

    try{
        let token = req.headers.authorization;
        
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else{
            // no token available
            res.status(401).json({code: 401, message: "Unauthorized User"})
        }

        next();
    } catch(error){
        console.log(error)
        res.status(401).json({code: 401, message: "Unauthorized User"})
    }
}

module.exports = auth;