import React, { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationComponent from '../components/NavigationComponent';
import ModuleComponent from '../components/ModuleComponent';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import {PlusCircleIcon} from 'react-native-heroicons/outline'
import superagent from 'superagent';


// Images
import madImage from '../assets/MAD.png';
import softwareDev from '../assets/SoftwarePractice.png';

const StaffMaterialScreen = () => {
    const navigation = useNavigation();

    const [isLectureVisible, setIsLectureVisible] = useState(true);
    const [isCourseVisible, setIsCourseVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedModule, setSelectedModule] = useState("");

    // Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [batch, setBatch] = useState('');
    const [degree, setDegree] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [category, setCategory] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleSubmitForm = async () => {
        // Handle form submission logic here
        setModalVisible(false);
      };

      const pickDocument = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({});
          if (result.type === 'success') {
            setFilePath(result.uri);
          }
        } catch (err) {
          console.error('Error picking document:', err);
        }
      };
  
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

      const handleSubmit = async () => {
        try {
          if (!title || !description || !batch || !degree || !moduleName || !category || !filePath) {
            Alert.alert('Error', 'Please fill all fields and select a document.');
            return;
          }
      
          const apiUrl = 'http://192.168.1.5:3001/api/materials';
          const base64Data = await FileSystem.readAsStringAsync(filePath, { encoding: 'base64' });
      
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('batch', batch);
          formData.append('degree', degree);
          formData.append('moduleName', moduleName);
          formData.append('category', category);
      
          formData.append('file', {
            uri: Platform.OS === 'android' ? filePath : filePath.replace('file://', ''),
            name: 'document', // Replace with the actual file name if available
            type: 'application/pdf', // Replace with the actual file type if different
          });
      
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              // Add any necessary headers here, e.g., the authorization header
            },
            body: formData,
          });
      
          if (response.status === 201) {
            const data = await response.json();
            Alert.alert('Success', 'Material uploaded successfully.');
            console.log(data);
          } else {
            const error = await response.text();
            Alert.alert('Error', `Error uploading material: ${error}`);
          }
        } catch (error) {
          Alert.alert('Error', `Error uploading material: ${error.message}`);
          console.error('Error uploading material:', error);
        }
      };
      

    useEffect(() => {
      fetchMaterials();
    }, []);
  
    const fetchMaterials = async () => {
      try {
        const response = await fetch('http://192.168.1.5:3001/api/materials/getmaterials');
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
            <View style={{width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                 <Text style={styles.Heading}>Lecture Schedule</Text>
                 <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <PlusCircleIcon size={40}/>
                 </TouchableOpacity>
            </View>
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
            <Text style={styles.modalText}>Add Lecture Material</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <TextInput
                style={styles.input}
                placeholder="description"
                onChangeText={(text) => setDescription(text)}
                value={description}
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
                placeholder="Module Name"
                onChangeText={(text) => setModuleName(text)}
                value={moduleName}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                onChangeText={(text) => setCategory(text)}
                value={category}
            />
            <TouchableOpacity onPress={pickDocument} style={styles.fileButton}>
                <Text style={styles.fileButtonText}>Pick a document</Text>
            </TouchableOpacity>

            {/* Submit and Cancel buttons */}
            <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                style={{ ...styles.addButton, backgroundColor: '#2196F3' }}
                // Add Lecture
                onPress={handleSubmit}
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
  fileButton:{
    backgroundColor: '#0075FF',
    padding: 8,
    margin:20,
    borderRadius: 4,
  },
  fileButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },

});

export default StaffMaterialScreen;

