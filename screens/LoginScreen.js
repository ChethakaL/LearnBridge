import { View, Text, Image, StyleSheet,Pressable, TextInput,SafeAreaView } from 'react-native'
import React, {useLayoutEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native'
import superagent from 'superagent';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = () => {

    const navigation = useNavigation();
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [userType, setUserType] = useState('student');
    const [studentActive, setStudentActive] = useState(true);
    const [staffActive, setStaffActive] = useState(false);

    // Login Backend

    const handlePress = async () => {
      try {
        const response = await superagent
          .post(userType === 'student' ? 'http://192.168.1.5:3001/api/user/login' : 'http://192.168.1.5:3001/api/staff/login')
          .send({ username, password });
    
        if (response.status === 200) {
          await AsyncStorage.setItem('token', response.body.token);
          // Save the user data (and token, if applicable) to local storage or state management
          // localStorage.setItem('userInfo', JSON.stringify(response.body.user));
          // Navigate to the 'Home' screen
          if(userType == 'student'){
              navigation.navigate('Home');
          }else{
              navigation.navigate('StaffHome');
          }
    
        } else {
          // Display error message
          console.error('Error during authentication:', response.body.message);
        }
      } catch (error) {
        console.error('Error during authentication:', error.message);
      }
  };
      

    const HomePress = () => {
        if (userType === 'student') {
          navigation.navigate('Home');
        } else if (userType === 'staff') {
          navigation.navigate('StaffHome');
        }
      };

      const handleStudentPress = () => {
        setStudentActive(true);
        setStaffActive(false);
        setUserType('student');
      };
    
      const handleStaffPress = () => {
        setStudentActive(false);
        setStaffActive(true);
        setUserType('staff');
      };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <SafeAreaView style={styles.container}>
        <Image style={{marginTop:50,}} source={require('../assets/login.png')}/>
        <Text style={styles.Heading}>Login</Text>
        <View style={styles.headingContainer}>
            <Pressable style={[styles.grayBtn, studentActive && styles.activeBtn]} onPress={handleStudentPress}>
                <Text style={{color: 'white', fontWeight:800,fontFamily: 'Poppins-SemiBold',}}>Student</Text>
            </Pressable>
            <Pressable style={[styles.grayBtn, staffActive && styles.activeBtn]} onPress={handleStaffPress}>
                <Text style={{color: 'white', fontWeight:800,fontFamily: 'Poppins-SemiBold',}}>Staff</Text>
            </Pressable>
        </View>
        <TextInput 
            style={styles.textInput}
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <TextInput 
            style={styles.textInput}
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}

        />
        <Pressable style={[{marginTop:20} ,styles.loginBtn]} onPress={handlePress}>
            <Text style={{color:'white', fontWeight:800, fontSize:20}}>Login</Text>
        </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        flexDirection:'column',
        alignItems:'center',
    },
    Heading:{
        fontWeight: 800,
        fontSize: 45,
        fontFamily: 'Poppins-Bold',
    },
    headingContainer:{
        width: '70%',
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop:30,
    },
    blueBtn: {
        width: 120,
        height: 60,
        backgroundColor: "#0909FF",
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeBtn: {
        width: 120,
        height: 60,
        backgroundColor: "#0909FF",
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grayBtn: {
        width: 120,
        height: 60,
        backgroundColor: "gray",
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        color: 'black',
        padding: 20,
        width: 350,
        height:50,
        backgroundColor: 'rgba(217,217,217,0.4)',
        borderRadius: 10,
        marginTop: 20,
    },
    loginBtn:{
        width: 170,
        height: 70,
        backgroundColor: "#0909FF",
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default LoginScreen