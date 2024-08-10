import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { Context as AuthContext } from '../context/AuthContext'
import { useIsFocused } from '@react-navigation/native'
//import { AppContext } from '../context/Appcontext';

const SigninScreen = ({navigation}) => {
  // const context = useContext(AppContext);

  const {state, signin, clearErrorMessage} = useContext(AuthContext)

  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      header: () => null
    })

    //Method 1 to clear error message when navigating to other screen(sing up)
    navigation.addListener('blur', () => {
      clearErrorMessage();
    })
  }, [])

  //Methd 2 to clear error message when navigating to other screen 
  //ToDo . some error here below code is not working check lated
  // useEffect(() => {
  //   console.log("SignIn isFocused", isFocused);
    
  //   if(!isFocused){
  //     clearErrorMessage();
  //   }

  // }, [isFocused])



  return (
    <View style={styles.container}>

      <AuthForm 
          headerText={"Sing In To Your Account"}
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText={"Sign In"}
      />

      <NavLink text={"Don't have an account. Sign Up instead"} routeName={"SignUp"}/>


        {/* <TouchableOpacity onPress={() => {
           // navigation.navigate("Track")
           //context.setSignedIn(true)
        }}>
            <Text style={{fontSize: 48}}>SigninScreen</Text>
        </TouchableOpacity>
       */}
    </View>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    marginBottom: 200
  }

})