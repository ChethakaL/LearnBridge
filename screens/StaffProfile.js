import { SafeAreaView, Text, StyleSheet, ScrollView, View, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {MapPinIcon, PhoneIcon,EnvelopeIcon,TagIcon,UserCircleIcon,IdentificationIcon,CalendarDaysIcon, AcademicCapIcon, FingerPrintIcon} from 'react-native-heroicons/solid'
import NavigationComponent from '../components/NavigationComponent';
import superagent from 'superagent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StaffProfile = () => {
    const navigation = useNavigation();

    const [profileData, setProfileData] = useState({
        staffId: '',
        username: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        nic:'',
        faculty:'',
        dob: '',
        role:'',
        nic: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
      
            const response = await fetch(`http://192.168.1.5:3001/api/staff/profile`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
            setProfileData(data);
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
      <Text style={styles.Heading}>Student Profile</Text>
      <View style={{flexDirection:'column', marginTop:20,}}>
        <View style={styles.TextInputContainer}>
            <FingerPrintIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.staffId}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <UserCircleIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.name}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <EnvelopeIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.email}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <PhoneIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.phone}

            />
        </View>
        <View style={styles.TextInputContainer}>
            <MapPinIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.address}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <IdentificationIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.nic}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <CalendarDaysIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.dob}
            />
        </View>
        <View style={styles.TextInputContainer}>
            <AcademicCapIcon  size={40} color='#0075FF'/>
            <TextInput 
                style={styles.textInput}
                value={profileData.role}
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
export default StaffProfile