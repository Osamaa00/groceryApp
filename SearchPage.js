import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default function SearchPage({ navigation }) {
    

    
    const [searchText, setSearchText] = useState("");
    const [fetchedData, setdata] = useState({});

    const fetch_data = async (name) => {
        
        const string="http://localhost:3000/search?name="+ name;
        const response = await fetch(string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const fetchedProducts = [];
        const data = response.json();
        
        // data.then(e =>{
        //     e.forEach(product => {fetchedProducts.push(product.name)});
        // });
        data.then(e =>{
            e.forEach(product => {fetchedProducts.push(product)});
        });
        
        const items = {
            "array": fetchedProducts,
        };
        setdata(items);
        console.log(fetchedData);
        
        // console.log(fetchedData);
    };
    useEffect(() => {
        const data = fetch_data(searchText);
        setdata(data);
        return () => {
            setSearchText("");
        }
    }, [searchText])

    // console.log(fetchedData);

    // var key = 0;
    // if ( fetchedData.length > 0 ){
        
    //     var result = fetchedData.map( item => {
    //         key++;
    //         console.log(item);
    //         return <Text key={ key }>{ item }</Text>
    //     } );

    // }

    // const Item = ({ name }) => {
    //     <View style={styles.item}>
    //         <Text style={styles.title}>{name}</Text>
    //     </View>
    // }

    
    // const renderProduct = ({ item }) => {
    //     return (
    //         <Item name={ item.name }/>
    //     );
    // };

    // const temp = ['eat', 'sleep', 'code'];
    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="Search Here"
            onChangeText={ (e) => setSearchText(e) }
            >
            </TextInput>
        </View>

    )
};

// <FlatList 
// data={ fetchedData }
// renderItem={ renderProduct }
// />
const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
  });