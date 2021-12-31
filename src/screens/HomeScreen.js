import { StatusBar } from "expo-status-bar";
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
                    <Text> Select Algorithm Catagory below! </Text>
                    <Text> Select Algorithm Catagory below! </Text>
                    <Text> Select Algorithm Catagory below! </Text>
                    <Text> Select Algorithm Catagory below! </Text>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Sorting")}><Text>Sorting</Text></TouchableOpacity>
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