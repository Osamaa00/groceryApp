import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Window from './Window';


export default function Featured() {

    const temp = [{
        name: 'meat'
    }, {
        name: 'shampoo'
    }, {
        name: 'washing powder'
    }, {
        name: 'food'
    }]
    // const [featuredProducts, setfeaturedProducts] = useState([])
    const mapWindow = () => {
        const mappedWindow = temp.map( item => {
            return <Window key = { item.name } name = { item.name } />
        } )
        console.log(mappedWindow);
        return mappedWindow;
    }


    return (
        <View style={styles.container}>
            <ScrollView horizontal = {true}>
                { mapWindow() }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:'#e6e6d8',
        display:"flex",
        flexDirection:"row",
        height: 400,
        alignItems:'center',
        justifyContent:"space-evenly",
    },
});