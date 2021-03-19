import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function RenderItem({ item }) {
    return (
        <View>
            <Text>Hwllo {item.name}</Text>
        </View>
    )
}
