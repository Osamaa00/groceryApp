import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Swiper from 'react-native-swiper';


export default function Products({ navigation, route }) {


    
    const { name, products } = route.params;

    const _storeData = async (key, value) => {
        // await AsyncStorage.removeItem(key);
        // console.log(JSON.stringify(value));
        try {
            await AsyncStorage.getAllKeys()
            .then(keys => {
                keys.forEach(key => {
                    console.log(key);
                })
            })
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
            
                dataExist.quantity += 1;
                
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify(dataExist),
                );
            }
            else{
                console.log("No existing data");
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify(value)
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
    
    return (
        <View style = { styles.container }>
            <View style={styles.sliderContainer}>
                <Swiper
                    autoplay
                    horizontal={false}
                    height={200}
                    activeDotColor="#FF6347"
                >
                    <View style={styles.slide}>
                        <Image
                        source={{ uri: "https://i.picsum.photos/id/982/200/200.jpg?hmac=X2ocb-PEJJpYgQn2Ib8SKCaWKsI-2hGcsvwZjWStNAw" }}
                        resizeMode="cover"
                        style={styles.sliderImage}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                        source={{ uri: "https://i.picsum.photos/id/21/200/200.jpg?hmac=a2iQ6UhOjpU6jn7QSsCpk1CiiKTxmW1R4UivDsv-n8o" }}
                        resizeMode="cover"
                        style={styles.sliderImage}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                        source={{ uri: "https://i.picsum.photos/id/912/200/200.jpg?hmac=tYYyMFni6bya5yEVkwmmFekjWGedHVByLtPI5q1lcyw" }}
                        resizeMode="cover"
                        style={styles.sliderImage}
                        />
                    </View>
                </Swiper>
            </View>
            <View style = { styles.textContainer }>
                <Text style = { styles.prodName }>
                    { products.name }
                </Text>
                <Text style = { styles.prodName }>
                    Price: $1000
                </Text>
            </View>
            <View style={ styles.btn }>
              <Button title="Add to cart" color='green' onPress={ () => _storeData(products.name, { name: products.name, quantity: 1 }) }></Button>
              <Button title="GET" color='yellow' onPress={ () => _retrieveData(products.name) }></Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    btn: {
        justifyContent: "flex-end",
        height:"50%",
        width: "90%"
    },
    
    textContainer: {
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        width:"90%",
        height:60,
        borderWidth:1,
        borderRadius:10,
        borderColor:'grey',
        padding:10,
        backgroundColor:"green",
    },
    container: {
        flex: 1,
        alignItems:'center'
      },
      sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      },
    
      wrapper: {},
    
      slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
      sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
      },
    prodName: {
        fontFamily: "sans-serif",
        fontSize: 25,
        color: "white",
    }
});
