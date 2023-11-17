import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row, Rows } from 'react-native-table-component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getUser, getDomain, setUserDetail, getlogUserFull, setVehicle } from './functions/helper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const OrderHistoryNew = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [jobOrders, setjobOrders] = useState([]);
    const [selectedDate, setselectedDate] = useState(new Date());

    useEffect(() => {
        setselectedDate(new Date())
        getOrders(formatDate(new Date()));
        getUserDetails();
    }, [])
    const getUserDetails = (date) => {
        const user = getlogUserFull();
        const domain = getDomain();
        console.log(user)
        if (user && user.company_id) {
            // setloading(true);
            const url = `${domain}/GetCompanyDetail?_token=b95909e1-d33f-469f-90c6-5a2fb1e5627c&companyId=${user.company_id}`;
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setloading(false);
                    if (data?.length > 0) {
                        console.log(data);
                        setUserDetail(data[0])
                    }
                    else {
                        // Alert.alert('Wrong credentials!')
                        setloading(false);
                    }
                })
                .catch(e => {
                    console.log('error:', e)
                    setloading(false)
                })
        }
    }
    const getOrders = (date) => {
        const user = getlogUserFull();
        const domain = getDomain();
        console.log(user)
        if (user && user.company_id) {
            setloading(true);
            const url = `${domain}/GetInvCustomer2?_token=b95909e1-d33f-469f-90c6-5a2fb1e5627c&CUST_ID=${user.company_id}&REC_DATE=${date}`;
            console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setloading(false);
                    if (data?.length > 0) {
                        console.log(data);
                        setjobOrders(data)

                    }
                    else {
                        // Alert.alert('Wrong credentials!')
                        setjobOrders([])
                        setloading(false);
                    }
                })
                .catch(e => {
                    console.log('error:', e)
                    Alert.alert('Access Denied!')
                    setloading(false)
                })
        }
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateInput, setDateInput] = useState(new Date());

    const showDatePicker = () => {
        // console.log(parameter)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", formatDate(new Date(date).toLocaleDateString()));
        getOrders(formatDate(new Date(date)))
        hideDatePicker();
        setDateInput(new Date(date));
        setselectedDate(new Date(date))

    };

    const formatDate = (inputDate) => {

        let day = inputDate.getDate();

        let month = inputDate.getMonth() + 1;

        let year = inputDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = `0${month}`;
        }

        let formatted = `${year}-${month}-${day}`;
        return formatted;
    };
    const statusColor = {
        'Pending': { color: '#EA631D', text: 'Pending' },
        'Completed': { color: '#3DB792', text: 'Completed' },
        'Delivered': { color: '#EA631D', text: 'Delivered' },
    };
    return (
        <View style={{ paddingHorizontal: 10, marginTop: 10, flex: 1 }}>

            <View style={{ borderBottomWidth: 1, borderBottomColor: "#d3d3d3", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                <Text style={{ fontSize: width / 15, fontWeight: '400' }}>Order History</Text>
                <TouchableOpacity onPress={() => {

                    AsyncStorage.removeItem('username')
                    AsyncStorage.removeItem('password')
                    navigation.replace('SignInContainer');

                }}>
                    <Text style={{ fontSize: width / 20, fontWeight: '400', color: "#01315C" }}>
                        Log Out
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity onPress={showDatePicker} style={{ borderWidth: 1, padding: 10, borderColor: 'rgba(0,0,0,0.4)', borderRadius: 5, backgroundColor: '#01315C', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <Text style={{ fontSize: width / 20, color: 'white', marginRight: 10 }}>{formatDate(selectedDate)}</Text>
                    <Icon size={20} name="calendar" color='#FFF' />
                </TouchableOpacity>
            </View>
            {loading ? (
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>
                    <ActivityIndicator size={30} />
                </View>
            ) : (

                jobOrders.length > 0 ? <ScrollView >
                    {jobOrders.map((val, index) => {
                        return <View key={index} style={{ flex: 1, marginTop: 20, marginHorizontal: 10, backgroundColor: '#c8e1ff56', padding: 15, marginBottom: index == jobOrders.length - 1 ? 100 : 0 }}>
                            <Text style={{ fontSize: 22, color: statusColor[val.JOB_STATUS_DESC].color, fontWeight: '600' }}>{val.JOB_STATUS_DESC}</Text>
                            <Text style={{ fontSize: width / 20, marginTop: 10 }}>{val.INV_NO}</Text>
                            {val.DISPLAY_NAME && <Text style={{ fontSize: width / 20, marginTop: 10 }}>Product: {val.DISPLAY_NAME} ({val.qty_order} litres)</Text>}
                            {val.DRIVER_NAME && <Text style={{ fontSize: width / 20, marginTop: 10 }}>Driver: {val.DRIVER_NAME}</Text>}
                            {val.PLATE_NO && <Text style={{ fontSize: width / 20, marginTop: 10 }}>Vehicle:{val.PLATE_NO}</Text>}
                            {val.ADDRESS2 && <Text style={{ fontSize: width / 20, marginTop: 10 }}>Site: {val.ADDRESS2}</Text>}


                            {val.SALES_PERSON_NAME && <Text style={{ fontSize: width / 20, marginTop: 10 }}>Sales Rep: {val.SALES_PERSON_NAME}</Text>}
                        </View>
                    })}
                </ScrollView>
                    :
                    <Text style={{ fontSize: width / 20, marginTop: 20, textAlign: 'center' }}>No record for this day</Text>

            )}

            <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', width: '100%', flexDirection: 'row' }} >
                <TouchableOpacity style={[styles.item, { backgroundColor: '#01315C', borderRadius: 8, padding: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'center' }]} onPress={() => { navigation.replace('NewOrder') }}>
                    <Icon color='white' name="plus" size={22} style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: width / 25, fontWeight: '400', color: "#FFF", textAlignVertical: 'center' }}>

                        Add order
                    </Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                date={dateInput}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default OrderHistoryNew;