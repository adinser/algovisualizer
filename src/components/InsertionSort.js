import React, {  useRef } from 'react';
import { useWindowDimensions, View ,StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');

function InsertionSort(props) {
    const {width} = useWindowDimensions()
    const viewSizing = (0.8*width)/props.arr.length;
    const vertAnim = useRef(props.arr.map(()=> new Animated.Value(0))).current;
    const horizontalAnim = useRef(props.arr.map((num,i)=>new Animated.Value(i*viewSizing))).current;

    const interval=(props.arr.length>20)?50:100;
    const vertDist=1.1*props.ht;
    
    
    const insertions = ()=>{
        const numbers = props.arr.map((num,i)=>[num,i]);
        const insertionsArray = [];
        let i, key, j;
        for (i=1; i<numbers.length; i++){
            key = numbers[i];
            j=i-1;
            let shifts=[];
            while (j >= 0 && numbers[j][0] > key[0]) {
                shifts.push(numbers[j][1]);
                numbers[j+1] = numbers[j];
                j=j-1;
            }
            insertionsArray.push([key[1],shifts])
            numbers[j+1] = key;
        }
        return insertionsArray;
    }


    const arrAnimated = ()=> {
        const sortingArr = props.arr.map((num,i)=>
            <Animated.View
                key={(num,i)}
                style={{
                    position:'absolute',
                    width: viewSizing,
                    height:'100%',
                    backgroundColor:numToColor(num),
                    left: horizontalAnim[i],
                    bottom: vertAnim[i],
                }}
            />
        )
        return(
            <View style={[styles.numArrayContainer,{height:props.ht,marginVertical:1.5*props.ht}]}>
                {sortingArr}
            </View>
        );
    };


    

    const animationSequence = Animated.sequence(insertions().map(
        (data,index)=>((Array.isArray(data[1])&&data[1].length)?
            Animated.sequence([
                Animated.timing(vertAnim[data[0]], {toValue:vertDist,duration:interval, useNativeDriver:false}),
                Animated.sequence(data[1].map((v,i)=>(Animated.timing(horizontalAnim[v],{toValue:(index+1-i)*viewSizing ,duration:interval, useNativeDriver:false})))),
                Animated.delay(interval),
                Animated.timing(horizontalAnim[data[0]],{toValue:(index+1-data[1].length)*viewSizing,duration:interval, useNativeDriver:false} ),
                Animated.timing(vertAnim[data[0]], {toValue:0,duration:interval, useNativeDriver:false})
            ])
            :Animated.sequence([
                Animated.timing(vertAnim[data[0]], {toValue:vertDist,duration:interval, useNativeDriver:false}),
                Animated.timing(vertAnim[data[0]], {toValue:0,duration:interval, useNativeDriver:false})
            ])
        )
    ));
    
    animationSequence.start();

    
    return (
        <View style={{width:'100%',alignItems:'center'}} >
            <Text style={{transform:[{translateY:0.4*props.ht}]}}>Insertion Sort</Text>
            {arrAnimated()}
        </View>
    );
    
}


export default InsertionSort;


const styles=StyleSheet.create({
    numArrayContainer: {
        flexDirection:"row",
        width:'80%',
    }
});