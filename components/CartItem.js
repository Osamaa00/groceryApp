import * as React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartItem = ({ name }) => {

    
    const _storeData = async (key, flag) => {
        try {
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
                if ( flag  ){
                    dataExist.quantity += 1;
                }
                else{
                    dataExist.quantity -= 1;
                }
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify(dataExist),
                );
            }            
            
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }
    const _retrieveData = async (key) => {
        try {   
            
            const data = await AsyncStorage.getItem(key);
        
            if (data !== undefined) {
                console.log("data >>> ", data);
                const jsonData = JSON.parse(data);
                console.log("printing data >>> ", jsonData);
                return jsonData;
            }
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }

    const getQuantity = ( key ) => {
        const { quantity } = _retrieveData( key );
        return quantity;
    }
    
    return (
        <View style={styles.container}>
            <Image style = { styles.image } source={{ uri:"https://i.picsum.photos/id/982/200/200.jpg?hmac=X2ocb-PEJJpYgQn2Ib8SKCaWKsI-2hGcsvwZjWStNAw" }} />
            <Text>{ name }</Text>
            <Button title="-" onPress={ () => _storeData( name, false ) }></Button>
            <Text>{ getQuantity( name ) }</Text>
            <Button title="+" onPress={ () => _storeData( name, true ) }></Button>
            
        </View>
    )
}

export default CartItem;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-evenly',
        padding:10,
        width: "100%",
        height:300,
        backgroundColor:'grey'

        
    },

    image: {
        height: 150,
        width: 150
    }
});