import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Spacer from './Spacer'

const NavLink = ({text, routeName}) => {

    const navigation = useNavigation() // latest alternative for withNavigation on v4 and below.

    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue'
      }
})

export default NavLink