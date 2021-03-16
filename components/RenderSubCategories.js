import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Singlesubcategory from './Singlesubcategory';

export default function RenderSubCategories({ category }) {

    const subCategories = category.subCategory;
    // const [fetchedSubCategories, setSubCategories] = useState([]);

    const mapSubCategories = () => {
        const renderSubCategories = subCategories.map( subCategory => {
            return <Singlesubcategory key = { subCategory } name = { subCategory }/>
        } )
        return renderSubCategories;
    };

    return (
        <View>
            <View style={styles.container}>
                {mapSubCategories()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "blue",
      width:"100%",
      flexDirection:"row",
      flexWrap:"wrap",
    },
    image:{
        width:100,
        height:100,
    },
    click:{
        alignItems:"center",
        justifyContent:'space-evenly',
        padding: 10,
    }

});