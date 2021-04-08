import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Featured from './Featured';


export default function Home({ navigation, func }) {

    const exceptions = ['credentials'];
    
    const [counterState, setCounterState] = useState(0);
    // const [cartState, setcartState] = useState(0);
    // useEffect(() => {

    //     updateCart();

    // })

    // const updateFinal = () => {return counterState};
    const updateCart = async () => {
        await AsyncStorage.getAllKeys()
        .then( res => {
            if ( res ){
                
                // comeback here soon to change this
                setCounterState(res.length - exceptions.length);
                // console.log(res.length);
            }
        } )
        // console.log("counter >>> ", counterState);
        
    }
    
    const _storeData = async (key, value) => {
        try {
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
                
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify([...dataExist, value]),
                );
            }
            else{
                console.log("No existing data");
            }
    
            // Congrats! You've just stored your first value!
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }
    
    const _retrieveData = async (key) => {
        try {   
            const data = await AsyncStorage.getItem(key);
        
            if (data !== undefined) {
                const jsonData = JSON.parse(cart);
                // setCounterState(data.length);
                return data;
                // console.log("length set");
                
            }
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }

    // AsyncStorage.removeItem("credentials");
    // _storeData("credentials", { username: "admin", password: "admin", token: "abcd" });
    // AsyncStorage.setItem(
    //     "credentials",
    //     JSON.stringify({ username: "user6", password: "user6", token: "eyJhbGciOiJIUzI1NiJ9.dXNlcjY.ejRjaveoYHJXu5XSfDpGsp3VK3aca1IYY5WhObu9EWI" }),
    // );
    // _retrieveData();
    // const temp = updateCart().then();
    // console.log(temp);
    // useEffect(() => {
    //     func()
    // }, [])
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.icons}>
                    <Icon name="bars" size={30} color="#900" onPress={() => navigation.openDrawer() } />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.search} onPress = { () => navigation.navigate('Search Page') }>
                    <Text>
                        Search here
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Cicon}>
                    <Icon name="shopping-cart" size={30} color="#00FF00" onPress={ () => navigation.navigate('Cart', { update: updateCart }) } />
                    <Text>{ counterState }</Text>
                </TouchableOpacity>
            </View>
            <View style = { { marginTop: 20 } }>
                
                <ScrollView>
                    <Featured />
                    <Featured />
                    <Featured />
                </ScrollView>
            </View>

        </View>

    )
};


const styles = StyleSheet.create({
    burger:{
        width:"10%",
        height:40,
        padding:10,
    },
    container:{
        width:"100%",
        backgroundColor:'dodgerblue',
        display:"flex",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-evenly",
        padding: 10,
        height: (Dimensions.get('window').height) / 10,
        minHeight:60,
        maxHeight: 100,
    },
    search:{
        width:"50%",
        borderRadius:10,
        height:"90%",
        backgroundColor:'white',
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
    },
    icons: {
        width:'20%',
        height:"90%",
        alignItems: 'center',
        justifyContent:'center',
    },
    Cicon:{
        flexDirection:'row',
        width:'20%',
        height:"90%",
        alignItems: 'center',
        justifyContent:'space-evenly'
    }
});