require('./index');
const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const os = require('os');
const jwt=require('jsonwebtoken')
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const { mongoUrl } = require('./mongoUrl');


// users = [];

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });


mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});


const User = mongoose.model("users");
const active_tokens = mongoose.model("active_tokens");
const inventory = mongoose.model("inventory");
const categories = mongoose.model("category");
const orders = mongoose.model("orders");

app.get('/getorder',async(req,res)=>{
    if ( req.query.username ){

        const data = await orders.findOne({ "username": req.query.username });
        res.json(data);
    }
})

app.post('/signup', async ( req, res ) => {

    if( req.headers.username && req.headers.password ){
        
        const {username,password} = req.headers;
        const user12=await User.find({username});
    
        if( user12.length == 0 ){
            salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash( password,salt );
            console.log ( `hashed password here:  ${hashed}` );
            const user = new User({username: username, password: hashed});
            user.save();
            res.json( { status: "success" } );
        }
        
        else{
            res.json({ status: "user exists" });
            
        }
    }

    else{
        res.json({status : "missing"})
    }
});

app.post('/users/login', async ( req, res ) => {
    
    if( req.headers.username && req.headers.password ){
            const data = await User.find({username: req.headers.username});
            console.log(data);
        if( data[0] ){
            console.log("USERNAME: " + data[0].username);
            const { username, password } =  data[0];
            
                if( await bcrypt.compare( req.headers.password, password )){
                    if(!req.headers.token){
                        const token = await jwt.sign(username, process.env.my_secret_key);
                        const user1 = { status:'success', access: token }
                        const getUser = await active_tokens.find({ username: username });
                        if ( getUser.length > 0 ){
                            const activeDevices = getUser[0].devices;

                            // accessing last item
                            const deviceId = activeDevices[activeDevices.length - 1];
                            // console.log(deviceId);
                            // activeDevices.push(deviceId + 1);
                            // console.log(activeDevices);
                            const update = await active_tokens.updateOne({username:username, token:token}, { $push: { devices: deviceId + 1 } });
                            if ( update ) res.json({token: token, deviceId: deviceId + 1, status : "successful"});
                            
                            
                        }
                        else{
                            const store = new active_tokens({username:username, token:token, devices: [1]});
                            store.save();
                            res.json({deviceId: 1, token: token, status : "successful"});
                        }
                        // res.json(user1);
                        console.log("Username: " + username);
                    }
                    else if((await active_tokens.find({token:req.headers.token})).length==0){
                        res.json({status : 'titu patiyaan na ker'});
                    }
                    else{
                        res.json({status: "200"});
                    }
                }
                else{
                    res.json({status:"invalid"})
                }
            // }
            // catch{
            //     res.json({status:"server error"});
    
            // }
            
        }
        else{
            res.json({status:"user err"})       }
    }
    else{
        res.json({status:"masti"})
    }
});


app.post('/logout', async (req,res)=>{
   
    if(req.headers.token && req.headers.username && req.headers.deviceid){
        const data = await active_tokens.find({token:req.headers.token})
        if(data.length>0){
            if((jwt.verify(req.headers.token,process.env.my_secret_key))==req.headers.username){

                const index = data[0].devices.indexOf(req.headers.deviceid);
                // delete data[0].devices[index];
                data[0].devices.splice(index, 1)
                // res.json({ deleted: data[0].devices })
                const update = await active_tokens.updateOne({token:req.headers.token}, {devices: data[0].devices});
                res.json({ status: "successful" });
            }
            else{
                res.json({status : "User doesnot match token"})
            }    
        }
        else{
            res.json({status : 'invalid token'})
        } 
    }
    else{
       res.json({status : 'no token'})
    } 
});


app.get('/search', async (req,res) => {
    if(req.query.name != ''){
        const value=req.query.name.toLowerCase();
        const data = await inventory.find({$or:[{name: new RegExp('^'+value)}, {category:new RegExp('^'+value)}]});
        res.json(data);        
    }
    else{
        console.log("Hello World!!!");
    }
});

app.post('/placeOrder', async(req,res)=>{
    if(req.headers.cart && req.headers.credentials){
        const { username, password }= req.headers.credentials;
        const data = await User.find({username: username});
        if(data[0]){
            const getPassword = data[0].password;
            if( await bcrypt.compare( password, getPassword )){
                const array = [];
                const quantityArray = [];
                req.headers.cart.forEach( item => {
                    array.push(item.name);
                    quantityArray.push(item.quantity);
                } )
                const orderPlaced = new orders ({orderid: 1, username: username, items: { id:[1], name: array, quantity: quantityArray } })
                orderPlaced.save();
                res.json({ status: "success" });
            }
        }
    }
})

