import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order = () => {
    useEffect(() => {
        getOrder();

    }, [])
    const getOrder=()=>{
        const data=await orders.find()
    }
    const [order, setorder] = useState(true);
    return (
        <View>
            {order?<Text>Order Confirmed!!</Text>:<Text>Waiting...</Text>}
        </View>
    )
}

export default Order;
