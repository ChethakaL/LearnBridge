import { SafeAreaView, Text, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {MapPinIcon, PhoneIcon,EnvelopeIcon,TagIcon,UserCircleIcon,IdentificationIcon,CalendarDaysIcon, AcademicCapIcon, FingerPrintIcon} from 'react-native-heroicons/solid'
import NavigationComponent from '../components/NavigationComponent';


const StudentProfile = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Student Profile</Text>
      <View style={{flexDirection:'column', marginTop:20,}}>
        <View style={styles.TextInputContainer}>
            <FingerPrintIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Student ID'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <UserCircleIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Name'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <EnvelopeIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Email'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <PhoneIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Phone No.'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <MapPinIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Location'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <IdentificationIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='NIC'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <CalendarDaysIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Date Of Birth'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <AcademicCapIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Degree'
            />
        </View>
        <View style={styles.TextInputContainer}>
            <TagIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                placeholder='Batch'
            />
        </View>
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
    },
    TextInputContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginBottom:20,
    },
    textInput: {
        color: 'black',
        padding: 20,
        width: 350,
        height:50,
        backgroundColor: 'rgba(217,217,217,0.4)',
        borderRadius: 10,
    },
})
export default StudentProfile