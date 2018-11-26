const mongoose=require('mongoose');

const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },
    name:String,
    lastname:String,
    age:Number,
    email:String,
    location:String,
    occupation:String,
    quotes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quote"
        }
    ],
     items:[
         {
             type:Schema.Types.ObjectId,
             ref:"Item"
         }
     ],
     friends:Array,
     recievedLove:Array,
})

var User=mongoose.model("User",userSchema)

module.exports= User