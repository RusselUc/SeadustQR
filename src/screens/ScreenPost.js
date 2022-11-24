import React, { useState, useContext, useEffect } from 'react';
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
import CustomInput from '../components/CustomInput';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  const { user } = useContext(AuthContext)

  const [codeProduct, setCodeProduct] = useState("")
  const [productname, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [numPiece, setNumPiece] = useState("")
  const [uso, setUso] = useState("")
  const [name, setName] = useState("")

  const [isVisible, setisVisible] = useState(false)
  const [product, setProduct] = useState(false)
  const [folio, setFolio] = useState(0)
  const [flag, setFlag] = useState(false)
  const [empty, setEmpty] = useState(false)

  const [products, setProducts] = useState([])

  const [focus, setFocus] = useState(Colors.azulSeadust)

  const navigation = useNavigation();


  const closeModal = () => {
    navigation.navigate('ScreenList')
    setCodeProduct("")
    setDescription("")
    setNumPiece("")
    setUso("")
    setProductName("")
    setProducts([])
    setFlag(false)
    setVisible(false)
    setisVisible(false)
    setEmpty(false)
  }

  const load = async () => {
    const suscriber = firestore().collection('Folio')
      .onSnapshot(querySnapshot => {
        const folioId = []

        querySnapshot.forEach(document => {
          folioId.push(
            {
              ...document.data()
            }
          )
          setFolio(folioId[0].folioId)
        })
      })
    return () => suscriber()
  }


  const handleCreate = async () => {
    try {
      if (!codeProduct.trim()) {
        console.log("vacio code product")
        setEmpty(true)
      } else if (!description.trim()) {
        console.log("vacio description")
        setEmpty(true)
      } else if (!numPiece.trim()) {
        console.log("vacio numPiece")
        setEmpty(true)
      } else if (!uso.trim()) {
        console.log("vacio uso")
        setEmpty(true)
      } else {
        setEmpty(false)
        products.push({
          codeProduct,
          productname,
          description,
          numPiece,
          uso,
          folio,
          name,
          date: Date.now(),
          success: false
        })

        products.forEach((product) => {
          firestore().collection(user.email).add(product).then((docRef) => {
            setProduct(docRef.id)
            setisVisible(true)
          })
        })
      }
    } catch (error) {
      alert(error)
    } finally {
      update()
    }
  }

  const update = () => {
    try {
      firestore().collection('Folio').doc('1').update(
        {
          folioId: folio + 1
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddOther = () => {
    if (!codeProduct.trim()) {
      console.log("vacio code product")
      setEmpty(true)
    } else if(!productname.trim()){
      setEmpty(true)
    } else if (!description.trim()) {
      console.log("vacio description")
      setEmpty(true)
    } else if (!numPiece.trim()) {
      console.log("vacio numPiece")
      setEmpty(true)
    } else if (!uso.trim()) {
      console.log("vacio uso")
      setEmpty(true)
    } else if(!name.trim()){
      setEmpty(true)
    } else {
      setEmpty(false)
      setFlag(true)
      setProducts([...products, {
        codeProduct,
        productname,
        description,
        numPiece,
        uso,
        folio,
        name,
        completed:"processing",
        date: Date.now(),
        success: false
      }])
      setCodeProduct("")
      setDescription("")
      setNumPiece("")
      setUso("")
      setProductName("")
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <Text style={{ fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(2.3), color: 'black' }}>Requisición de materiales</Text>

            {flag && (
              <View style={{ borderRadius: 20, margin: 5, backgroundColor: Colors.azulSeadust, height: responsiveHeight(2.2), width: responsiveWidth(6), alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: responsiveFontSize(1.5), marginVertical: responsiveHeight(0.1) }}>{products.length}</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => closeModal()}>
              <Icon name='close' style={{ fontSize: responsiveFontSize(3.1) }} />
            </TouchableOpacity>
          </View>
        </View>

        {
          empty && (
            <Text style={{color:Colors.red, marginBottom:responsiveHeight(1)}}> Algún campo se encuentra vacío</Text>
          )
        }
        <CustomInput
          placeholder="Codigo de material"
          onChangeText={(text) => setCodeProduct(text)}
          value={codeProduct}
          keyboardType='numeric'
        />
        <CustomInput
          placeholder="Nombre de material"
          onChangeText={(text) => setProductName(text)}
          value={productname}
        />
        <CustomInput
          placeholder="Descripción"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <CustomInput
          placeholder="No. piezas"
          keyboardType='numeric'
          onChangeText={(text) => setNumPiece(text)}
          value={numPiece}
        />
        <CustomInput
          placeholder="Uso"
          onChangeText={(text) => setUso(text)}
          value={uso}
        />
        <CustomInput
          placeholder="Nombre solicitante"
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
          <TouchableOpacity
            onPress={() => handleAddOther()}
            style={
              {
                backgroundColor: Colors.doradoSeadust,
                borderRadius: 10,
                alignItems: 'center',
                width: responsiveWidth(30),
                paddingVertical: responsiveHeight(0.5),
                marginVertical: responsiveHeight(1),
              }
            }>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontFamily: 'myriadpro-bold' }}>
              Agregar otro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              {
                backgroundColor: Colors.azulSeadust,
                borderRadius: 10,
                alignItems: 'center',
                width: responsiveWidth(30),
                paddingVertical: responsiveHeight(0.5),
                marginVertical: responsiveHeight(1),
              }
            }
            onPress={() => handleCreate()}
          >
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontFamily: 'myriadpro-bold' }}>
              Generar
            </Text>
          </TouchableOpacity>
        </View>

        <ModalLayout visible={isVisible}>
          <View style={{ alignItems: 'center' }}>
            <QRCode value={product} size={180} logo={require('../assets/image/logoNew.png')} />
            <TouchableOpacity
              style={
                {
                  backgroundColor: Colors.azulSeadust,
                  borderRadius: 100,
                  alignItems: 'center',
                  width: 120,
                  paddingVertical: 5,
                  marginVertical: 10,
                }
              }
              onPress={() => closeModal()}
            >
              <Text style={{ color: 'white', fontFamily: 'myriadpro-bold' }}>OK</Text>
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
    width: responsiveWidth(80),
    backgroundColor: 'white',
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2)
  },
});

export default ScreenPost;