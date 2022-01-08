import React from 'react';
import { View } from 'react-native';

import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';


function RaceSorts(props) {
    return (
        <View style={{flex:1, justifyContent:'space-around', alignItems:'center',width:'100%',}}>
            <SelectionSort arr={props.arr} ht={40} />
            <InsertionSort arr={props.arr} ht={40}/>
        </View>
    );
}

export default RaceSorts;