app.post('/proceed', async (req, res)=>{
    if( req.headers.token && req.headers.username && req.headers.password ){
        
        const { username, password, token } = req.headers;
        const getPassword = await User.find({ username: username });
        if (!getPassword.length) res.send("Couldnt find you");
        const decryptPassword = await bcrypt.compare( password, getPassword[0].password );
        if ( decryptPassword ){
            const verifyToken = await jwt.verify( token, process.env.my_secret_key );
            const checkLogin = await active_tokens.find({ token: token });
            if ( checkLogin && verifyToken ){
                res.send("Party karo boi");
            }
            else{
                res.send("Daal mein kuch kala hai Daya!");
            }    
        }
        else{
            res.send("Password do not match to your account")
        }
        
    }
});

app.post('/ch_password', async (req, res) => {
    if(req.headers.username && req.headers.password && req.headers.new_password && req.headers.token){
        const { username, password, new_password, token } = req.headers;
        const check = await authChangePassword( username, password, new_password, token );
        if (check){
            const deleteToken = await active_tokens.deleteOne({token: token});
            if ( deleteToken ) res.send("Password changed");
        }
        else{
            res.send("Something went wrong");
        }
    }
})

const authChangePassword = async (username, oldPass, newPass, token) => {
    const getToken = await active_tokens.find({token: token});
    if(getToken.length == 1){
        if(username == await jwt.verify(token,process.env.my_secret_key)){
            
            const us = await User.find({username:username});
            const tempPass = us[0].password;
            // console.log(">>>" + tempPass);
            const letsWait = await bcrypt.compare( oldPass, tempPass );
            // console.log(">>>" + letsWait);
            // console.log(us);
            if(us.length == 1 && letsWait){
                // console.log("Iam in")
                const anotherNewPassword = await bcrypt.hash(newPass, 10);
                const flag = await User.updateOne({username: username, password: tempPass}, {password: anotherNewPassword});
                // console.log(flag);
                return true;   
            }
            else{
                return false;
            }
        }
    }
};

app.post('/proceed_to_pay', async ( req , res ) => {
   const { username, password, token } = req.headers;
   if(username && password && token){
        const data = await User.find({ username: username });
        const verifypass = await bcrypt.compare( password, data[0].password );
        const verifytoken = await jwt.verify(token,process.env.my_secret_key);
        if((username == verifytoken) && verifypass){
            res.json({operation:"success",data:data});
        }
        else{
            res.json({operation:'failed'})
        }
   }
   else{
       res.send("Few parameters are missing");
   }
});

app.get('/featured', async (req,res) => {
        const data = await inventory.find().skip(await inventory.count()-2);
        if(data){
            res.json(data);
        }
        else{
            res.json({"status":"empty"});
        }
});

app.get('/cate', async (req,res) => {
    const data = await categories.find();
    if(data){
        res.json(data);
    }
    else{
        res.json({"status":"empty"});
    }
});

app.get('/subCategoryItems',async (req,res)=>{
    if(req.query.Items){
        const data = await inventory.find({subCategory: req.query.Items});
        if(data){res.json(data)}
        else{res.json({})}
        
    }
    else{
        res.json({data:{}})
    }
     
});




// app.get('/demo', async (req,res) => {    
//     console.log(req.get("user-agent"));
//     // console.log(os.platform());
//     // console.log(req.get("email"));
//     // console.log(req.headers['password']);
//     // console.log(req.get("content-type"));
// });


// const prod1 = new inventory ({
//     name: "clear",
//     category: "hair product",
//     subCategory: "shampoo",
// });


// prod1.save();

// const prod2 = new inventory ({
//     name: "clear for men",
//     category: "hair product",
//     subCategory: "shampoo",
// });


// prod2.save();

// const prod3 = new inventory ({
//     name: "head & shoulders",
//     category: "hair product",
//     subCategory: "shampoo",
// });


// prod3.save();

// const prod4 = new inventory ({
//     name: "dove",
//     category: "hair product",
//     subCategory: "shampoo",
// });


// prod4.save();

// const prod2 = new categories ({
//     name: "skin products",
//     subCategory: ["skin cream", "skin lotion", "skin moisturizer", "skin whitening cream"],
// });


// prod2.save();

// const prod3 = new categories ({
//     name: "meat",
//     subCategory: ["chicken meat", "mutton", "fish meat"],
// });


// prod3.save();



// const prod2 = new inventory ({
//     name: "lifebuoy",
//     category:"shampoo",
//     price: 122

// })
// prod2.save();

// const prod3 = new inventory ({
//     name: "lux",
//     category:"soap",

// })
// prod3.save();

// const prod4 = new inventory ({
//     name: "safeguard",
//     category:"soap",

// })
// prod4.save();

// const prod5 = new inventory ({
//     name: "tibet",
//     category:"soap",

// })
// prod5.save();

// const data = new orders ({
//     orderid:1,
//     username: "user1",
//     items:{id:[11,2,3],name:['soap', 'shampoo', 'noodles'],quantity:[2,3,4]},
//     address: "some",
//     total: 23,  
// });
// data.save();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


