const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt  = require("jsonwebtoken");
const user = require('../models/user');
const JWT_SECRET_KEY = "My key";
const signup =  async(req,res,next)=>{
    const {name,email,password}=req.body; 
    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    }
    catch (err){
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User already exists! Login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashedPassword
    });
    try{
        await user.save();
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({message:user})
} 

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email:email});
    }catch(err){
        return new Error(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"User not found.signup please"})
    }
    const isCorrectPassword=bcrypt.compareSync(password,existingUser.password);
    if(!isCorrectPassword){
        return res.status(400).json({message:"Invalid Email / password"});
    }
     const token = jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{
         expiresIn:"35s"
     })
      if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

     res.cookie(String(existingUser._id),token,{
         path:'/',
         expires:new Date(Date.now() +1000*30),
         httpOnly:true,
         sameSite:'lax'
     })
    return res.status(200).json({message:'Sucessfully LogedIn' ,user:existingUser,token})
}
const verifytoken = (req,res,next)=>{
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    // const headers = req.headers['authorization'];
    // const token = headers.split(" ")[1];
    if(!token){
        return res.status(404).json({message:"Invalid Token"});
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(404).json({message:"Invalid Token"})
        }
        console.log(user.id)
        req.id=user.id
    });
    next();
};

const getUser=async(req,res,next)=>{
const userId = req.id;
let user;
try{
    user = await User.findById(userId,"-password");
}catch(err){
    return new Error(err)
}
if(!user){
    return res.status(404).json({message:"User Not FOUND"})
}
return res.status(200).json({user})

}
const refreshToken=(req,res,next)=>{
    const cookies = req.headers.cookie;
    const prevtoken  = cookies.split("=")[1];
    if(!prevtoken){
        return res.status(400).json({message:"Couldn't find token"})
    }
    jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err);
            return res.status(403).json({message:'Authentication Failed'})
        }
        res.clearCookie('${user.id}');
        req.cookies['${user.id}'] = "";

        const token = jwt.sign({id:user.id},JWT_SECRET_KEY,{
            expiresIn:"35s"
        })
            console.log("Regenerated Token\n", token);
         res.cookie(String(user.id),token,{
         path:'/',
         expires:new Date(Date.now() +1000*30),
         httpOnly:true,
         sameSite:'lax'
     });
     req.id=user.id;
     next();
    })
}
exports.signup = signup;
exports.login = login;
exports.verifytoken = verifytoken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
