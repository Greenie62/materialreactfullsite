const mongoose=require('mongoose');

const Schema=mongoose.Schema

var quoteSchema=new Schema({
    quote:String
})

var Quote=mongoose.model("Quote",quoteSchema)

module.exports=Quote