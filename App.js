import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import React, {useLayoutEffect, useState} from 'react';
import * as Font from 'expo-font';


import LoginScreen from './screens/LoginScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import MaterialScreen from './screens/MaterialScreen';
import MarksScreen from './screens/MarksScreen';
import StudentProfile from './screens/StudentProfile';
import StaffHomeScreen from './screens/StaffHomeScreen';
import StaffScheduleScreen from './screens/StaffScheduleScreen';
import StaffMarkScreen from './screens/StaffMarkScreen';
import StaffProfile from './screens/StaffProfile';
import StaffMaterialScreen from './screens/StaffMaterialScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
      'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
      'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),

      // Add any other styles of the font here
    });
    setFontLoaded(true);
  }
  loadFonts();
  if (!fontLoaded) {
    return null; // Render nothing while the font is still loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StaffHome" component={StaffHomeScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen}/>
        <Stack.Screen name="StaffSchedule" component={StaffScheduleScreen}/>
        <Stack.Screen name="Material" component={MaterialScreen}/>
        <Stack.Screen name="StaffMaterial" component={StaffMaterialScreen}/>
        <Stack.Screen name="Marks" component={MarksScreen}/>
        <Stack.Screen name="StaffMarks" component={StaffMarkScreen}/>
        <Stack.Screen name="StudentProfile" component={StudentProfile}/>
        <Stack.Screen name="StaffProfile" component={StaffProfile}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
