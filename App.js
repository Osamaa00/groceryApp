// import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./home/Home";
import SearchPage from "./SearchPage";
import ResultComponent from "./components/ResultComponent";
import Products from "./components/Products";
import Cart from "./home/Cart";
import Categories from './components/Categories';
import Singlesubcategory from './components/Singlesubcategory'
import Subcategory from './components/Subcategory'

import {
  StyleSheet,
} from "react-native";

export default function App() {

  const Stack = createStackNavigator();  
  const Drawer = createDrawerNavigator();
  const { landscape } = useDeviceOrientation();
  
  // const CategoriesStackScreen = ({ navigation }) => {
  //   <CategoriesStackScreen.Navigator>
  //     <CategoriesStackScreen.Screen name = "Categories" component={ Categories }/>
  //     <CategoriesStackScreen.Screen name = "Subcategory" component={ Subcategory }/>
  //   </CategoriesStackScreen.Navigator>
  // };
  console.log(Dimensions.get('window').height);
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options = {{ title: "Home" }} />
        <Stack.Screen name="Search Page" component={ SearchPage } options = {{ title: "Search Page" }} />
        <Stack.Screen name="Result Component" component={ ResultComponent } options = {{ title: "Results" }} />
        <Stack.Screen name="Product" component={ Products } options = {{ title: "Product" }} />
        <Stack.Screen name="Login" component={ Login } options = {{ title: "Login" }} />
        <Stack.Screen name="Signup" component={ Signup } options = {{ title: "Signup" }} />
        <Stack.Screen name="Cart" component={ Cart } options = {{ title: "Cart" }} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

// <Stack.Navigator>
// <Stack.Screen name="Home" component={ Home } options = {{ title: "Home" }} />
// <Stack.Screen name="Search Page" component={ SearchPage } options = {{ title: "Search Page" }} />
// <Stack.Screen name="Result Component" component={ ResultComponent } options = {{ title: "Results" }} />
// <Stack.Screen name="Product" component={ Products } options = {{ title: "Product" }} />
// <Stack.Screen name="Login" component={ Login } options = {{ title: "Login" }} />
// <Stack.Screen name="Signup" component={ Signup } options = {{ title: "Signup" }} />
// <Stack.Screen name="Cart" component={ Cart } options = {{ title: "Cart" }} />
// </Stack.Navigator>

// <Drawer.Navigator>
// <Drawer.Screen name = "Home" component={ Home }/>
// <Drawer.Screen name = "Categories" component={ Categories } options = {{ title: "Categories" }}/>
// <Drawer.Screen name = "Subcategory" component={ Subcategory }/>
// </Drawer.Navigator>
const styles = StyleSheet.create({
  
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  

});
