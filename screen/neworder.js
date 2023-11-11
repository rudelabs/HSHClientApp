import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');
import { getUser, getDomain, getlogUserDetail, getlogUserFull, setVehicle } from './functions/helper';
import { Portal, Provider, Modal, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NewOrder = ({ navigation }) => {
    // const [date, setDate] = useState(new Date())
    const [userData, setuserData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')
    const [recDate, setrecDate] = useState(new Date());
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const [showCategory, setShowCategory] = useState(false)
    const [product, setProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [sku, setSku] = useState('')
    const [unitcost, setunitcost] = useState(null);
    const [remark, setremark] = useState(null);

    const renderProductList = () => {
        if (!selectedCategory) return null;

        const categoryItem = productList?.find(item => item.category === selectedCategory)

        if (!categoryItem) return null;

        return (
            <FlatList
                data={categoryItem.product}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ justifyContent: 'center', borderBottomWidth: 1, borderColor: '#0465bd', padding: 6 }}
                        onPress={() => { setProduct(item.desc), hideModal(); setShowCategory(false); setSku(item.SKU) }}
                    >
                        <Text style={[styles.text, { fontSize: width / 20, alignSelf: 'center', color: '#0465bd' }]}>{item.desc}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
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
    const [qt, setqt] = useState(0);
    useEffect(() => {
        const user = getlogUserFull();
        const userData = getUser();
        console.log(userData.CODE)
        setrecDate(new Date())
        if (user?.company_id) {
            setuserData(user);
            getBusinessAddress();
            getProductList();
        }
    }, []);
    const [businessAddress, setBusinessAddress] = useState([])
    const getBusinessAddress = async () => {
        const user = getlogUserFull();
        const domain = getDomain();
        try {
            const response = await fetch(domain + `/getBusinessAddressByBusinessId?_token=BDB47BFE-A891-4D77-AFBB-27928083D777&custId=${user.company_id}`);
            const json = await response.json();
            setBusinessAddress(json);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    const [addressVisible, setAddressVisible] = useState(false);
    const hideAddressModal = () => setAddressVisible(false)
    const showAddressModal = () => setAddressVisible(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [category, setCategory] = useState('')
    const [productList, setProductList] = useState([])
    const getProductList = () => {
        const domain = getDomain();
        fetch(domain + '/getProductList?_token=FAEB7E31-0DE5-48BE-9EC9-8D97D21EF8B3')
            .then(response => response.json())
            .then(result => {
                console.log(result);
                var fResult = result.filter(val => val.category !== '')
                setProductList(fResult)
            })
            .catch(error => console.error(error))
    }

    const showDatePicker = () => {
        // console.log(parameter)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", formatDate(new Date(date).toLocaleDateString()));
        // getOrders(formatDate(new Date(date)))
        hideDatePicker();
        setrecDate(new Date(date));

    };

    const AddressView = ({ item }) => {
        return (
            <TouchableOpacity style={{ justifyContent: 'center', borderBottomWidth: 1, borderColor: '#0465bd', padding: 6 }}
                onPress={() => { setAddress(item.ADDRESS), hideAddressModal() }}
            >
                {item.ADDRESS ?
                    <Text style={[styles.text, { fontSize: width / 20, alignSelf: 'center', color: '#0465bd' }]}>{item.ADDRESS}</Text>
                    :
                    <Text style={[styles.text, { fontSize: width / 20, alignSelf: 'center', color: '#0465bd' }]}>No Address Available</Text>
                }
            </TouchableOpacity>
        )
    }
    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ justifyContent: 'center', borderBottomWidth: 1, borderColor: '#0465bd', padding: 6 }}
                onPress={() => { handleCategoryPress(item.category); setShowCategory(true); console.log(item) }}
            >
                <Text style={[styles.text, { fontSize: width / 20, alignSelf: 'center', color: '#0465bd' }]} >{item.category}</Text>
            </TouchableOpacity >
        )
    }

    const submit = () => {
        // if (!address) {
        //     Alert.alert('Provide address');
        //     return;
        // }
        if (!sku) {
            Alert.alert('Provide product');
            return;
        }
        if (!unitcost) {
            Alert.alert('Provide quantity');
            return;
        }
        const domain = getDomain();
        const url = domain + "/PostCUST_ORDER_REQUEST";
        const userData = getUser();
        console.log(userData.CODE)
        const data = {
            "CUST_CODE": userData.CODE,
            "LOCATION": address ? address : '',
            "REC_DATE": formatDate(recDate),
            "SKU": sku,
            "QTY": unitcost,
            "UOM_CODE": "Liter",
            "REMARKS": remark
        }
        console.log(url, data);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                console.log("Job updated", result);

                Alert.alert('Success', 'Job Created Successful', [
                    { text: 'OK', onPress: () => navigation.replace('OrderHistoryNew') },
                ]);
                //   setshowInput(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("Error:", error);
                Alert.alert("Job Failed");
            })
    }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.dragDown}>
                    {!showCategory ?
                        <>
                            <Text
                                style={{ fontSize: width / 20, color: '#01315C', marginRight: 40, justifyContent: 'center' }}>
                                {!category ? `Category` : category} <Icon name='angle-down' size={18} style={{ alignSelf: 'center' }} />
                            </Text>
                            <FlatList
                                data={productList}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => `${item}_${index}`}
                            />
                        </> :
                        renderProductList()}
                </Modal>

                <Modal transparent={true} visible={addressVisible} onDismiss={hideAddressModal} contentContainerStyle={styles.dragDown} >
                    <FlatList
                        data={businessAddress}
                        keyExtractor={item => item.UID}
                        renderItem={AddressView}
                        showsVerticalScrollIndicator={true}
                    />
                </Modal>
                <DateTimePickerModal
                    date={recDate}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </Portal>
            <View style={{ flex: 1 }}>
                <ScrollView>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 40, marginLeft: 10, marginRight: 5, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#d3d3d3" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                                navigation.replace('OrderHistoryNew')
                            }}>
                                <Icon name="chevron-left" size={25} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: width / 18, fontWeight: '400' }}>New Order</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={[styles.item, { backgroundColor: 'navy', borderRadius: 4 }]} onPress={submit}>
                                <Text style={{ fontSize: width / 25, fontWeight: '400', color: "#FFF" }}>
                                    <Icon name="save" size={22} /> &nbsp;
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Business Name
                            </Text>
                            <Text
                                style={{ fontSize: width / 18, color: '#01315C', marginRight: 20, justifyContent: 'center' }}>
                                {userData?.display_name}
                            </Text>
                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Business Address
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, padding: 10 }} onPress={showAddressModal}>
                                <Text
                                    style={{ fontSize: width / 18, color: '#01315C', marginRight: 20, justifyContent: 'center' }}>
                                    {!address ? `Select Business Address` : address} <Icon name='angle-down' size={18} style={{ alignSelf: 'center' }} />
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Delivery Date
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={showDatePicker}>
                                <Text
                                    style={{ fontSize: width / 18, color: '#01315C', marginRight: 20, justifyContent: 'center' }}>
                                    {formatDate(recDate)}
                                </Text>
                                <Icon size={30} name="calendar" color='#01315C' />
                            </TouchableOpacity>
                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Product
                            </Text>

                            <TouchableOpacity onPress={showModal} style={{ borderWidth: 1, borderRadius: 8, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text
                                    style={{ fontSize: width / 20, color: '#01315C', marginRight: 40, justifyContent: 'center' }}>
                                    {!product ? `Products` : product}
                                </Text>
                                <Icon name='angle-down' size={18} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Quantity
                            </Text>
                            <TextInput keyboardType='decimal-pad' style={{ marginBottom: 10, borderWidth: 1, borderRadius: 8, color: 'black', fontSize: width / 18 }} value={unitcost} onChangeText={text => setunitcost(text)} />

                            <Text style={{ fontSize: width / 20, color: '#01315C', marginVertical: 10 }}>
                                Remarks
                            </Text>
                            <KeyboardAvoidingView
                                style={{ marginBottom: 50 }}>
                                <TextInput style={[styles.remarks]} multiline={true} numberOfLines={4} value={remark} onChangeText={text => setremark(text)} />
                            </KeyboardAvoidingView>
                        </View>
                    </View>

                </ScrollView>

            </View >
        </Provider >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 100

    },
    item: {
        width: 100, height: 40, backgroundColor: '#c8e1ff', justifyContent: 'center', alignItems: 'center', marginRight: 10
    },
    title: {
        fontWeight: '400'
    },
    dragDown: {
        backgroundColor: 'white',
        margin: '5%',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 5
    },
    text: {
        fontSize: width / 20,
        color: '#01315C',
        fontWeight: 600,
    },
    remarks: {
        borderWidth: 1,
        color: "#000",
        fontSize: width / 18,
        textAlignVertical: 'top',
        borderRadius: 8
    }
});


export default NewOrder;