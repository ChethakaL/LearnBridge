import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';

const ScheduleScreen = () => {
    const navigation = useNavigation();

      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={{height:'100%',flexDirection:'column', justifyContent:'flex-end'}}>
      <Text style={styles.Heading}>Lecture Schedule</Text>
      {/* Date Container */}
      <View style={styles.DateContainer}>
        <View style={[{width:'19%', height:'100%', flexDirection:'row',alignItems:'center', justifyContent:'center',backgroundColor:'#0075FF',}]}>
            <Text style={[styles.date,{color:'white'}]}>Mon</Text>
        </View>
        <View style={{width:'18%'}}>
            <Text style={styles.date}>Tue</Text>
        </View>
        <View style={{width:'18%'}}>
            <Text style={styles.date}>Wed</Text>
        </View>
        <View style={{width:'18%'}}>
            <Text style={styles.date}>Thur</Text>
        </View>
        <View style={{width:'18%'}}>
            <Text style={styles.date}>Fri</Text>
        </View>
      </View>
      {/* Time Schedule */}
      <View style={{width:'100%',marginTop:40,marginBottom:40,}}>
         <View style={styles.detailContainer}>
            <View style={styles.timeContainer}>
                <Text style={{fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>9-11</Text>
            </View>
            <View style={styles.moduleContainer}>
                <Text style={{width:'90%',fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>Mobile Application Development</Text>
            </View>
         </View>
         <View style={styles.detailContainer}>
            <View style={styles.timeContainer}>
                <Text style={{fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>9-11</Text>
            </View>
            <View style={styles.moduleContainer}>
                <Text style={{width:'90%',fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>Web Application Development</Text>
            </View>
         </View>
         <View style={styles.detailContainer}>
            <View style={styles.timeContainer}>
                <Text style={{fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>9-11</Text>
            </View>
            <View style={styles.moduleContainer}>
                <Text style={{width:'90%',fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>Sofware Engineering II</Text>
            </View>
         </View>
      </View>
      <NavigationComponent/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'white',
},
Heading:{
    fontFamily: 'Poppins-Bold',
    fontSize:35,
    margin: 20,
},
DateContainer:{
    width:'90%',
    height:'14%',
    backgroundColor:'#D9D9D9',
    marginLeft: '5%',
    marginTop:40,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
},
date:{
    fontFamily: 'Poppins-Bold',
    fontSize:25,
},
activeDate:{
    backgroundColor: '#0075FF'
},
detailContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:30,
},
timeContainer:{
    width: 120,
    height:70,
    borderRadius:25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0075FF'
},
moduleContainer:{
    width: '65%',
    height:100,
    borderRadius:25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0, 117, 255, 0.7)'
},
})
export default ScheduleScreen