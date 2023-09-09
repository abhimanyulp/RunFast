const jwt = require("jsonwebtoken");

const auth = (req,res,next)=> {
    const token = req.headers.authorization

    if(token){
        const decoded = jwt.verify(token, process.env.PrivateKey)
        if(decoded){
            // console.log("auth working!")
            req.body.userID = decoded.userID
            next();
            
        } else {
            res.status(400).send({"msg":"Please login first"})
        }
    } else {
        res.status(400).send({"msg":"Please login first"})
    }

}

module.exports = {auth};