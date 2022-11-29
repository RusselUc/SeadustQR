import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';

import firestore from '@react-native-firebase/firestore'
import QRModal from '../components/QRModal';
import { AuthContext } from '../context/AuthProvider';
import CustomInput from '../components/CustomInput';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ModalPoup from '../components/ModalPoup';
import styles from '../constants/Styles';
import ButtonModal from '../components/ButtonModal';


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

  const navigation = useNavigation();

  const closeModal = () => {
    navigation.navigate('ScreenList')
    cleanInputs()
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
      if (!emptyInput()) {
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
    if(!emptyInput()) {
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
      cleanInputs()
    }
  }

  const emptyInput = () => {
    if (!codeProduct.trim()) {
      setEmpty(true)
      return true
    } else if(!productname.trim()){
      setEmpty(true)
      return true
    } else if (!description.trim()) {
      setEmpty(true)
      return true
    } else if (!numPiece.trim()) {
      setEmpty(true)
      return true
    } else if (!uso.trim()) {
      setEmpty(true)
      return true
    } else if(!name.trim()){
      setEmpty(true)
      return true
    }
  }

  const cleanInputs = () => {
    setCodeProduct("")
    setDescription("")
    setNumPiece("")
    setUso("")
    setProductName("")
    setName("")
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

          <ButtonModal press={() => handleAddOther()} color={Colors.doradoSeadust} text="Agregar Otro"/>
          <ButtonModal press={() => handleCreate()} color={Colors.azulSeadust} text="Generar"/>

        </View>
        <QRModal isVisible={isVisible} qrString={product} press={ () => closeModal()}/>
      </ModalPoup>

    </View>
  );
};


export default ScreenPost;