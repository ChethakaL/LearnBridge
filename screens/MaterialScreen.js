import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';

// Images

import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const MaterialScreen = () => {
    const navigation = useNavigation();

    const [isLectureVisible, setIsLectureVisible] = useState(true);
    const [isCourseVisible, setIsCourseVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const toggleLectureVisibility = () => {
        setIsLectureVisible(!isLectureVisible);
    };
    const toggleCourseVisibility = () => {
        setIsCourseVisible(!isCourseVisible);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={[{marginTop:60},styles.Heading]}>Modules</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 20 }}>
                    <ModuleComponent image={madImage} title='Mobile Application Development' />
                    <ModuleComponent image={softwareDev} title='Software Development Tools' />
                </ScrollView>
                <Text style={styles.Heading}>Learning Materials</Text>
                {/* Lectures */}
                <TouchableOpacity style={styles.button} onPress={toggleLectureVisibility}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24, paddingLeft: 20, }}>Lectures</Text>
                </TouchableOpacity>
                {isLectureVisible && (
                    <View style={styles.box}>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Lecture 1</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Lecture 2</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Lecture 3</Text>
                    </View>
                )}
                {/*Coursework*/}
                <TouchableOpacity style={styles.button} onPress={toggleCourseVisibility}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24, paddingLeft: 20, }}>Coursework</Text>
                </TouchableOpacity>
                {isCourseVisible && (
                    <View style={styles.box}>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Coursework Details</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Coursework Submission</Text>
                    </View>
                )}
                {/* InclassTAest */}
                <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24, paddingLeft: 20, }}>Inclass Test</Text>
                </TouchableOpacity>
                {isVisible && (
                    <View style={styles.box}>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Inclass Test 1</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Inclass Test 2</Text>

                    </View>
                )}
            </ScrollView>
            <NavigationComponent />
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
    button:{
        width:'100%',
        
    },
    box:{
        width:'100%',
        padding: 20,
    }
  });

export default MaterialScreen