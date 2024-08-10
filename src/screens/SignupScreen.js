import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
//import { AppContext } from '../context/Appcontext' //own idea
import {Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { useIsFocused } from '@react-navigation/native'

const SignupScreen = ({navigation}) => {
  //const {setSignedIn} = useContext(AppContext)

  const {state, signup, clearErrorMessage} = useContext(AuthContext)

  console.log("State", state);

  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      header: () => null
    })
    
    //Method 1 to clear error message when navigating to other screen(sing up)
    // navigation.addListener('blur', () => {
    //   clearErrorMessage();
    // })

  
  }, []);

  //Methd 2 to clear error message when navigating to other screen 
  useEffect(() => {
    console.log("SINGUP focus", isFocused);
    
    if(!isFocused){
      clearErrorMessage()
    }
  }, [isFocused]);
  
  return (
    <View style={styles.container}> 

        <AuthForm 
          headerText={"Sign UP for Tracker!"}
          errorMessage={state.errorMessage}
          submitButtonText="Sign Up"
          // onSubmit={(email, password) => {
          //   signup(email, password)
          // }}
          onSubmit={signup}// same as above
          />

          <NavLink routeName={'SignIn'} text={'Already have an account? Sign in instead'}/>

    </View>
    // <View>
    //     <TouchableOpacity onPress={() => {
    //         navigation.navigate('SignIn')
    //     }} >
    //   <Text style={{fontSize: 48}}>SignupScreen</Text>
    //   <Button title="Go to Main Menu" onPress={() => setSignedIn(true)}></Button>
    //   </TouchableOpacity>
    // </View>
  )
}


const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 10,
    flex:1,
    justifyContent: 'center',
    marginBottom: 200
  }
})

export default SignupScreen