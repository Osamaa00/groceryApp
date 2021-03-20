import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions,Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function window({ name }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.image}
                    source={{uri:'https://picsum.photos/200'}}
                />
            </TouchableOpacity>
            <Button color = "green" title = "Add to cart"></Button> 
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderRadius:30,
        width:300,
        backgroundColor:'white',
        display:"flex",
        alignItems:'center',
        justifyContent:"space-evenly",
        padding: 10,
        height: 300,
        marginRight:10,
        marginLeft:10,
    },
    image:{
        width:"90%",
        height:'70%',
        borderRadius:10
    },
    btn:{
        backgroundColor:'green',
        borderRadius:10,
        height:"20%",
        width:'90%'
    }

});