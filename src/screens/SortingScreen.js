import React, { useEffect, useState } from 'react';
import { View ,StyleSheet, Text,  SafeAreaView, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');


function NumsToColors(props) {
    const numbers = props.numbers;
    const borderBool = (numbers.length > 10) ? 0 : 1 ;
    let colorArr = (Array.isArray(numbers)&&numbers.length) ? 
        numbers.map((num,i)=><View key={(num,i)} style={{flex:1, borderWidth:borderBool ,backgroundColor:numToColor(num)}}/>):
        <View/>;
    return(
    <View style={[styles.numArrayContainer, styles.numColor]}>
        {colorArr}
    </View>
    );
}

function SortingScreen(props) {
    const [nums,setNums] = useState([]);
    const [swaps,setSwaps] = useState(null);


    useEffect(()=>{
        if (Array.isArray(swaps)&&swaps.length>0){
            const mySwaps = swaps.slice();
            const nextSwap = mySwaps.shift();
            let numbers = nums.slice();
            [numbers[nextSwap[0]],numbers[nextSwap[1]]]=[numbers[nextSwap[1]],numbers[nextSwap[0]]];
            setSwaps(mySwaps);
            setNums(numbers);
            sleep(500);
        }
    },[swaps]);

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
                <Text>Click on numbers below to create an array to be sorted</Text>
                <Text>It is best to use a large array!</Text>
                <View style={styles.numArrayContainer}>
                    {displayNums}
                </View>
                <TouchableOpacity onPress={()=>setNums([])}>
                    <Text> Your array is below, click here to clear the array </Text>
                </TouchableOpacity>
                <NumsToColors numbers={nums}/>
                <TouchableOpacity onPress={()=>selectionSort(nums,setSwaps)}>
                    <Text>Sort it with selectionSort</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SortingScreen;


//Sleep function taken from geeksforgeeks.org/how-to-add-sleep-await.....
function sleep(ms) {
    let timeStart = new Date().getTime();
    while (true) {
        let elapsedTime = new Date().getTime() - timeStart;
        if (elapsedTime > ms) {
            break;
        }

    }
}


function selectionSort(arr, setVal){
    let numbers = arr.slice();
    let swapsArray = [];
    let iMax = (Array.isArray(numbers)&&numbers.length)?numbers.length:0;
    for (let i = 0; i<iMax-1;i++){
        let iMin = i;
        for (let j = i+1; j<iMax; j++){
            if(numbers[j]<numbers[iMin]){
                iMin=j;
            }
        }
        [numbers[i],numbers[iMin]]=[numbers[iMin],numbers[i]];
        swapsArray.push([i,iMin]);
    }
    setVal(swapsArray);
}


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