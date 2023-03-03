import React,{useState} from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker'

import { Table, Row, Rows } from 'react-native-table-component';


const MainScreen = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [tableHead,setTableHead]=useState(['Head', 'Head2', 'Head3', 'Head4']);
    const [tableData,settableData]=useState([
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ])
    return(
        <View>
          <View style={{marginTop:40,flexDirection:'row',justifyContent:'space-between',marginLeft:10,marginRight:15,paddingBottom:20,borderBottomWidth:1,borderBottomColor:"#d3d3d3"}}>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:32,fontWeight:'400'}}>Welcome,</Text>
              <Text style={{fontSize:22,fontWeight:'400'}}>Micheal</Text>
            </View>
          </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start',marginTop:20,justifyContent:'flex-start',marginLeft:10}}>
                <TouchableOpacity  onPress={()=>navigation.navigate("NewOrder")} style={styles.item}>
                    <Text style={styles.title}>New Order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("OrderHistory")} style={styles.item}>
                    <Text style={styles.title}>Order History</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate("PriceList")} style={styles.item}>
                    <Text style={styles.title}>PriceList</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal:20,
      marginTop:200,
    },
    item: {
        width:"45%",
        height:100,
        backgroundColor: '#c8e1ff', //#f9c2ff
        borderWidth:1,
        borderColor:"cornflowerblue",
        borderRadius:14,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 5,
        justifyContent:'center',
        alignItems:'center'
      },
      title:{
        fontSize:20,
        fontWeight:'bold'
      },
      head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 }
  });
  


export default MainScreen;