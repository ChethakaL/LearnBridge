import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const ModuleComponent = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Image source={props.image} style={{width:286, height:85}}/>
        <Text style={{width:'80%',fontFamily:'Poppins-Regular', fontSize:20, padding:10}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:286, 
        height:180,
        borderRadius: '19px',
        backgroundColor:'#2111',
        marginRight: 15,
        // For iOS
        shadowColor: 'rgba(0, 0, 0, 0.31)',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        // For Android
        elevation: 5,
    }
})
export default ModuleComponent