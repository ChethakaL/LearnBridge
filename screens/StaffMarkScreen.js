import { SafeAreaView, Text, StyleSheet, ScrollView, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import {PlusCircleIcon} from 'react-native-heroicons/outline'
import { BlurView } from 'expo-blur';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import superagent from 'superagent';


// Images
import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const StaffMarkScreen = () => {
    const navigation = useNavigation();

    const [markData, setMarkData] = useState([])
    
    // Form
    const [modalVisible, setModalVisible] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');
    const [courseworkScore, setCourseworkScore] = useState('');
    const [presentationScore, setPresentationScore] = useState('');
    const [finalGrade, setFinalGrade] = useState('');
    const [staffId, setStaffId] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
      
            const response = await fetch(`http://192.168.1.5:3001/api/marks/staffmarks`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
            const formattedData = data.map((item) => ({
              subject: item.subject,
              marks: item.marks,
              courseworkScore: item.courseworkScore,
              presentationScore: item.presentationScore,
              finalGrade: item.finalGrade
            }));
            setMarkData(formattedData);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
      
        fetchProfile();
      }, []);
      
      const addAssignment = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
      
          const response = await superagent.post('http://192.168.1.5:3001/api/marks')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
              studentId,
              subject,
              marks,
              courseworkScore,
              presentationScore,
              finalGrade,
              staffId,
            });
      
          const newMark = response.body;
          console.log('New Marks created:', newMark);
          setMarkData([...marks, newMark]);
        } catch (error) {
          console.log('Error adding assignment:', error);
        }
      };

      const handleSubmitForm = async () => {
        // Handle form submission logic here
        setModalVisible(false);
      };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={{height:'100%'}}>
        {/* Modal Start */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <BlurView style={styles.blurView} intensity={100} tint="light">
            <View style={styles.modalView}>
            {/* Form fields */}
            <Text style={styles.modalText}>Add Marks</Text>
            <TextInput
                style={styles.input}
                placeholder="StudentId"
                onChangeText={(text) => setStudentId(text)}
                value={studentId}
            />
            <TextInput
                style={styles.input}
                placeholder="Subject"
                onChangeText={(text) => setSubject(text)}
                value={subject}
            />
            <TextInput
                style={styles.input}
                placeholder="Exam Score"
                onChangeText={(text) => setMarks(text)}
                value={marks}
            />
            <TextInput
                style={styles.input}
                placeholder="Coursework Score"
                onChangeText={(text) => setCourseworkScore(text)}
                value={courseworkScore}
            />
            <TextInput
                style={styles.input}
                placeholder="Presentation Score"
                onChangeText={(text) => setPresentationScore(text)}
                value={presentationScore}
            />
            <TextInput
                style={styles.input}
                placeholder="Final Grade"
                onChangeText={(text) => setFinalGrade(text)}
                value={finalGrade}
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
        <View style={{width:'100%', marginTop:40,flexDirection:'row',alignItems:'center', justifyContent:'space-around'}}>
            <Text style={styles.Heading}>Lecture Schedule</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
               <PlusCircleIcon size={40}/>
            </TouchableOpacity>
        </View>
        <ScrollView
            style={{ height: '78%' }}
            contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 15,
            }}
            verticle
            showsVerticalScrollIndicator={false}>
            {/* Marks */}
            {markData.map((data, index) => (
                <View style={styles.GrayContainer} key={index}>
                    <View>
                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 25, paddingTop: 20 }}>
                        {data.subject}</Text>
                        <Text style={styles.subText}>Exam Score: {data.marks}</Text>
                        <Text style={styles.subText}>Presentation Score: {data.presentationScore}</Text>
                        <Text style={styles.subText}>Coursework Score: {data.courseworkScore}</Text>
                        <Text style={styles.subText}>Final Grade: {data.finalGrade}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
        <NavigationComponent/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        height:'100%',
    },
    Heading:{
        fontFamily: 'Poppins-Bold',
        fontSize:35,
        margin: 20,
    },
    subText:{
        fontFamily: 'Poppins-SemiBold',
        fontSize:18,
        marginTop:10,
    },
    GrayContainer:{
        width:'90%',
        height: '40%',
        backgroundColor:'#DBDADA',
        borderRadius:40,
        marginTop: 10,
        marginLeft:20,
        padding:20,
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
    
  });
export default StaffMarkScreen