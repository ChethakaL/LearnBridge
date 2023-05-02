import React, { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';
import * as FileSystem from 'expo-file-system';

// Images
import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const MaterialScreen = () => {
    const navigation = useNavigation();

    const [isLectureVisible, setIsLectureVisible] = useState(true);
    const [isCourseVisible, setIsCourseVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedModule, setSelectedModule] = useState("");

  
    const [materials, setMaterials] = useState([]);

    const handleModuleSelection = (moduleName) => {
        setSelectedModule(moduleName);
      };
  
      const filteredMaterials = materials.filter((material) =>
      selectedModule === "" || material.moduleName === selectedModule ? true : false
    );
    
    const renderFilteredMaterials = (category) => {
        return filteredMaterials
          .filter((material) => material.category === category)
          .map((item) => (
            <TouchableOpacity onPress={() => downloadMaterial(item._id)} key={item._id}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          ));
      };

  
    useEffect(() => {
      fetchMaterials();
    }, []);
  
    const fetchMaterials = async () => {
      try {
        const response = await fetch('http://192.168.1.5:3001/api/materials');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
  
    const downloadMaterial = async (id) => {
      const localUri = FileSystem.documentDirectory + id + '.pdf';
      const serverUri = `http://192.168.1.5:3001/api/materials/download/${id}`;
  
      try {
        const { uri } = await FileSystem.downloadAsync(serverUri, localUri);
        console.log('File saved to', uri);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => downloadMaterial(item._id)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  
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
      });
    }, []);

  const renderSection = ({ item }) => {
    switch (item.key) {
      case "modules":
        return (
          <>
            <Text style={[{ marginTop: 60 }, styles.Heading]}>Modules</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ padding: 20 }}
            >
              <ModuleComponent
                image={madImage}
                title="Mobile Application Development"
                onPress={() =>
                  handleModuleSelection("Mobile Application Development")
                }
              />
              <ModuleComponent
                image={softwareDev}
                title="Software Development Tools"
                onPress={() =>
                  handleModuleSelection("Software Development Tools")
                }
              />
            </ScrollView>
          </>
        );
      case "lectures":
        return (
          <>
            <Text style={styles.Heading}>Learning Materials</Text>
            {/* Lectures */}
            <TouchableOpacity
              style={styles.button}
              onPress={toggleLectureVisibility}
            >
              <Text
                style={{ fontFamily: "Poppins-SemiBold", fontSize: 24, paddingLeft: 20 }}
              >
                Lectures
              </Text>
            </TouchableOpacity>
            {isLectureVisible && (
              <View style={styles.box}>
                {renderFilteredMaterials("Lecture")}
              </View>
            )}
          </>
        );
      case "coursework":
        return (
          <>
            {/*Coursework*/}
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCourseVisibility}
            >
              <Text
                style={{ fontFamily: "Poppins-SemiBold", fontSize: 24, paddingLeft: 20 }}
              >
                Coursework
              </Text>
            </TouchableOpacity>
            {isCourseVisible && (
              <View style={styles.box}>
                {renderFilteredMaterials("Coursework")}
              </View>
            )}
          </>
        );
      case 'inclassTest':
        return (
          <>
            {/* InclassTAest */}
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCourseVisibility}
            >
              <Text
                style={{ fontFamily: "Poppins-SemiBold", fontSize: 24, paddingLeft: 20 }}
              >
                Inclass Test
              </Text>
            </TouchableOpacity>
            {isCourseVisible && (
              <View style={[{marginTop:130},styles.box]}>
                {renderFilteredMaterials("InclassTest")}
              </View>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'modules' },
          { key: 'lectures' },
          { key: 'coursework' },
          { key: 'inclassTest' },
        ]}
        renderItem={renderSection}
        ListFooterComponent={<NavigationComponent/>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  Heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 35,
    margin: 20,
  },
  button: {
    width: '100%',
  },
  box: {
    width: '100%',
    padding: 20,
  },
});

export default MaterialScreen;

