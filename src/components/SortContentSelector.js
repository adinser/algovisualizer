
import React, { useState, useEffect  } from 'react';
import { View ,StyleSheet, Text,  TouchableOpacity  } from 'react-native';


import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';

function SortContentSelector(props) {
    const [disp,setDisp]=useState(0);
    
    const sortMenu = ()=> (
        <View style={styles.container}>
            <Text> Sort With </Text>
            <TouchableOpacity onPress={()=>{setDisp(1)}}>
                <Text> Selection Sort </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setDisp(2)}}>
                <Text> Insertion Sort </Text>
            </TouchableOpacity>
        </View>
    );
    
    useEffect(()=>{
        if (disp===0){
            props.setBusy(false)
        } else {
            props.setBusy(true)
        }
    },[disp])

    const contentSwitch = ()=>{
        switch(disp) {
            case 0:
                return sortMenu();
            case 1:
                return <SelectionSort arr={props.arr} reset={()=>setDisp(0)}/>;
            case 2:
                return <InsertionSort arr={props.arr} reset={()=>setDisp(0)}/>
            default:
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