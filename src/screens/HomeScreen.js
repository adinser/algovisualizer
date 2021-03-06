import React, {useLayoutEffect} from "react";
import {  StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";



function HomeScreen(props) {
    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: "AlgoVisualizer",
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
            },
        })
    }, []);
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <Text> Select Algorithm Catagory below! </Text>
                <ScrollView contentContainerStyle={styles.scrollcontainer}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Sort")}><Text>Sorting algortihms</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Search")}><Text>Search algortihms</Text></TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollcontainer: {
        borderWidth:1,
        margin:20,
        alignItems: "center",
    }
});