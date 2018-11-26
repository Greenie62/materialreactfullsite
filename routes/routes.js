const router=require("express").Router();
const orm=require('../orm/orm.js');

//logic placeholder variables
var newOrNot=""
var currentUser=""
var newItemName=""

router.get('/auth',(req,res)=>{
    console.log("pinged from /auth")
    res.send(false)
})

router.post('/login',(req,res)=>{
    currentUser=req.body.username
    console.log("login fired!")
     orm.checkUser(req.body.username,req.body.password,function(data){
         console.log(data)
         res.send(data)
         newOrNot=data
     })

})

router.get('/newornot',(req,res)=>{
    console.log(newOrNot)
    res.send(newOrNot)
})

router.post('/personalinfo',(req,res)=>{
    console.log(req.body)
    orm.updateProfile(currentUser,req.body.name,req.body.lastname,req.body.age,req.body.email,req.body.location,req.body.occupation,function(data){
        console.log(data)
    })
    res.end()
})

router.get('/getuserinfo',(req,res)=>{
    orm.currentUserInfo(currentUser,function(data){
        console.log("Back end data: " + data)
        res.send(data)
    })
})

router.post('/newitemname',(req,res)=>{
    console.log("newitemname pinged!")
    newItemName=req.body.itemname 
    console.log(newItemName)
    res.end()
})

router.get('/cancelitem',(req,res)=>{
    console.log("cancel pinged")
    newItemName=""
    res.end()
})

router.post('/newitem',(req,res)=>{
    console.log('newitem pinged!')
    var item={
        name:newItemName,
        quantity:req.body.quantity,
        price:req.body.price,
        image:req.body.image
    }
    console.log(item)
    orm.submitItem(currentUser,item.name,item.price,item.quantity,item.image,function(data){
        console.log(data)
    })
    res.end()
})


module.exports=router