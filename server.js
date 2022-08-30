const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true})) 
app.use(express.static(__dirname+'/public'));

const todolist = ["Milk","Vegitables","Fruits"]
const workList = []
app.get("/",(req,res)=>{
    let today = new Date();
    let options ={
        weekday:"long",
        day : "numeric",
        month : "long"
    }
    let day = today.toLocaleString("en-us",options);

    res.render('index',{listTitle:day,inputValue:todolist});
});

app.post("/",(req,res)=>{
   if(req.body.list==="Work-List"){
       workList.push(req.body.task)
       res.redirect("/work");
   }
   else{
    todolist.push(req.body.task);
    res.redirect("/")
   }
   
})
app.get("/work",(req,res)=>{
    res.render("index",{listTitle:"Work-List",inputValue:workList})
})


app.listen(process.env.PORT||7000)
