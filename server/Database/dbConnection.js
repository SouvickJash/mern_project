const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/MyProjectSelf")
.then(()=>console.log("Connection Successfully")
)
.catch((err)=>console.log(err))