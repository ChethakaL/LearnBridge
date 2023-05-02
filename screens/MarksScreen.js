import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const MarksScreen = () => {
    const navigation = useNavigation();

    const [markData, setMarkData] = useState([])

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
      
            const response = await fetch(`http://192.168.1.5:3001/api/marks/studentmarks`, {
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
      

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <View style={styles.container}>
        <Text style={styles.Heading}>Marks</Text>
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
    },
    Heading: {
        fontFamily: 'Poppins-Bold',
        fontSize:35,
        marginTop: 60,
        marginLeft: 20,
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
    }
  });
export default MarksScreen