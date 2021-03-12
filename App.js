// import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./home/Home";
import SearchPage from "./SearchPage";
import ResultComponent from "./components/ResultComponent";
import Products from "./components/Products";

import {
  StyleSheet,
} from "react-native";

export default function App() {

  const Stack = createStackNavigator();  
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options = {{ title: "Home" }} />
        <Stack.Screen name="Search Page" component={ SearchPage } options = {{ title: "Search Page" }} />
        <Stack.Screen name="Result Component" component={ ResultComponent } options = {{ title: "Results" }} />
        <Stack.Screen name="Product" component={ Products } options = {{ title: "Product" }} />
        <Stack.Screen name="Login" component={ Login } options = {{ title: "Login" }} />
        <Stack.Screen name="Signup" component={ Signup } options = {{ title: "Signup" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  

});
