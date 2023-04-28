import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';

// Images
import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const MarksScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={styles.container}>
        {/* Modules */}
        <Text style={[{marginTop:60},styles.Heading]}>Modules</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 20 }}>
            <ModuleComponent image={madImage} title='Mobile Application Development' />
            <ModuleComponent image={softwareDev} title='Software Development Tools' />
        </ScrollView>
        {/* Marks */}
        <Text style={styles.Heading}>Marks</Text>
        <View style={styles.GrayContainer}>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:20, paddingTop:40,}}>Exam Score: </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:20, paddingTop:40,}}>Coursework Score: </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:20, paddingTop:40,}}>Presentation Score: </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:20, paddingTop:40,}}>Final Grade: </Text>
        </View>
        <NavigationComponent/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    Heading: {
        fontFamily: 'Poppins-Bold',
        fontSize:35,
        margin: 20,
    },
    GrayContainer:{
        width:'90%',
        height: '40%',
        backgroundColor:'#DBDADA',
        borderRadius:40,
        marginLeft:20,
        marginBottom:20,
        padding:20,
    }
  });
export default MarksScreen