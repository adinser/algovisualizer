import React, { useState } from 'react';
import { View ,StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import SortContentSelector from '../components/SortContentSelector';
import ArrayDisplay from '../components/ArrayDisplay';


const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');


function SortScreen(props) {
    const [nums,setNums] = useState([]);
    const [busy, setBusy] = useState(false);


    const arrayBuilder = [0,1,2,3,4,5,6,7,8,9].map((num)=>(
            <TouchableOpacity 
                key={num} 
                onPress={()=>(
                    setNums(nums.concat([num]))
                )}
                disabled={busy}
                style={[styles.numSelect, {backgroundColor:numToColor(num)}]} 
            >
                <Text>{num}</Text>
            </TouchableOpacity>
        )); 

    
    let sortOptions = (Array.isArray(nums)&&nums.length>1) ? 
        <SortContentSelector arr={nums} setBusy={setBusy}/>:null;

    let arrClear = (busy)?null:
        <TouchableOpacity onPress={()=>setNums([])} disabled={busy}>
            <Text style={{color:'red'}}> click here to clear the array </Text>
        </TouchableOpacity>;
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <Text>Click on numbers below to create an array to be sorted</Text>
                <Text>It is best to use a large array!</Text>
                <View style={styles.numArrayContainer}>
                    {arrayBuilder}
                </View>
                {arrClear}
                <ArrayDisplay arr={nums}/>
                {sortOptions}
            </View>
        </SafeAreaView>
    );
}

export default SortScreen;



const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    numArrayContainer: {
        padding:5,
        flexDirection:"row",
        width:'80%',
        marginBottom:10,
    },
    numSelect:{
        borderWidth:1,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:30,
    },
});