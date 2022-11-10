import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

import firestore from '@react-native-firebase/firestore'
import QRCode from 'react-native-qrcode-svg';
import QRModal from '../components/QRModal';
import ModalLayout from '../components/ModalLayout';
import { AuthContext } from '../context/AuthProvider';


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ScreenPost = ({ visible, setVisible }) => {

  const [codeProduct, setCodeProduct] = useState("")
  const [description, setDescription] = useState("")
  const [numPiece, setNumPiece] = useState("")
  const [uso, setUso] = useState("")
  const [name, setName] = useState("")
  const [isVisible, setisVisible] = useState(false)
  const [product, setProduct] = useState(false)

  const navigation = useNavigation();

  const {user} = useContext(AuthContext)

  const closeModal = () => {
    navigation.navigate('Home')
    setVisible(false)
  }

  const handleCreate = () => {
    try {
      firestore().collection(user.email).add({
        codeProduct,
        description,
        numPiece,
        uso,
        name,
        date: Date.now()
      }).then((docRef) => {
        setProduct(docRef.id)
        setisVisible(true)
      })
    } catch (error) {
      alert(error)
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>Requisición de materiales</Text>
            <TouchableOpacity onPress={() => closeModal()}>
              <Icon name='close' style={{ fontSize: 25 }} />
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder='Código del solicitante'
          style={{ backgroundColor: 'rgb(220,220,220)', borderRadius: 100, paddingHorizontal: 10, marginBottom: 10 }}
          onChangeText={(text) => setCodeProduct(text)}
        />
        <TextInput
          placeholder='Descripción'
          style={{ backgroundColor: 'rgb(220,220,220)', borderRadius: 100, paddingHorizontal: 10, marginBottom: 10 }}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          placeholder='No. piezas'
          style={{ backgroundColor: 'rgb(220,220,220)', borderRadius: 100, paddingHorizontal: 10, marginBottom: 10 }}
          onChangeText={(text) => setNumPiece(text)}
        />
        <TextInput
          placeholder='Uso'
          style={{ backgroundColor: 'rgb(220,220,220)', borderRadius: 100, paddingHorizontal: 10, marginBottom: 10 }}
          onChangeText={(text) => setUso(text)}
        />
        <TextInput
          placeholder='Nombre del solicitante'
          style={{ backgroundColor: 'rgb(220,220,220)', borderRadius: 100, paddingHorizontal: 10, marginBottom: 10 }}
          onChangeText={(text) => setName(text)}
        />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={
              {
                backgroundColor: Colors.primaryLite,
                borderRadius: 100,
                alignItems: 'center',
                width: 120,
                paddingVertical: 5,
                marginVertical: 10,
                marginRight: 30
              }
            }>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Agregar otro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              {
                backgroundColor: Colors.green,
                borderRadius: 100,
                alignItems: 'center',
                width: 120,
                paddingVertical: 5,
                marginVertical: 10,
              }
            }
            onPress={() => handleCreate()}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Generar
            </Text>
          </TouchableOpacity>
        </View>

      {/* <Modal
          transparent={true}
          animationType='fade'
          visible={isVisible}
        >
          <QRModal press={handle}/>
        </Modal> */}

        <ModalLayout visible={isVisible}>
          <View style={{alignItems:'center'}}>
            <QRCode value={product} size={180}/>
            <TouchableOpacity
              style={
                {
                  backgroundColor: Colors.green,
                  borderRadius: 100,
                  alignItems: 'center',
                  width: 120,
                  paddingVertical: 5,
                  marginVertical: 10,
                }
              }
              onPress={() => setisVisible(false)}
            >
              <Text style={{color:'white'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </ModalLayout>
      </ModalPoup>

    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 20
  },
});

export default ScreenPost;