const user_model = require('../models/user');
const bcrypt = require('bcrypt');
exports.renderSignIn = (req,res)=>{
        res.render('signIn')
}
exports.renderSignUp = (req,res)=>{
    res.render('signUp')
}
exports.createUser = async(req,res)=>{
    console.log('req create user: ',req.body)
    console.log("req username",req.body.username)

    users = await user_model.find({username:req.body.username});
    console.log("got users",users)
    if(users.length !=0){
        console.log("existing users",users)
        res.json({err:true})
    }else{
        bcrypt.genSalt(10).then(salt=>{
            bcrypt.hash(req.body.password, salt).then(hashed =>{
                const user = new user_model({
                    username:req.body.username,
                    password:hashed
                })
                user.save().then(result => {
                    console.log(result)
                    res.json({err:false})
                }).catch(err=>{console.log(err)})
            }).catch(err =>{
                console.log("hash error: ",err)
                res.redirect("/")
            })
        })
    }
    

   
}
exports.login = async(req,res)=>{
    await user_model.find({username:req.body.username}).then(users =>{
        if(users){
            console.log("found users",users)
            console.log("req body", req.body)
            bcrypt.compare(req.body.password, users[0].password).then(match =>{
                if(match){
                    console.log('login successed')
                    res.cookie('userId',users[0]._id,{
                        maxAge:3600*1000 ,//1h
                        httpOnly:true
                    })
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
        res.json({message:"User not found",err:true})
    })

}
exports.getUserByName = async(req,res)=>{
    console.log("req username",req.params.username)
    users = await user_model.find({username:req.params.username});
    console.log("got users",users)
    if(users != null){
        res.json(users[0])
    }else{
        res.json({user:null})
    }
}