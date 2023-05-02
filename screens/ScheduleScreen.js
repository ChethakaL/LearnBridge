import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ScheduleScreen = () => {
    const navigation = useNavigation();

    const [selectedDay, setSelectedDay] = useState('Mon');
    const [scheduleData, setScheduleData] = useState([])

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
    
          const response = await fetch(`http://192.168.1.5:3001/api/schedule/userschedule?day=${selectedDay}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
    
          const data = await response.json();
          const formattedData = data.map((item) => ({
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime,
            moduleName: item.moduleName,
            batch: item.batch,
            degree:item.degree
          }));
          setScheduleData(formattedData);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
    
      fetchProfile();
    }, [selectedDay]);

      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={{height:'100%'}}>
      <ScrollView 
            style={{ height: '78%', marginTop:40, }}
            contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 15,
            }}
            verticle
            showsVerticalScrollIndicator={false}>
        <Text style={styles.Heading}>Lecture Schedule</Text>
        <View style={styles.DateContainer}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                {
                  width: '19%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: day === selectedDay ? '#0075FF' : 'transparent',
                },
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.date, { color: day === selectedDay ? 'white' : 'black' }]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Time Schedule */}
        <View style={{marginTop:40}}>
        {scheduleData.map((data, index) => (
            <View style={styles.detailContainer} key={index}>
                <View style={styles.timeContainer}>
                    <Text style={{fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>{data.startTime}-{data.endTime}</Text>
                </View>
                <View style={styles.moduleContainer}>
                    <Text style={{width:'90%',fontFamily:'Poppins-SemiBold', color:'white', fontSize:25,}}>{data.moduleName}</Text>
                </View>
            </View>
          ))}
        </View>
      </ScrollView>
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