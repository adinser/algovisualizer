import React, {  useRef } from 'react';
import { useWindowDimensions, View ,StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');

function MergeSort(props) {
    const {width} = useWindowDimensions()
    const viewSizing = (0.8*width)/props.arr.length;
    const vertAnim = useRef(props.arr.map(()=> new Animated.Value(0))).current;
    const horizontalAnim = useRef(props.arr.map((num,i)=>new Animated.Value(i*viewSizing))).current;
    const opacityAnim = useRef(props.arr.map(()=> new Animated.Value(1))).current;
    const interval=(props.arr.length>20)?50:100;
    const vertDist=1.1*props.ht;

    const mergeWrapper = () =>{
        var arr = props.arr.map((num,i)=>[num,i]);
        var dataArr = [];
        var arrLength = arr.length;
        mergeSort(arr, 0, arrLength - 1, dataArr);
        return dataArr;
    }

    const merge = (arr,l,m,r,dataArr) =>{

        let animateDrop=Animated.parallel(
            arr.map((val,ind)=>(ind>=l&&ind<=r)?
        Animated.timing(vertAnim[val[1]],{toValue:-100,duration:interval,useNativeDriver:false})
        :
        Animated.timing(vertAnim[val[1]],{toValue:0,duration:interval,useNativeDriver:false})
        ));


        var n1 = m-l+1;
        var n2 = r-m;
        

        var L = new Array(n1);
        var R = new Array(n2);
        

        for (var i = 0; i < n1; i++){
            L[i]=arr[l + i];
            
        }
        for (var j = 0; j < n2; j++){
            R[j]=arr[m + 1 + j];
        }

        

        var i = 0;
        var j = 0;
        var k = l;

        let animateReplacement=[];


        while (i < n1 && j < n2) {
            if (L[i][0] <= R[j][0]) {
                arr[k] = L[i];
                i++;
                animateReplacement.push(
                    Animated.parallel([
                        Animated.timing(horizontalAnim[arr[k][1]],
                            {toValue:k*viewSizing,duration:interval,useNativeDriver:false}),
                        Animated.timing(vertAnim[arr[k][1]],
                            {toValue:0,duration:interval,useNativeDriver:false})
                    ])
                );
            }
            else {
                arr[k] = R[j];
                j++;
                animateReplacement.push(
                    Animated.parallel([
                        Animated.timing(horizontalAnim[arr[k][1]],
                            {toValue:k*viewSizing,duration:interval,useNativeDriver:false}),
                        Animated.timing(vertAnim[arr[k][1]],
                            {toValue:0,duration:interval,useNativeDriver:false})
                    ])
                );
            }
            k++;
        }

        while (i < n1){
            arr[k] = L[i];
            i++;
            animateReplacement.push(
                Animated.parallel([
                    Animated.timing(horizontalAnim[arr[k][1]],
                        {toValue:k*viewSizing,duration:interval,useNativeDriver:false}),
                    Animated.timing(vertAnim[arr[k][1]],
                        {toValue:0,duration:interval,useNativeDriver:false})
                ])
            );
            k++;
        }

        while (j < n2){
            arr[k] = R[j];
            j++;
            animateReplacement.push(
                Animated.parallel([
                    Animated.timing(horizontalAnim[arr[k][1]],
                        {toValue:k*viewSizing,duration:interval,useNativeDriver:false}),
                    Animated.timing(vertAnim[arr[k][1]],
                        {toValue:0,duration:interval,useNativeDriver:false})
                ])
            );
            k++;
        }

    dataArr.push(Animated.sequence([animateDrop,Animated.sequence(animateReplacement)]));
    }



    const mergeSort = (arr,l,r, dataArr) => {

        let toggleOpacity=arr.map((val,ind)=>(ind>=l&&ind<=r)?
        Animated.timing(opacityAnim[val[1]],{toValue:1,duration:interval,useNativeDriver:false})
        :
        Animated.timing(opacityAnim[val[1]],{toValue:0.1,duration:interval,useNativeDriver:false})
        );


        dataArr.push(Animated.parallel(
            toggleOpacity
        ));


        if (l >= r){
            return;
        }
        

        var m = l + parseInt((r - l)/2);
        mergeSort(arr,l,m, dataArr);

        dataArr.push(Animated.parallel(
            toggleOpacity
        ));

        mergeSort(arr,m+1,r, dataArr);

        dataArr.push(Animated.parallel(
            toggleOpacity
        ));

        merge(arr,l,m,r, dataArr);
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
                    opacity: opacityAnim[i]
                }}
            />
        )
        return(
            <View style={[styles.numArrayContainer,{height:props.ht,marginVertical:1.5*props.ht}]}>
                {sortingArr}
            </View>
        );
    };





    Animated.sequence(mergeWrapper()).start();
    
    
    return (
        <View style={{width:'100%',alignItems:'center'}} >
            <Text style={{transform:[{translateY:0.4*props.ht}]}}>Merge Sort</Text>
            {arrAnimated()}
        </View>
    );
    
}


export default MergeSort;


const styles=StyleSheet.create({
    numArrayContainer: {
        flexDirection:"row",
        width:'80%',
    }
});