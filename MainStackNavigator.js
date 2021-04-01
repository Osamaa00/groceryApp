import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./home/Home";
import SearchPage from "./SearchPage";
import ResultComponent from "./components/ResultComponent";
import Products from "./components/Products";
import Payment from "./components/Payment";
import Cart from "./home/Cart";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from './components/Categories';
import Subcategory from './components/Subcategory';

const MainStackNavigator = () => {

    // const [data, setdata] = useState([]);
    const [login, setLogin] = useState(false);

    const Stack = createStackNavigator();
    const CategoriesStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const _retrieveData = async (key) => {
        try {   
            
            const data = await AsyncStorage.getItem(key);
        
            if ( data ) {
                // console.log("data >>> ", data);
                const jsonData = JSON.parse(data);
                // console.log("printing data >>> ", jsonData);
                return jsonData;
            }
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }

    const checkLogin = async () => {
        const temp = [];
        const creds = await _retrieveData('credentials');
        if( creds?.username && creds?.password && creds?.token ){
            temp.push("Login");
            temp.push(Login);
            temp.push("Logout");
            setLogin(true)
            console.log("state set >> ", login);
            return true;
        } 
        else{
            temp.push("Login");
            temp.push(Login);
            temp.push("Login");
            setLogin(false);
            console.log("state set >> ", login);
            return false;
        }
    }

    checkLogin();

    const StackScreen = ({ navigation }) => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ Home } options = {{ title: "Home" }} />
                <Stack.Screen name="Search Page" component={ SearchPage } options = {{ title: "Search Page" }} />
                <Stack.Screen name="Result Component" component={ ResultComponent } options = {{ title: "Results" }} />
                <Stack.Screen name="Product" component={ Products } options = {{ title: "Product" }} />
                <Stack.Screen name="Login" component={ Login } options = {{ title: "Login" }} />
                <Stack.Screen name="Signup" component={ Signup } options = {{ title: "Signup" }} />
                <Stack.Screen name="Cart" component={ Cart } options = {{ title: "Cart" }} />
                <Stack.Screen name="Payment" component={ Payment } options = {{ title: "Paisa" }} />
            </Stack.Navigator>
        )
    }

    
    // var temp = [];

    // checkLogin().then( res => {

    //     res.forEach( item => {

    //         console.log("item >> ", item);
    //         temp.push(item);

    //     } )
    //     // console.log(temp);
    //     setdata( temp )
    //     // return temp;
    // });
    
    // console.log("array >> ", data);
    

    const CategoriesStackScreen = ({ navigation }) => {
        return (
            <CategoriesStack.Navigator>
                <CategoriesStack.Screen name = "Categories" component={ Categories }/>
                <CategoriesStack.Screen name = "Subcategory" component={ Subcategory }/>
            </CategoriesStack.Navigator>
        )
    };

    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component={ StackScreen } />
            <Drawer.Screen name = "Categories" component={ CategoriesStackScreen } options = {{ title: "Categories" }}/>
            {login?
            <Drawer.Screen name = "Signup" component={ Signup } options = {{ title: "Logout" }}/>
            :
            <Drawer.Screen name = "Login" component={ Login } options = {{ title: "Login" }}/>}        
        </Drawer.Navigator>  
    )
}

export default MainStackNavigator;
