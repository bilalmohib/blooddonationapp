import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { Container, Content, Picker, Form, Item, Input, Text, Body, Radio, Icon, Button, Card } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';

import database from '@react-native-firebase/database';

// function SignUp({route,navigation})
// {
//     const {UserProfile}=route.params;
//     return(
//         <View>
//             <Text>
//                 Sign Up Screen
//             </Text>
//             <Text>User Profile is equal to: {UserProfile.email}</Text>
//         </View>
//     )
// }
// export default SignUp;

function Request({ route, navigation }) {


    const { UserProfile } = route.params;

    const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

    const [selectedBloodBags, setSelectedBloodBags] = useState("");

    const [hospitalAddress, setHospitalAddress] = useState("");

    const [bloodReason, setBloodReason] = useState("");

    const [date, setDate] = useState(new Date(2001, 1, 4, 11, 30, 20, 20));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [phone, setPhone] = useState("");

    const [formattedDate, setFormattedDate] = useState("--/--/--");


    const setBloodGroupValue = (val) => {
        setSelectedBloodGroup(val);
        console.log("Blood Group value==>", val);
    }

    const setRequiredBloodBags = (val) => {
        setSelectedBloodBags(val);
        console.log("required blood bags value==>", val);
    }

    // This is the code for picking date and time from the user
    const onDateChange = (event, selectedDate) => {

        if (date === undefined) {
            // dismissedAction
        }

        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let month = currentDate.getMonth() + 1; //months from 1-12
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();

        let formattedDate = year + "/" + month + "/" + day;
        setFormattedDate(formattedDate);

        console.log("The current selected Date is : ", formattedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    // This is the code for picking date and time from the user

    const sendData = () => {
        alert(phone)
        // alert(`Selected Gender is : ${selectedGender}
        // Selected Blood Group is : ${selectedBloodGroup}
        // Selected Date of Birth is : ${formattedDate}
        // Selected Postal Address is : ${postalAddress}
        // Selected Disease is : ${selectedDiseaseStatus}
        // Selected Test Status is : ${selectedTestStatus}`);

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        dateTime = dateTime.toString();

        let phoneNum = phone;

        // Here I will be sending the user data to firebase realtime database
        database()
            .ref('/bloodRequest')
            .push()
            .set({
                fullName: UserProfile.first_name + " " + UserProfile.last_name,
                email: UserProfile.email,
                photoUrl: UserProfile.picture.data.url,
                RBG: selectedBloodGroup,
                RBB: selectedBloodBags,
                RD: formattedDate,
                HA: hospitalAddress,
                BR: bloodReason,
                contact: phoneNum,
                timeSubmitted: dateTime,
                likes: 0
            })
            .then(() => alert(`${UserProfile.first_name} ${UserProfile.last_name} Your request is submitted successfully.`));

        // database()
        //     .ref(`/bloodRequest/${UserProfile.email}`)
        //     .push()
        //     .set({
        //         fullName: UserProfile.first_name + " " + UserProfile.last_name,
        //         email: UserProfile.email,
        //         photoUrl: UserProfile.picture.data.url,
        //         RBG: selectedBloodGroup,
        //         RBB: selectedBloodBags,
        //         RD: formattedDate,
        //         HA: hospitalAddress,
        //         BR: bloodReason,
        //         contact: phoneNum,
        //         timeSubmitted: dateTime,
        //         likes: 0
        //     })
        //     .then(() => alert(`${UserProfile.first_name} ${UserProfile.last_name} Your request is submitted successfully.`));



        navigation.navigate('MyDrawer');

        // .then(() => alert(`Selected Blood Group is : ${selectedBloodGroup}
        // Amount of Blood Bags required is : ${selectedBloodBags}
        // Selected Date upto which is : ${formattedDate}
        // Selected hospital Address is : ${hospitalAddress}
        // Reason to take blood is : ${bloodReason}`));

        // alert(`Selected Blood Group is : ${selectedBloodGroup}
        // Amount of Blood Bags required is : ${selectedBloodBags}
        // Selected Date upto which is : ${formattedDate}
        // Selected hospital Address is : ${hospitalAddress}
        // Reason to take blood is : ${bloodReason}`);
        // Here I will be sending the user data to firebase realtime database
    }

    const setPhoneNumber = (text) => {

        let newText = '';
        let numbers = '0123456789';


        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
                return;
            }
        }
        setPhone(text)
    }

    useEffect(() => {
        //         database()
        //           .ref('/PersonalDetailsSignUp')
        //           .on('value', (snapshot) => {
        //             let userPersonalDetails = snapshot.val();
        // //            console.log(userPersonalDetails);

        //             let keys=Object.keys(userPersonalDetails);
        //             console.log(keys);

        //           });
        // AccessToken.getCurrentAccessToken().then(
        //     (at) => {
        //       console.log("Yahan dekho==>", at);


        //       fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + at)
        //         .then((response) => {
        //           response.json().then((json) => {
        //             const ID = json.id
        //             console.log("ID " + ID);

        //             const EM = json.email
        //             console.log("Email " + EM);

        //             const FN = json.first_name
        //             console.log("First Name " + FN);
        //           })
        //         })
        //         .catch(() => {
        //           console.log('ERROR GETTING DATA FROM FACEBOOK')
        //         })

        //     } //Refresh it every time
        //   );
        console.log(phone);
    })

    return (

        <Container>
            {/* <Text style={styles.headerText}>Enter Details</Text> */}
            <Content>
                <Form style={styles.formStyling}>

                    <Row>
                        <Col>
                            <Item>
                                <Input disabled={true} value={`${UserProfile.first_name} ${UserProfile.last_name}`} placeholder="Full Name" style={styles.Input} />
                            </Item>
                        </Col>

                    </Row>
                    <Text></Text>
                    <Row>
                        <Col>
                            <Item>
                                <Input defaultValue={phone} placeholder="Please Enter your phone number" style={styles.Input} onChangeText={(text) => setPhoneNumber(text)} />
                            </Item>
                        </Col>

                    </Row>


                    <Item>
                        <Text>
                            Required Blood Group :
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your Blood Group"
                            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                            style={styles.pickerStyle}
                            selectedValue={selectedBloodGroup}
                            onValueChange={(itemValue, itemIndex) => setBloodGroupValue(itemValue)}
                        >
                            <Picker.Item label="A+" value="A+" />
                            <Picker.Item label="A-" value="A-" />
                            <Picker.Item label="B+" value="B+" />
                            <Picker.Item label="B-" value="B-" />
                            <Picker.Item label="AB+" value="AB+" />
                            <Picker.Item label="AB-" value="AB-" />
                            <Picker.Item label="A1+" value="A1+" />
                            <Picker.Item label="AB-" value="AB-" />
                            <Picker.Item label="A1B+" value="A1B+" />
                            <Picker.Item label="A1B-" value="A1B-" />
                            <Picker.Item label="A2+" value="A2+" />
                            <Picker.Item label="A2-" value="A2-" />
                            <Picker.Item label="A2B+" value="A2B+" />
                            <Picker.Item label="A2B-" value="A2B-" />
                            <Picker.Item label="O+" value="O+" />
                            <Picker.Item label="O-" value="O-" />
                            <Picker.Item label="A2+" value="BOMBAY BLOOD GROUP" />
                            <Picker.Item label="INRA" value="INRA" />
                            <Picker.Item label="A2+" value="DON'T KNOW" />
                            <Picker.Item label="A2+" value="OTHER" />
                        </Picker>
                    </Item>


                    <Item>
                        <Text>
                            Amount of Required Blood :
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosHeader="Amount of Required Blood"
                            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                            style={styles.pickerStyle}
                            selectedValue={selectedBloodBags}
                            onValueChange={(itemValue, itemIndex) => setRequiredBloodBags(itemValue)}
                        >
                            <Picker.Item label="1 bag" value="1" />
                            <Picker.Item label="2 bag" value="2" />
                            <Picker.Item label="3 bag" value="3" />
                            <Picker.Item label="4 bag" value="4" />
                            <Picker.Item label="5 bag" value="5" />
                            <Picker.Item label="6 bag" value="6" />

                        </Picker>
                    </Item>



                    <Item>



                        <TouchableOpacity onPress={showDatepicker}>
                            {(formattedDate == "--/--/--") ? (
                                <Text style={styles.datePicker}>Upto the date: {formattedDate}</Text>
                            ) : (
                                    <Text style={styles.datePickerSelected}>The selected date is: {formattedDate}</Text>
                                )}

                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={showTimepicker}>
                            <Text style={styles.datePicker}>{JSON.stringify(date)}</Text>
                        </TouchableOpacity> */}

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onDateChange}
                                neutralButtonLabel="clear"
                            />
                        )}
                    </Item>

                    <Item>
                        <Input disabled={true} value={UserProfile.email} placeholder="Like : bilalmohib7896@gmail.com" style={styles.Input} />
                    </Item>

                    <Item style={styles.PostalAddress}>
                        <Input placeholder='Name of Hopital(Address ? Ward No ? Bed No ? ) (max-length:100)' maxLength={100} editable={true} style={{ height: 100 }} defaultValue={hospitalAddress} onChangeText={(txt) => setHospitalAddress(txt)} />
                        <Icon name='md-location' style={styles.postalIcon} />
                    </Item>

                    <Item style={styles.PostalAddress}>
                        <Input placeholder='Why do you need blood? (max-length:100)' editable={true} maxLength={100} style={{ height: 100 }} defaultValue={bloodReason} onChangeText={(txt) => setBloodReason(txt)} />
                        <Icon name='md-alert-circle' style={styles.questionIcon} />
                    </Item>

                    <Item>
                        <Row>
                            <Col>


                                {((bloodReason == "" || selectedBloodGroup == "" || selectedBloodBags == "" || formattedDate == "--/--/--" || hospitalAddress == "" || phone == "")) ? (
                                    <View>

                                        <Body>
                                            <Body>
                                                <Text style={{ color: "red" }}>Please fill all the fields to continue</Text>
                                            </Body>
                                            <Body>
                                                <Button disabled={true} style={{ backgroundColor: "grey" }} onPress={sendData}>
                                                    <Text>
                                                        Request
                                                </Text>
                                                </Button>
                                            </Body>

                                        </Body>
                                        <Text></Text>
                                    </View>
                                ) : (
                                        <View>

                                            <Body>
                                                <Body>
                                                    <Button style={{ backgroundColor: "red" }} onPress={sendData}>
                                                        <Text>
                                                            Request
                                            </Text>
                                                    </Button>
                                                </Body>
                                            </Body>
                                            <Text></Text>
                                        </View>

                                    )}

                            </Col>
                        </Row>
                    </Item>

                </Form>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: "center", fontSize: 25, marginTop: 10, marginBottom: 15, fontWeight: "bold", color: "#292b2c", borderBottomColor: "#5bc0de", borderBottomWidth: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 0.3,
        borderRadius: 10
    },
    formStyling: {
        paddingRight: 15,
        paddingTop: 10
    },
    Input: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 18,
        borderWidth: 1,
        height: 44,
        borderColor: "green",
        backgroundColor: "#F0F0F0",
        borderRadius: 3
    },
    PostalAddress: {
        marginTop: 10,
        fontWeight: 'normal',
        fontSize: 20,
        borderWidth: 1,
        height: 80,
        borderColor: "#F0F0F0",
        backgroundColor: "#F0F0F0",
        borderRadius: 3,
        marginBottom: 10,
    },
    pickerStyle: {
        width: undefined, color: "red"
    },
    datePicker: {
        marginTop: 10,
        fontSize: 17,
        marginBottom: 10
    },
    datePickerSelected: {
        marginTop: 10,
        fontSize: 17,
        marginBottom: 10,
        color: "green"
    },
    postalIcon: {
        color: "green",
        fontSize: 30
    },
    questionIcon: {
        color: "red",
        fontSize: 25
    }
});

export default Request;




// To check the value of selected item just for testing
{/* <Button onPress={()=>{alert("Selected blood group value: "+selectedBloodGroup)}}>
     <Text>
         Selected Blood Group value
     </Text>
 </Button> */}
 // To check the value of selected item just for testing