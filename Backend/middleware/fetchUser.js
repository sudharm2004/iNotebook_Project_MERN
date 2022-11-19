var jwt = require('jsonwebtoken');
const JWT_SECRET='S@#h%^m'

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(400).send({error:"please authenticate using a valid token"})
    }
    try {
        //req.user is undefined because it is not present in request
        console.log('token', token)
        console.log('req.user',req.user);
        const data=jwt.verify(token,JWT_SECRET);
        //Setting user value in the request
        console.log('data',data);

        req.user=data.user;
        //req.user is defined because it is present in request
        console.log('req.user',req.user);
        next();
    } catch (error) {
     res.sendStatus(400)   
    }
}
module.exports=fetchuser;