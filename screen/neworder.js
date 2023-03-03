import React,{useState} from 'react';
import {View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
const {width,height}=Dimensions.get('window');

const NewOrder = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [qt,setqt]=useState(0);
    return(
        <>
        <ScrollView>
            
            <View style={{flex:1,flexDirection:'row',marginTop:40,marginLeft:10,marginRight:5,paddingBottom:20,borderBottomWidth:1,borderBottomColor:"#d3d3d3"}}>
            <View >
              <Text style={{fontSize:32,fontWeight:'400',marginBottom:20}}>New Order</Text>
          </View>
          
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <TouchableOpacity style={[styles.item,{backgroundColor:'navy',borderRadius:4}]}>
                        <Text style={{fontSize:15,fontWeight:'400',color:"#FFF"}}>
                            <Icon name="save" size={22} /> &nbsp;
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginLeft:10,marginRight:10}}>
                <View style={{flex:1,marginTop:20,padding:5}}>
                    <Text style={{fontSize:22,color:"#000",marginBottom:10}}>Date</Text>
                    <View style={{width:(width-30),flexDirection:"row",justifyContent:'space-between',paddingRight:15}}>
                        <View>
                            <Text style={{fontSize:20,color:"#666"}}>{date.getDate()+'/'+date.getMonth()+"/"+date.getFullYear()}</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={{paddingLeft:10}} onPress={() => setOpen(true)} >
                            <Text style={{fontSize:16,fontWeight:'bold',color:"cornflowerblue"}}>Set Date</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,marginTop:45}}>
                <Text style={{fontSize:22,color:"#000",marginBottom:10}}>Site</Text>
                    <TextInput placeholder='www.example.com' style={{width:(width-30),height:40,fontSize:20}} />
                </View>
                <View style={{flex:1,marginTop:45}}>
                <Text style={{fontSize:22,color:"#000",marginBottom:10}}>Product Name</Text>
                    <TextInput placeholder='Sample' style={{width:(width-30),fontSize:20,height:40}} />
                </View>
                <View style={{flex:1,flexDirection:'row',marginTop:45}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize:22,color:"#000",marginBottom:10}}>QTY</Text>
                        <TextInput placeholder='Add Quantity'  keyboardType='numeric' style={{width:(width-30),height:60,fontSize:22}} />
                    </View>
                    
                        
                    </View>
                </View>
        
        </ScrollView>
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
        </>
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
    item:{
        width:100,height:40,backgroundColor:'#c8e1ff',justifyContent:'center',alignItems:'center',marginRight:10
    },
    title:{
        fontWeight:'400'
    }
  });
  

export default NewOrder;