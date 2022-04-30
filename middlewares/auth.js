import {config} from 'dotenv';
config({path: './.env'});
import jwt from 'jsonwebtoken';
const { verify } = jwt;

function auth(req,res,next){
    const token = req.header('Authorization')
    //console.log('Token......',token.split('Bearer ')[1])
    if(!token) return res.status(401).json({ status:"error", message:"Please login first" })
    try {
        const decoded = verify(token.split('Bearer ')[1], process.env.JWT_KEY)
        //add user to the request body
        req.body.user = decoded
        next()
    } catch (err) {
       return  res.status(400).json({status:"error", message:'invalid token'})
    }
}

export default auth