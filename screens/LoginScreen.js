import { View, Text, Image, StyleSheet,Pressable, TextInput,SafeAreaView } from 'react-native'
import React, {useLayoutEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {

    const navigation = useNavigation();
    
    const [username,setUsername] = useState('');

    const HomePress = () => {
        navigation.navigate('Home')
      }

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
            <Pressable style={styles.blueBtn}>
                <Text style={{color: 'white', fontWeight:800,fontFamily: 'Poppins-SemiBold',}}>Student</Text>
            </Pressable>
            <Pressable style={styles.blueBtn}>
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
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <Pressable style={[{marginTop:20} ,styles.loginBtn]} onPress={HomePress}>
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