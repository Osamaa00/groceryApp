const mongoose = require('mongoose');
const { Schema } = mongoose;
 
mongoose.connect('mongodb+srv://osama:bmw600bmw600@groceryapp.trb48.mongodb.net/appDatabase?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true}).catch((error)=>console.log(error));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});

const users = new Schema(
    {
        id: Number,
        username:String,
        password:String,
        email:String,
        address:String    
    }
);

const admins = new Schema(
    {
        name:String,
        password:String,
        
    }
);
const inventory = new Schema(
    {
        itemid:Number,
        itemq:Number,
        catagory:String,
        bf:String    
    }
);
const orders = new Schema(
    {
        orderid:Number,
        username:String,
        items:{id:[],name:[],quantity:[]},
        address:String,
        total:Number,
        delivery_time:Date    
    }
);
const category = new Schema(
    {
        name:String, 
    }
);

const userLog = new Schema(
    {
        id:Number,
        time:Date,    
    }
);

const adminLog = new Schema(
    {
        id:Number,
        time:Date,    
    }
);
const operational = new Schema(
    {
        name:String, 
    }
);

db.createCollection('admins');

const user1=mongoose.model("users",users);
const admins1=mongoose.model("admins",admins);
const inventory1=mongoose.model("inventory",inventory);
const orders1=mongoose.model("orders",orders);
const category1=mongoose.model("category",category);
const userLog1=mongoose.model("userlog",userLog);
const adminLog1=mongoose.model("adminLog",adminLog);
const operational1=mongoose.model("operational",operational);


const data = new user1 ({
    id: 13,
    username: 'asd',
    password: 'dasd',
    email: 'asdasd',
    address: 'asdasd'   
});

data.save();

