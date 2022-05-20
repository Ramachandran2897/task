import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import {View, Text, SafeAreaView} from 'react-native'
const ViewScreen = (props)=>{
    const [data, setData] = useState({})
    useFocusEffect(useCallback(()=>{
        axios.get(props.route.params.itemId).then((res)=>{
            setData(res.data)
        }).catch((error)=>{

        })
    },[]))
    return(
        <SafeAreaView>
            <Text>{`name: ${data.name}  \nGender: ${data.gender}`}</Text>
        </SafeAreaView>
    )
}
export default ViewScreen