import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
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
import Order from './components/Order';

const MainStackNavigator = () => {

    // const [data, setdata] = useState([]);
    const [login, setLogin] = useState(false);
    // const navigation = useNavigation();
    const [refresh, setrefresh] = useState(0);

    const Stack = createStackNavigator();
    const CategoriesStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    useEffect(() => {
        Rrefresh();
    }, [refresh])

    const Rrefresh = () => {
        setLogin(!login);
        setLogin(!login);
    }

    const logout = async () => {
        const data = await _retrieveData( "credentials" );
        // console.log("token >>> ", data.token);
        if( data?.token && data?.username && data?.deviceId ){
            fetch('http://10.0.2.2:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': data.username,
                    'token': data.token,
                    'deviceid': data.deviceId
                },
            })
            .then(res => res.json())
            .then( async verify => {
                console.log("data returned >> ", verify)
                if(verify?.status == "successful"){
                    await AsyncStorage.removeItem('credentials');
                    console.log("Successfully logged out")
                    // navigation.navigate("Home")
                }
                else{
                    console.log("Something went wrong")
                    await AsyncStorage.removeItem('credentials');
                }
            })
            .catch((err)=>console.log(err));
        }
        else{
            console.log("Refresh please")
        }
    }

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

    const alternative = () => {
        logout();
        return null;
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

    useEffect(() => {
        checkLogin()
    }, [])

    const StackScreen = ({ navigation }) => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home">{ props => <Home {...props} refresh={ refresh } setrefresh={setrefresh} /> }</Stack.Screen>
                <Stack.Screen name="Search Page" component={ SearchPage } options = {{ title: "Search Page" }} />
                <Stack.Screen name="Result Component" component={ ResultComponent } options = {{ title: "Results" }} />
                <Stack.Screen name="Product" component={ Products } options = {{ title: "Product" }} />
                <Stack.Screen name="Login" component={ Login } options = {{ title: "Login" }} />
                <Stack.Screen name="Signup" component={ Signup } options = {{ title: "Signup" }} />
                <Stack.Screen name="Cart" component={ Cart } options = {{ title: "Cart" }} />
                <Stack.Screen name="Payment" component={ Payment } options = {{ title: "Paisa" }} />
                <Stack.Screen name="Order" component={ Order } options = {{ title: "Order Confirmation" }} />
            </Stack.Navigator>
        )
    }

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
            <Drawer.Screen name = "Login" component={ alternative } options = {{ title: "Logout" }}/>
            :
            <Drawer.Screen name = "Login" component={ Login } options = {{ title: "Login" }}/>}        
        </Drawer.Navigator>  
    )
}

export default MainStackNavigator;
