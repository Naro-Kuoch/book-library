const user_model = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = (req,res)=>{
    console.log('req create user: ',req.body)
    
    bcrypt.genSalt(10).then(salt=>{
        bcrypt.hash(req.body.password, salt).then(hashed =>{
            const user = new user_model({
                username:req.body.username,
                password:hashed
            })
            user.save().then(result => {
                console.log(result)
                res.json(user)
            }).catch(err=>{console.log(err)})
        }).catch(err =>{
            console.log("hash error: ",err)
        })
    })
   
}
exports.login = async(req,res)=>{
    await user_model.find({username:req.body.username}).then(users =>{
        if(users){
            console.log("found users",users)
            bcrypt.compare(req.body.password, users[0].password).then(match =>{
                if(match){
                    console.log('login successed')
                    res.json({message:"login success",err:false})
                }else{
                    console.log('password not match')
                    res.json({message:"password not match",err:true})
                }
    
            }).catch(err=>{
                console.log("login error",err)
                res.json({message:"login fail",err:true})
            })
        }else{
            console.log("fail to login")
            res.json({message:"fail to login",err:true})
        }
    }).catch(err=>{
        console.log("somthing went wrong", err)
        res.json({message:"user not found, somthing went wrong",err:true})
    })

}