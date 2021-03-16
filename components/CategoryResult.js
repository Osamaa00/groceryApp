import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RenderSubCategories from "./RenderSubCategories";


export default function CategoryResult({ category }) {

    const [press, setpress] = useState(false)
    const checkPress = () => {
        if ( press ){
            return <RenderSubCategories  key = { category.name } category = { category } />
        }
    };
    const navigation = useNavigation();

    return (
        <View style={ styles.container }>
            <TouchableOpacity style={styles.categoryList} onPress = { () => press? setpress(false) : setpress(true) }>
                <Image style={{width:40,height:40}} source={{ uri: 'https://media.allure.com/photos/5893581da08420c838db6686/master/pass/haircare.jpg?mbid=social_retweet' }} />
                
                <Text style={ styles.category }>
                    {category.name}
                </Text>
                
                <Icon name="arrow-down" size={25} color="black" />
            </TouchableOpacity>
            { checkPress() }
        </View>
    )
}

const styles = StyleSheet.create({
  
    container: {

        borderRadius:10,
        padding: 10,
        flex: 1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        marginBottom: 50,
        padding:20,
        borderRadius:10,
        height:"40%"
    },

    categoryList:{
        height:"100%",
        width:"100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection:'row',
        backgroundColor:'red'
    },

    category: {
        fontFamily:'sans-serif',
        fontSize: 23,
    },
});