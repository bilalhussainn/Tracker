import {  StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Context as AuthContext } from '../context/AuthContext'
import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { SafeAreaView } from 'react-native-safe-area-context'
//import { AppContext } from '../context/Appcontext'

const AccountScreen = ({navigation}) => {
  //const {setSignedIn} = useContext(AppContext)

  useEffect(() => {
    navigation.setOptions({
      header: () => null
    })
  
  }, []);

  const {signout} = useContext(AuthContext)
  return (
    <SafeAreaView >
    <View>

      <Text style={{fontSize: 48}}>AccountScreen</Text>

      <Spacer>
        <Button title="SignOut" onPress={() => {
        // setSignedIn(false);
        signout()
        }} /> 
      </Spacer>
    </View>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})