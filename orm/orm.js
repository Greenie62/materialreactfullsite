const db=require("../models")


const orm={

      getUsers:function(cb){
          db.User.find().then(res=>{
              cb(res)
          })
      },

      addUser:function(username,password,cb){
          db.User.create({
              username:username,
              password:password,
          }).then(()=>cb("New user added!"))
      },

      checkUser:function(username,password,cb){
          //empty array to store retrieved usernames
          var userNames=[];
          // user DB request for all users, run a forEach iterator and
          //put all usernames into array
          db.User.find().then(res=>{
              res.forEach(person=>{
                  userNames.push(person.username)

              })
        //run a indexOf method to see if supplied username exists in DB
             if(userNames.indexOf(username) == -1){
        //if it doesnt exist, we add member
                 orm.addUser(username,password,function(data){
                     console.log(data)
                     cb("newuser")
                 })
             }
             //otherwise make another DB request to get settled on usernames password
             // run a check
             else{
                 db.User.findOne({username:username}).then(res=>{
                     if(res.password === password){
                         cb(true)
                     }
                     else{
                         cb(false)
                     }
                 })
             }
          })
      },

      updateProfile:function(username,name,lastname,age,email,location,occupation,cb){
          db.User.findOneAndUpdate({username:username},{$set:{
              name:name,
              lastname:lastname,
              age:age,
              email:email,
              location:location,
              occupation:occupation,
          }}).then(()=>{
              cb("Update a success!")
          })
      },

      currentUserInfo:function(username,cb){
          db.User.findOne({username:username}).then(data=>{
              cb(data)
          })
      },

      submitItem:function(username,name,price,quantity,image,cb){
          db.Item.create({
              username:username,
              name:name,
              price:price,
              quantity:quantity,
              image:image,
          }).then(itemData=>{
              db.User.findOneAndUpdate({username:username},{$push:{items:itemData._id}})
              .then(()=>{cb("Item inserted, user database updated!")})
          })
      }
}

module.exports=orm