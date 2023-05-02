import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import {PlusCircleIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import superagent from 'superagent';



const StaffScheduleScreen = () => {
    const navigation = useNavigation();

    const [selectedDay, setSelectedDay] = useState('Mon');
    const [scheduleData, setScheduleData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [batch, setBatch] = useState('');
    const [degree, setDegree] = useState('');
    const [staffId, setStaffId] = useState('');


    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
    
          const response = await fetch(`http://192.168.1.5:3001/api/schedule/staffschedule?day=${selectedDay}`, {
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

    const addAssignment = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
      
          const response = await superagent.post('http://192.168.1.5:3001/api/schedule')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
              day,
              startTime,
              endTime,
              moduleName,
              batch,
              degree,
              staffId,
            });
      
          const newSchedule = response.body;
          console.log('New assignment created:', newSchedule);
          setScheduleData([...schedules, newSchedule]);
        } catch (error) {
          console.log('Error adding assignment:', error);
        }
      };

      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const handleSubmitForm = async () => {
        // Handle form submission logic here
        setModalVisible(false);
      };

      
  return (
    <View style={{height:'100%'}}>
        {/* Modal */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <BlurView style={styles.blurView} intensity={100} tint="light">
            <View style={styles.modalView}>
            {/* Form fields */}
            <Text style={styles.modalText}>Add Schedule</Text>
            <TextInput
                style={styles.input}
                placeholder="Day"
                onChangeText={(text) => setDay(text)}
                value={day}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Time"
                onChangeText={(text) => setStartTime(text)}
                value={startTime}
            />
            <TextInput
                style={styles.input}
                placeholder="End Time"
                onChangeText={(text) => setEndTime(text)}
                value={endTime}
            />
            <TextInput
                style={styles.input}
                placeholder="Module Name"
                onChangeText={(text) => setModuleName(text)}
                value={moduleName}
            />
            <TextInput
                style={styles.input}
                placeholder="Batch"
                onChangeText={(text) => setBatch(text)}
                value={batch}
            />
            <TextInput
                style={styles.input}
                placeholder="Degree"
                onChangeText={(text) => setDegree(text)}
                value={degree}
            />
            <TextInput
                style={styles.input}
                placeholder="Staff ID"
                onChangeText={(text) => setStaffId(text)}
                value={staffId}
            />

            {/* Submit and Cancel buttons */}
            <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                style={{ ...styles.addButton, backgroundColor: '#2196F3' }}
                onPress={addAssignment}
                >
                <Text style={styles.addButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{ ...styles.modalCloseButton, backgroundColor: '#f44336' }}
                onPress={() => setModalVisible(false)}
                >
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </View>
        </BlurView>
        </Modal>
    {/* Modal End */}
      <ScrollView 
            style={{ height: '78%', marginTop:40, }}
            contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 15,
            }}
            verticle
            showsVerticalScrollIndicator={false}>
            <View style={{width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                 <Text style={styles.Heading}>Lecture Schedule</Text>
                 <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <PlusCircleIcon size={40}/>
                 </TouchableOpacity>
            </View>
       
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
blurView: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }, 
centeredView: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width:'80%',
    height:'62%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText:{
    fontFamily:'Poppins-SemiBold',
    fontSize:30,
  },
  modalCloseButton: {
    backgroundColor: "#52B788",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#52B788",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

})
export default StaffScheduleScreen