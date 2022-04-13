import {config} from 'dotenv';
config({path: './.env'});
import jwt from 'jsonwebtoken';
const { verify } = jwt;

function auth(req,res,next){
    const token = req.header('Authorization')
    //console.log('Token......',token.split('Bearer ')[1])
    if(!token) return res.send({ status:"error", message:"Please login first" }).status(401)
    try {
        const decoded = verify(token.split('Bearer ')[1], process.env.JWT_KEY)
        //add user to the request body
        req.user = decoded
        next()
    } catch (err) {
       return  res.send({status:"error", message:'invalid token'}).status(400)
    }
}

export default auth