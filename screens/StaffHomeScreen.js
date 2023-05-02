import { View, Text, StyleSheet,SafeAreaView,ScrollView,Image, TouchableOpacity} from 'react-native'
import React, {useLayoutEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native'

const StaffHomeScreen = () => {

    const navigation = useNavigation();

    const SchedulePress = () => {
        navigation.navigate('StaffSchedule')
    }
    
    const MaterialsPress = () => {
      navigation.navigate('StaffMaterial')
    }

    const MarksPress = () => {
      navigation.navigate('StaffMarks')
    }

    const StudentProfile = () => {
      navigation.navigate('StaffProfile')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Heading}>Staff Home</Text>
      <ScrollView 
      style={{height: '70%'}}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        alignItems: 'center'
      }}
      vertical
      showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={SchedulePress} style={{width:'70%', height: '18%'}}>
            <Image style={{width:'100%', height:'100%'}}source={require('../assets/Schedule.png')}/>
        </TouchableOpacity> 
        <TouchableOpacity onPress={MaterialsPress} style={{width:'70%', height: '18%'}}>
            <Image style={{marginTop:40 ,width:'100%', height:'100%'}}source={require('../assets/Materials.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={MarksPress} style={{width:'70%', height: '18%'}}>
            <Image style={{marginTop:80,width:'100%', height:'100%'}}source={require('../assets/Marks.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={StudentProfile} style={{width:'70%', height:'18%'}}>
            <Image style={{marginTop:120, width:'100%', height:'100%'}} source={require('../assets/UserProfile.png')}/>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    Heading:{
        fontFamily: 'Poppins-Bold',
        fontSize:35,
        margin: 20,
    }
})
export default StaffHomeScreen