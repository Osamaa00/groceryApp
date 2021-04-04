import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withOrientation } from 'react-navigation';

const CartItem = ({ name, set,se }) => {

    const [quantity, setquantity] = useState(0);
    
    const _storeData = async (key, flag) => {
        try {
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
                if ( flag  ){
                    dataExist.quantity += 1;
                    await AsyncStorage.setItem(
                        key,
                        JSON.stringify(dataExist),
                    );
                }
                else{
                    if ( dataExist.quantity > 1 ){
                        dataExist.quantity -= 1;
                        await AsyncStorage.setItem(
                            key,
                            JSON.stringify(dataExist),
                        );
                    }
                    else if ( dataExist.quantity == 1 ){
                        // console.log("helooo");
                        await AsyncStorage.removeItem( key );
                    }
    
                }
            }
            set(!se);          
            
        } catch (error) {
            // There was an error on the native side 
            
            console.log(error);
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
    async function getQuantity ( key ) {
        const obj  = await _retrieveData( key );
        if ( obj ){
            setquantity(obj.quantity);
        }
        // console.log(quantity);
    }
    
    getQuantity(name);

    return (
        <View style={styles.container}>
            <View style={{alignItems:"center",width:120,justifyContent:'center',height:'100%'}}>
                <Image style = { styles.image } source={{ uri:"https://i.picsum.photos/id/982/200/200.jpg?hmac=X2ocb-PEJJpYgQn2Ib8SKCaWKsI-2hGcsvwZjWStNAw" }} />
            </View>
            <View style={{width:"60%",justifyContent:'center',alignItems:'center'}}>
                <View style={{ height:"40%"}}>
                    <Text style = {{ fontSize: 22 }}>{ name }</Text>
                </View>
                <View style={{flexDirection:"row",width:"70%",justifyContent:'space-between'}}>
                    <View style = { styles.button }>
                        <Button title="-" onPress={ () => _storeData( name, false ) } color="green" ></Button>
                    </View>
                    <Text style = {{ fontSize: 20, color: "grey" }}>{ quantity }</Text>
                    <View style = { styles.button }>
                        <Button title="+" onPress={ () => _storeData( name, true ) } color="green"></Button>
                    </View>
                </View>
                <View style={{marginTop:10}} >
                    <Text style = {{ fontSize: 20,color:'black',fontWeight:'bold'}}>
                        {quantity*100}
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default CartItem;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        width: "95%",
        borderWidth: 1,
        borderColor: "grey",
        height:200,
        backgroundColor:'#FAFAFA',
        marginTop: 10,
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 12,
    },

    button: {
        width:50,
        backgroundColor:'red',
        borderRadius:2

    },

    image: {
        height: 100,
        width: 100,
        borderRadius:10
    }
});