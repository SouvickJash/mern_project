const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:String
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        requiure:true
    },
    city:{
        type:String,
        require:true
    },
    pin:{
        type:Number,
        require:true
    },
})


//create token
userSchema.methods.generateAuthToken= async function(){
    try{
        const token= jwt.sign({_id : this._id},"mynameissouvickjashiamprogrammerandlearnlotsoftechnology");
        // this.token=this.token.concat({token:token});
        await this.save();
        return token;
  }
    catch(error){
        // res.send("The error part is"+error);
        console.log("The error part is"+error);
    }
  }

//bcrypt password
userSchema.pre("save",async function(next){ 
      
    if(this.isModified("password"))
    {
     this.password= await bcrypt.hash( this.password,10);
     console.log( this.password);
    }
 
     next();
 })


userSchema.set("timestamps", true);
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;