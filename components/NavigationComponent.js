import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {HomeIcon, CalendarIcon,AcademicCapIcon,ClipboardDocumentIcon,UserCircleIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
const NavigationComponent = () => {

    const navigation = useNavigation();

    const HomePress = () => {
        navigation.navigate('Home')
      }
      const SchedulePress = () => {
        navigation.navigate('Schedule')
      }
      const MaterialPress = () => {
        navigation.navigate('Material')
      }
      const MarksPress = () => {
        navigation.navigate('Marks')
      }
      const StudentProfile = () => {
        navigation.navigate('StudentProfile')
      }
  return (
    <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={HomePress}>
            <HomeIcon size={40} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={SchedulePress}>
            <CalendarIcon size={40} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={MaterialPress}>
            <AcademicCapIcon size={40} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={MarksPress}>
            <ClipboardDocumentIcon size={40} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={StudentProfile}>
            <UserCircleIcon size={40} color='black'/>
        </TouchableOpacity>
        
      </View>
  )
}

const styles = StyleSheet.create({
    bottomNavigation:{
        width:'100%',
        height:100,
        backgroundColor:'rgba(37, 93, 172, 0.1)',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    }
})
export default NavigationComponent