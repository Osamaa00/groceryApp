// import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import {
  StyleSheet,
} from "react-native";

export default function App() {

  const Stack = createStackNavigator();  
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
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

// hello brother