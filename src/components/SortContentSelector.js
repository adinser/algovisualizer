
import React, { useState, useEffect  } from 'react';
import { View ,StyleSheet, Text,  TouchableOpacity  } from 'react-native';


import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import MergeSort from './MergeSort';
import RaceSorts from './RaceSorts';

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
            <TouchableOpacity onPress={()=>{setDisp(3)}}>
                <Text> Merge Sort </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setDisp(4)}}>
                <Text> Race Insertion and Selection Sort </Text>
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
                return <SelectionSort arr={props.arr} ht={50} />;
            case 2:
                return <InsertionSort arr={props.arr} ht={50} />;
            case 3:
                return <MergeSort arr={props.arr} ht={50} />
            case 4:
                return <RaceSorts arr={props.arr} />;
            default:
                return sortMenu();
        }
    }
    const reset = (disp===0)?null:<TouchableOpacity  onPress={()=>setDisp(0)}><Text style={{color:'red'}}>Reset</Text></TouchableOpacity>;

    return (
        <View style={{width:'100%', marginTop:20,flex:1, alignItems:'center'}}>
            {reset}
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