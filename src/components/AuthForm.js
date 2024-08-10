import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Spacer from './Spacer'
import { Button, Input, Text } from 'react-native-elements'

const AuthForm = ({headerText, onSubmit, errorMessage, submitButtonText}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <>
        <Spacer><Text h3>{headerText}</Text></Spacer>

        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} />
        <Spacer />

        <Input label="Password" value={password} onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} secureTextEntry />

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <Spacer>
        <Button title={submitButtonText} onPress={() => {
            onSubmit(email, password)
        }} />
        </Spacer> 

        
    </>
  )
}

export default AuthForm

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16, 
    color: 'red',
    marginStart: 15 
   },
})