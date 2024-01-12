const express=require("express")
const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
const app=express()

app.use(express.static('static'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});



app.post("/validate",asyncHandler(async(req,res)=>{
    console.log(req.body, "-------")
    let accessToken;
    console.log(req.body);
    const {username,password}=req.body
    if(!username){
        res.send("Fill all details")
    }
    else{
                accessToken=jwt.sign({
                    user:{
                        username:username,
                        password:password
                    }
                },"process.env.secret")
    }
    jwt.verify(accessToken,"process.env.secret",(err,decode)=>{
        console.log("send",decode)
        res.json({accessToken:accessToken,name:decode.user.username})

    })
}))

app.post("/validate-token",(req,res)=>{
    const {token,name}=req.body;
    console.log(token+" "+name)
    jwt.verify(token,"process.env.secret",(err,decode)=>{
        if (err){
            res.json({res:"NO"})
        }
        else{
            if(decode.user.username==name){
                res.json({res:"YES"})
            }
            else{
                res.json({res:"NO"})
            }
        }
    })

})
app.post("/validate1-token",(req,res)=>{
    const c=req.body
    console.log(c)
})
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});