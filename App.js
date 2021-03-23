// import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

import {
  StyleSheet,
} from "react-native";
import MainStackNavigator from './MainStackNavigator';
import DrawerNavigator from './DrawerNavigator';

export default function App() {

    
  
  // const { landscape } = useDeviceOrientation();
  
  // const CategoriesStackScreen = ({ navigation }) => {
  //   <CategoriesStackScreen.Navigator>
  //     <CategoriesStackScreen.Screen name = "Categories" component={ Categories }/>
  //     <CategoriesStackScreen.Screen name = "Subcategory" component={ Subcategory }/>
  //   </CategoriesStackScreen.Navigator>
  // };
  console.log(Dimensions.get('window').height);
  return (
    
    <NavigationContainer style={ styles.container }>
      <MainStackNavigator />
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
