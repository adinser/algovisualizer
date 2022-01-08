import React, {  useRef } from 'react';
import { useWindowDimensions, View ,StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');

function SelectionSort(props) {
    const {width} = useWindowDimensions()
    const viewSizing = (0.8*width)/props.arr.length;
    const vertAnim = useRef(props.arr.map(()=> new Animated.Value(0))).current;
    const horizontalAnim = useRef(props.arr.map((num,i)=>new Animated.Value(i*viewSizing))).current;

    const interval=(props.arr.length>20)?50:100;
    const vertDist=1.1*props.ht;

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
    
    

    const selections = ()=>{
        const arr = props.arr.map((num,i)=>[num,i]);
        const selectionsArray = [];
        for (let i = 0; i<arr.length-1; i++) {
            let iMin = i;
            let checks=[];
            for (let j = i+1; j<arr.length; j++){
                checks.push(arr[j][1]);
                if(arr[j][0]<arr[iMin][0]){
                    iMin=j;
                }
            }
            selectionsArray.push([arr[i][1],arr[iMin][1],iMin-i,checks]);
            [arr[i],arr[iMin]]=[arr[iMin],arr[i]];
        }
        return selectionsArray;
    };

    const animationSequence = Animated.sequence(selections().map(
        (data,index)=>((data[2]===0)?
            Animated.sequence([
                Animated.timing(vertAnim[data[0]],{toValue:vertDist,duration:interval, useNativeDriver:false}),
                Animated.sequence(
                    data[3].map((v)=>(Animated.sequence([
                        Animated.timing(vertAnim[v],{toValue:vertDist/4,duration:interval/2, useNativeDriver:false}),
                        Animated.timing(vertAnim[v],{toValue:0,duration:interval/2, useNativeDriver:false})
                    ])))
                ),
                Animated.timing(vertAnim[data[0]],{toValue:0,duration:interval, useNativeDriver:false})
            ])
            :Animated.sequence([
                Animated.timing(vertAnim[data[0]],{toValue:vertDist,duration:interval, useNativeDriver:false}),
                Animated.sequence(
                    data[3].map((v)=>(Animated.sequence([
                        Animated.timing(vertAnim[v],{toValue:vertDist/4,duration:interval/2, useNativeDriver:false}),
                        Animated.timing(vertAnim[v],{toValue:0,duration:interval/2, useNativeDriver:false})
                    ])))
                ),
                Animated.timing(vertAnim[data[1]],{toValue:-vertDist,duration:interval, useNativeDriver:false}),
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(horizontalAnim[data[0]],{toValue:(index+data[2])*viewSizing ,duration:interval/2, useNativeDriver:false}),
                        Animated.timing(vertAnim[data[0]],{toValue:0,duration:interval/2, useNativeDriver:false})
                    ]),
                    Animated.sequence([
                        Animated.timing(horizontalAnim[data[1]],{toValue:index*viewSizing ,duration:interval/2, useNativeDriver:false}),
                        Animated.timing(vertAnim[data[1]],{toValue:0,duration:interval/2, useNativeDriver:false})
                    ])
                ])
            ])
        )
    ));

    animationSequence.start();

    return (
        <View style={{width:'100%',alignItems:'center'}} >
            <Text style={{transform:[{translateY:0.4*props.ht}]}}>Selection Sort</Text>
            {arrAnimated()}
        </View>
    );
    
}


export default SelectionSort;


const styles=StyleSheet.create({
    numArrayContainer: {
        flexDirection:"row",
        width:'80%',
    }
});