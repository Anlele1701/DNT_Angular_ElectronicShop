//
var khachHangModel=require('../models/khachHangModel')

//
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//
 var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'inyourzone14@gmail.com',
        pass:'tkwl aeze mrcx nbsy'
    },
    tls:{
        rejectUnauthorized:false
    }
 })



//
var verifyEmail=async(req)=>{
    try{
        const token=req.params.token
        const newToken=token.replace(/:/g,'')
        const user=await khachHangModel.findOne({emailToken:newToken})
        if(user){
            user.emailToken=null
            user.verified=true
            await user.save()
        }
    }
    catch(error){
        console.log(error)
    }
}

var dangKy=async(req)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(req.body.password,salt)

        const user=new khachHangModel({
            hoTen:req.body.name,
            email:req.body.email,
            sdt:req.body.sdt,
            matKhau:hashPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            verified:false
        })
        const newUser=await user.save()

        var mailOption={
            from:' "Verify your email" <inyourzone14@gmail.com>',
            to: user.email,
            subject: 'Zone14 - Please verify your email',
            html: `
                <h2>Hi ${user.hoTen}! Thanks for your registering to our site</h2>
                <h4>To continue registering, please verify your email with the link below...</h4>
                <a href="http://localhost:4200/verify-email/${user.emailToken}">Verify Your Email</a>
            `
        }

        transporter.sendMail(mailOption,(error,success)=>{
            if(error)
            {
                console.log(error)
            }
            else{
                console.log('A verify mail is sending to your email')
            }
        })
        return newUser
    }
    catch(error)
    {
        console.log(error)
    }
}


module.exports={dangKy,verifyEmail}