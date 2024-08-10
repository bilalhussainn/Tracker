import React, { useContext, useEffect } from 'react'
import { Context as AuthContext } from '../context/AuthContext'
import { Text } from 'react-native-elements'

//we dont need this to check local sign in. as we use v6 we check it in usEffect in App.js (tryLocalSignin)
const ResolveAuth = () => {
    const {tryLocalSignin} = useContext(AuthContext)

    useEffect(() => {
        tryLocalSignin();
    }, [])

  return null; //<><Text style={{fontSize: 54}}>Hello</Text></>;
}

export default ResolveAuth