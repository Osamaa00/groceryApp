import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home({ navigation }) {

    const [counterState, setCounterState] = useState(0);
    
    const _storeData = async (key, value) => {
        try {
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
                
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify([...dataExist, value]),
                    // JSON.stringify([
                    // {
                    //     itemid : "143",
                    //     itemq : "2",
                    //     price: "1000"
                    // },
                    // {
                    //     itemid : "143",
                    //     itemq : "2",
                    //     price: "1000"
                    // }])
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

    _storeData();
    _retrieveData();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icons} onPress={() => setCounterState(counterState + 1)}>
                <Icon name="bars" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.search} onPress = { () => navigation.navigate('Search Page') }>
                <Text>
                    Search here
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Cicon} onPress = { () => navigation.navigate('Search Page')}>
                <Icon name="shopping-cart" size={30} color="#00FF00" onPress={ () => navigation.navigate('Cart') } />
                <Text>{counterState}</Text>
            </TouchableOpacity>

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
        justifyContent:"space-evenly",
        padding: 10,
    },
    search:{
        width:"50%",
        borderRadius:10,
        height:40,
        backgroundColor:'white',
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
    },
    icons: {
        width:'20%',
        height:40,
        alignItems: 'center',
        justifyContent:'center',
    },
    Cicon:{
        flexDirection:'row',
        width:'20%',
        height:40,
        alignItems: 'center',
        justifyContent:'space-evenly'
    }
});