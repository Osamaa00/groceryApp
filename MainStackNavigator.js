import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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

    const Stack = createStackNavigator();
    const CategoriesStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

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
        </Drawer.Navigator>
    )
}

export default MainStackNavigator;
