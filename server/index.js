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
        name: String,
        productid:Number,
        itemq:Number,
        category:String,
        best_before:String,
        images: Array,
        price: Number
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
const active_tokens = new Schema(
    {
        username: String,
        token:String,
        devices: Array, 
    }
);

// db.createCollection('admins');

mongoose.model("users",users);
mongoose.model("admins",admins);
mongoose.model("inventory",inventory);
mongoose.model("orders",orders);
mongoose.model("category",category);
mongoose.model("userlog",userLog);
mongoose.model("adminLog",adminLog);
mongoose.model("operational",operational);
mongoose.model('active_tokens',active_tokens);
// const data = new user1 ({
//     id: 13,
//     username: 'asd',
//     password: 'dasd',
//     email: 'asdasd',
//     address: 'asdasd'   
// });

// data.save();
