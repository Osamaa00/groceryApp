import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Icon name="bars" size={40} color="#900" />
            <TouchableOpacity style = {styles.search} onPress = { () => navigation.navigate('Search Page') }>
                <Image source={ require('../assets/favicon.png') }/>
                <Text>
                    
                    Search here
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
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
});