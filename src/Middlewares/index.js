const jwt = require("jsonwebtoken")
const{check} = require("express-validator")
const {validationResult} = require("express-validator")

exports.verifyToken = (req,res,next) =>{
    try{
        const token = req.headers.authorization
        console.log(token);
        if(token){
            const data = jwt.verify(token,"MyAPPSECRET")
            const {id} =data;
            console.log(id);
            req.id = id;
            next();
        }else{
            return res.status(401).json({message:"Token is missing"})
        }
    } catch (err){
        return res.status(401).json({err})
    }
}



exports.validateForm =[
    check("name").notEmpty().withMessage("Please Enter Name"),
    check("phoneNumber").isMobilePhone().withMessage("Please Enter PhoneNumber"),
    check("email").isEmail().withMessage("Please Enter Valid Email"),
    check("intrest").notEmpty().withMessage("Please Enter Intrest"),
    check("message").isLength({max:100,min:1}).withMessage("Please Enter Message Within 100 chars")

]
   
exports.isValidated = (req,res,next) =>{
     const errors = validationResult(req)

     if(errors.array().length > 0){
       return res.status(400).json({message:errors.array()[0]})
     }
     next()
     
}