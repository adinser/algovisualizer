import React, { useState } from 'react';
import { View ,StyleSheet, Text,  SafeAreaView, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');


function NumsToColors(props) {
    const numbers = props.numbers;
    let colorArr = (Array.isArray(numbers)&&numbers.length) ? 
        numbers.map((num,i)=><View key={(num,i)} style={{flex:1, borderWidth:1 ,backgroundColor:numToColor(num)}}/>):
        <View/>;
    return(
    <View style={[styles.numArrayContainer, styles.numColor]}>
        {colorArr}
    </View>
    );
}

function SortingScreen(props) {
    const [nums,setNums] = useState([]);
    const displayNums = [0,1,2,3,4,5,6,7,8,9].map((num)=>(
            <TouchableOpacity 
                key={num} 
                onPress={()=>(
                    setNums(nums.concat([num]))
                )}
                style={[styles.numSelect, {backgroundColor:numToColor(num)}]} 
            >
                <Text>{num}</Text>
            </TouchableOpacity>
        ));
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <Text>Click numbers to create an array to be sorted</Text>
                <View style={styles.numArrayContainer}>
                    {displayNums}
                </View>
                <Text>Your array Below</Text>
                <NumsToColors numbers={nums}/>
            </View>
        </SafeAreaView>
    );
}

export default SortingScreen;


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
    numColor:{
        borderWidth:1,
        height:50,
         padding:0,
    },
});