import React, {  useRef } from 'react';
import { useWindowDimensions, View ,StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');

function SelectionSort(props) {
    const {width} = useWindowDimensions()
    const viewSizing = (0.8*width)/props.arr.length;
    const vertAnim = useRef(props.arr.map(()=> new Animated.Value(0))).current;
    const horizontalAnim = useRef(props.arr.map((num,i)=>new Animated.Value(i*viewSizing))).current;

    const swaps = ()=>{
        const numbers = props.arr.map((num,i)=>[num,i]);
        const swapsArray = [];
        for (let i = 0; i<numbers.length-1; i++) {
            let iMin = i;
            for (let j = i+1; j<numbers.length; j++){
                if(numbers[j][0]<numbers[iMin][0]){
                    iMin=j;
                }
            }
            swapsArray.push([numbers[i][1],numbers[iMin][1],iMin-i]);
            [numbers[i],numbers[iMin]]=[numbers[iMin],numbers[i]];
        }
        return swapsArray;
    };

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
                    top: vertAnim[i],
                }}
            />
        )
        return(
            <View style={[styles.numArrayContainer, styles.numColor]}>
                {sortingArr}
            </View>
        );
    };

    

    const interval=(props.arr.length>20)?100:250;
    const vertDist=75;

    const animationSequence = ()=>swaps().map(
        (data,index)=>((data[2]===0)?
            Animated.sequence([
                Animated.timing(vertAnim[data[0]],{toValue:vertDist,duration:interval, useNativeDriver:false}),
                Animated.delay(interval),
                Animated.timing(vertAnim[data[0]],{toValue:0,duration:interval, useNativeDriver:false})
            ])
            :Animated.sequence([
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(vertAnim[data[0]],{toValue:vertDist,duration:interval, useNativeDriver:false}),
                        Animated.timing(horizontalAnim[data[0]],{toValue:(index+data[2])*viewSizing ,duration:interval, useNativeDriver:false}),
                        Animated.timing(vertAnim[data[0]],{toValue:0,duration:interval, useNativeDriver:false})
                    ]),
                    Animated.sequence([
                        Animated.timing(vertAnim[data[1]],{toValue:-vertDist,duration:interval, useNativeDriver:false}),
                        Animated.timing(horizontalAnim[data[1]],{toValue:index*viewSizing ,duration:interval, useNativeDriver:false}),
                        Animated.timing(vertAnim[data[1]],{toValue:0,duration:interval, useNativeDriver:false})
                    ])
                ])
            ])
        )
    );
    
    Animated.sequence(animationSequence()).start();

    
    return (
        <View style={{width:'100%',alignItems:'center',marginTop:100}} >
            {arrAnimated()}
            <TouchableOpacity onPress={props.reset}><Text>Reset</Text></TouchableOpacity>
        </View>
    );
    
}


export default SelectionSort;


const styles=StyleSheet.create({
    numArrayContainer: {
        padding:5,
        flexDirection:"row",
        width:'80%',
        
    },
    numColor:{
        height:50,
        padding:0,
    },
});