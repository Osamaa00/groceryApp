import * as React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import RenderItem from './RenderItem';

export default function RenderSubCategoryItems({ itemName }) {

    // console.log(itemName);
    const [renderItems, setrenderItems] = useState([]);
    const [items, setItems] = useState([]);

    const mapItems = () => {
        const getrenderItems = items.map( item => {
            return <RenderItem key = { item.name } item = { item } />
        }); 

       return getrenderItems; 
    };
    

    const string = 'http://10.0.2.2:3000/subCategoryItems?Items=' + itemName;

    const fetchedItems = [];
    fetch(string, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then( getItems => { 

        getItems.forEach(item => {
            console.log(item)
            fetchedItems.push(item);

        })
        setItems(fetchedItems);
        setrenderItems(mapItems());
        // console.log(renderItems);
        
    })
    .catch((err) => console.log(err));

    return (
        <View>
            { renderItems }
        </View>
    )
}
