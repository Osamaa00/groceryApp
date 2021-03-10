import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';



export default function SearchPage({ navigation }) {
    

    
    const [searchText, setSearchText] = useState("");
    const [fetchedData, setdata] = useState([]);

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
        data.then(e =>{
            e.forEach(product => {fetchedProducts.push(product.name)});
        });
        setdata(fetchedProducts);
        console.log(fetchedData);
    };
    useEffect(() => {
        const data = fetch_data(searchText);
        setdata(data);
        return () => {
            setSearchText("");
        }
    }, [searchText])

    const renderList = () => {
        return (
            <View>
                {fetchedData.forEach( item => {
                    <Text>{ item }</Text>
                } )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="Search Here"
            onChangeText={ (e) => setSearchText(e) }
            >
            </TextInput>
            {fetchedData.map((e)=>{
                console.log(e);
            }
            )}
        </View>

    )
};


const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    
  });