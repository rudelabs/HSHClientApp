import React,{useState} from 'react';
import {View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
const {width,height}=Dimensions.get('window');
import DatePicker from 'react-native-date-picker'


const PriceList = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return(
        <ScrollView>
            
            <View style={{marginTop:40,paddingLeft:15,paddingRight:15}}>
                <Text style={{fontSize:32,fontWeight:'400'}}>Price List</Text>
                <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10,paddingBottom:10,borderBottomColor:'#d3d3d3',borderBottomWidth:1}}>
                    <View>
                        <Text style={{fontSize:20}}>{date.getDate()+'/'+date.getMonth()+"/"+date.getFullYear()}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => setOpen(true)} >
                        <Text style={{fontSize:20,fontWeight:'400',color:"cornflowerblue"}}>Set Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,marginTop:20,backgroundColor:'#c8e1ff',padding:15}}>
                    <Text style={{fontSize:22,fontWeight:'400'}}>Diesel Loose</Text>
                    <Text style={{fontSize:42,marginTop:10}}>$1.00</Text>
                </View>
                
                <View style={{flex:1,marginTop:20,backgroundColor:'#c8e1ff',padding:15}}>
                    <Text style={{fontSize:22,fontWeight:'400'}}>Diesel Bulk</Text>
                    <Text style={{fontSize:42,marginTop:10}}>$1.00</Text>
                </View>
            </View>
            
        
            
            <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />    
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:20,
      marginTop:100

    },
  });
  

export default PriceList;