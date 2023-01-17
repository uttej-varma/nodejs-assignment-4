const express = require('express')
const bodyParser=require("body-parser")
const app = express()
app.set("views","./views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }));
let arr=[];
let ans={};
app.get('/', function (req, res) {
  res.render('mainpage.ejs')
})
app.get("/calculate",(req,res)=>{
    res.render("post.ejs")
})
app.post("/info",(req,res)=>{
    arr[0]={
      input1:req.body.num1,
      input2:req.body.num2,
    }
    res.redirect("/");
  
})
function addSub(finalSum,type){
  switch(type){
    case "sum":
      finalSum=parseFloat(arr[0].input1)+parseFloat(arr[0].input2);
      break;
    case "difference":
      finalSum=parseFloat(arr[0].input1)-parseFloat(arr[0].input2); 
      break;
    case "multiplication":
      finalSum=parseFloat(arr[0].input1)*parseFloat(arr[0].input2); 
      break;
    case "division":
      finalSum=parseFloat(arr[0].input1)/parseFloat(arr[0].input2);
      break;
  }
  if(finalSum===Infinity)
  {
    ans={
      status:"error",
      message:"Cannot divide a number by 0",
      ans:"undefined"
    }
  }
  
  else if(finalSum>1000000 || (parseFloat(arr[0].input1)>1000000 || parseFloat(arr[0].input2)>1000000 ))
  {
    ans={
      status:"error",
      message:"overflow",
      ans:"out of range"
    }
  }
  else if(finalSum<-1000000 || (parseFloat(arr[0].input1)<-1000000 || parseFloat(arr[0].input2)<-1000000 ))
  {
    ans={
      status:"error",
      message:"underflow",
      ans:"out of range"
    }
  }
  else{
    ans={
      status:"success",
      message: `the ${type} of given numbers is`,
      ans:finalSum
  }
}

}
function reg(arr){
  const regex=/[^0-9\.]/g;
  if(regex.test((arr[0].input1)) || regex.test((arr[0].input2)))
  {
    ans={
      status:"error",
      message:"input is of string type",
      ans:"NAN"
    }
    return true;
  }
  return false;
}
app.get("/add",(req,res)=>{
  
 if(reg(arr)){
  res.render("message.ejs",{object:ans});
 }
  else
  {
    addSub(0,"sum");
    res.render("message.ejs",{object:ans});
    
 }
})
app.get("/sub",(req,res)=>{
  if(reg(arr)){
    res.render("message.ejs",{object:ans});
   }
    else
    {
      addSub(0,"difference");
      res.render("message.ejs",{object:ans}); 
   }   
})
app.get("/multiply",(req,res)=>{
  if(reg(arr)){
    res.render("message.ejs",{object:ans});
   }
    else
    {
      addSub(0,"multiplication");
      res.render("message.ejs",{object:ans}); 
   }
})
app.get("/division",(req,res)=>{
  if(reg(arr)){
    res.render("message.ejs",{object:ans});
  }
  else
  {
      addSub(0,"division");
      res.render("message.ejs",{object:ans}); 
 
  }
})
app.get("*",(req,res)=>{
  res.status(404).send("page not found");
})
app.listen(3002,()=>{console.log("server is up at 3002")});