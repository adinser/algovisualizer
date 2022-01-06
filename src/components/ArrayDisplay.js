import React from 'react';
import { View ,StyleSheet } from 'react-native';

const numToColor = (num) => ('hsl('+(36*num).toString()+', 100%, 50%)');

function ArrayDisplay(props) {
    const numbers = props.arr;
    const borderBool = (numbers.length > 10) ? 0 : 1 ;
    let colorArr = (Array.isArray(numbers)&&numbers.length) ? 
        numbers.map((num,i)=>
            <View 
                key={(num,i)} 
                style={{flex:1, borderWidth:borderBool ,backgroundColor:numToColor(num)}}
            />
        ) : <View/>;
    return(
    <View style={[styles.numArrayContainer, styles.numColor]}>
        {colorArr}
    </View>
    );
}

export default ArrayDisplay;




const styles=StyleSheet.create({
    numArrayContainer: {
        padding:5,
        flexDirection:"row",
        width:'80%',
        marginBottom:10,
    },
    numColor:{
        borderWidth:1,
        height:50,
        padding:0,
    },
});