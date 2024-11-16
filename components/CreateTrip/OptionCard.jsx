import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectedOptions}) {
  return (
    <View style={[{
        padding:25,
        display:"flex",
        flexDirection:"row",
        backgroundColor:"#e3e8e5",
        justifyContent:"space-between",
        borderRadius:16
    },selectedOptions?.id==option?.id&&{borderWidth:2}]}>
    <View>
        <Text style={{fontSize:20, fontFamily:'outfit-bold'}}>{option?.title}</Text>
        <Text style={{fontSize:17, fontFamily:'outfit',color:"gray"}}>{option?.desc}</Text>
    </View>
    <Text style={{fontSize:30}}>{option.icon}</Text>
    </View>
  )
}