
import React, { useState,  } from 'react';
import { View ,StyleSheet, Text,  TouchableOpacity } from 'react-native';

import SelectionSort from './SelectionSort';

function SortContentSelector(props) {
    const [disp,setDisp]=useState(0);
    
    const sortMenu = ()=> (
        <View style={styles.container}>
            <Text> Sort With </Text>
            <TouchableOpacity onPress={()=>{setDisp(1)}}>
                <Text> Selection Sort </Text>
            </TouchableOpacity>
        </View>
    );

    const contentSwitch = ()=>{
        switch(disp) {
            case 0:
                props.setBusy(false);
                return sortMenu();
            case 1:
                props.setBusy(true);
                return <SelectionSort arr={props.arr} reset={()=>setDisp(0)}/>;
            default:
                props.setBusy(false);
                return sortMenu();
        }
    }
    return (
        <View style={{width:'100%', marginTop:50,flex:1}}>
            {contentSwitch()}
        </View>
    );
}

export default SortContentSelector;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
});