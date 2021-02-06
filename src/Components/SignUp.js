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

function SignUp({ route, navigation }) {

    const { UserProfile } = route.params;

    const [currentRadio, setCurrentRadio] = useState(0);

    const [currentDisease, setCurrentDisease] = useState(0);

    const [currentTest, setCurrentTest] = useState(0);

    // Radio buttons values selected at the end
    const [selectedGender, setSelectedGender] = useState("");

    const [selectedDiseaseStatus, setSelectedDiseaseStatus] = useState("");

    const [selectedTestStatus, setSelectedTestStatus] = useState("");

    // Radio buttons values selected at the end

    const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

    const [postalAddress, setPostalAddress] = useState("");

    const [date, setDate] = useState(new Date(2001, 1, 4, 11, 30, 20, 20));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [formattedDate, setFormattedDate] = useState("--/--/--");

    const setRadio = (val) => {
        console.log("Radio button selected value==>", val);
        setCurrentRadio(val);
        if (val == 1) {
            setSelectedGender("Male");
        }
        if (val == 2) {
            setSelectedGender("Female");
        }
        if (val == 3) {
            setSelectedGender("Other");
        }
        console.log("The current selected gender is : ", selectedGender);
    }

    // for setting the user disease or virus status
    const setDisease = (disease) => {
        console.log("Radio button selected value of user disease is==>", disease);
        setCurrentDisease(disease);
        if (disease == 1) {
            setSelectedDiseaseStatus("Yes");
        }
        if (disease == 2) {
            setSelectedDiseaseStatus("No");
        }
        if (disease == 3) {
            setSelectedDiseaseStatus("Not Sure");
        }
        console.log("The current selected disease of user is : ", selectedDiseaseStatus);
    }
    // for setting the user disease or virus status


    // for setting the user TEST or virus status
    const setTest = (test) => {
        console.log("Radio button selected value of user test is==>", test);
        setCurrentTest(test);
        if (test == 1) {
            setSelectedTestStatus("Yes");
        }
        if (test == 2) {
            setSelectedTestStatus("No");
        }
        if (test == 3) {
            setSelectedTestStatus("Not Sure");
        }
        console.log("The current selected TEST status of user is : ", selectedTestStatus);
    }
    // for setting the user TEST or virus status


    const setBloodGroupValue = (val) => {
        setSelectedBloodGroup(val);
        console.log("Blood Group value==>", val);
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

        // Here I will be sending the user data to firebase realtime database
        database()
            .ref('/PersonalDetailsSignUp')
            .push()
            .set({
                firstName:UserProfile.first_name,
                lastName:UserProfile.last_name,
                email:UserProfile.email,
                photoUrl:UserProfile.photoURL,
                SG: selectedGender,
                SBG: selectedBloodGroup,
                FD: formattedDate,
                PA: postalAddress,
                SDS: selectedDiseaseStatus,
                STS: selectedTestStatus,
                time:dateTime
            })
            .then(() => alert("Thank you for signing up and helping the nation."));

        //     alert(`Selected Gender is : ${selectedGender}
        // Selected Blood Group is : ${selectedBloodGroup}
        // Selected Date of Birth is : ${formattedDate}
        // Selected Postal Address is : ${postalAddress}
        // Selected Disease is : ${selectedDiseaseStatus}
        // Selected Test Status is : ${selectedTestStatus}`)

        // Here I will be sending the user data to firebase realtime database
    }

//     useEffect(() => {
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


//     })

    return (

        <Container>
            <Text style={styles.headerText}>Enter Personal Details</Text>
            <Content>
                <Form style={styles.formStyling}>

                    <Row>
                        <Col>
                            <Item>
                                <Input disabled={true} value={UserProfile.first_name} placeholder="First Name" style={styles.Input} />
                            </Item>
                        </Col>

                        <Col>
                            <Item>
                                <Input disabled={true} value={UserProfile.last_name} placeholder="Last Name" style={styles.Input} />
                            </Item>
                        </Col>
                    </Row>

                    <Row>
                        <Text></Text>
                    </Row>

                    <Item>
                        <Row>
                            <Col>
                                <Text>Gender : </Text>

                            </Col>
                            <Col>
                                <Row>
                                    <Radio onPress={() => setRadio(1)}
                                        selected={currentRadio == 1}
                                    />
                                    <TouchableOpacity onPress={() => setRadio(1)}>
                                        <Text>
                                            Male
                                    </Text>
                                    </TouchableOpacity>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Radio onPress={() => setRadio(2)}
                                        selected={currentRadio == 2}
                                    />
                                    <TouchableOpacity onPress={() => setRadio(2)}>
                                        <Text>
                                            Female
                                    </Text>
                                    </TouchableOpacity>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Radio onPress={() => setRadio(3)}
                                        selected={currentRadio == 3}
                                    />
                                    <TouchableOpacity onPress={() => setRadio(3)}>
                                        <Text>
                                            Other
                                    </Text>
                                    </TouchableOpacity>
                                </Row>
                            </Col>
                        </Row>
                    </Item>

                    <Item>
                        <Text>
                            Select Your Blood Group :
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



                        <TouchableOpacity onPress={showDatepicker}>
                            {(formattedDate == "--/--/--") ? (
                                <Text style={styles.datePicker}>Select Date of Birth: {formattedDate}</Text>
                            ) : (
                                    <Text style={styles.datePickerSelected}>Selected Date of Birth is: {formattedDate}</Text>
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
                        <Input placeholder='Please Enter Your Postal Address' defaultValue={postalAddress} onChangeText={(txt) => setPostalAddress(txt)} />
                        <Icon name='md-location' style={styles.postalIcon} />
                    </Item>
                    <Item>
                        <Row>
                            <Col>

                                <Row>
                                    <Col>
                                        <Text>Have you ever suffered from any viruses or diseases : </Text>
                                        <Text></Text>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setDisease(1)}
                                                selected={currentDisease == 1}
                                            />
                                            <TouchableOpacity onPress={() => setDisease(1)}>
                                                <Text>
                                                    Yes
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setDisease(2)}
                                                selected={currentDisease == 2}
                                            />
                                            <TouchableOpacity onPress={() => setDisease(2)}>
                                                <Text>
                                                    No
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setDisease(3)}
                                                selected={currentDisease == 3}
                                            />
                                            <TouchableOpacity onPress={() => setDisease(3)}>
                                                <Text>
                                                    Not Sure
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                </Row>

                                {/* Just a space and line divider */}
                                <Text></Text>
                                <Item></Item>
                                <Text></Text>
                                {/* Just a space and line divider */}

                                <Row>
                                    <Col>
                                        <Text>Have you ever tested for any viruses or diseases :
                                        </Text>
                                        <Text></Text>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setTest(1)}
                                                selected={currentTest == 1}
                                            />
                                            <TouchableOpacity onPress={() => setTest(1)}>
                                                <Text>
                                                    Yes
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setTest(2)}
                                                selected={currentTest == 2}
                                            />
                                            <TouchableOpacity onPress={() => setTest(2)}>
                                                <Text>
                                                    No
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Radio onPress={() => setTest(3)}
                                                selected={currentTest == 3}
                                            />
                                            <TouchableOpacity onPress={() => setTest(3)}>
                                                <Text>
                                                    Not Sure
                                                </Text>
                                            </TouchableOpacity>
                                        </Row>
                                    </Col>
                                </Row>

                                {((selectedGender == "" || selectedBloodGroup == "" || formattedDate == "--/--/--" || postalAddress == "" || selectedDiseaseStatus == "" || selectedTestStatus == "")) ? (
                                    <View>
                                        <Text></Text>
                                        <Text style={{ color: "red", textAlign: "center" }}>Please Fill all fields to continue * </Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                        <View>
                                            <Text></Text>
                                            <Body>
                                                <Body>
                                                    <Button onPress={sendData}>
                                                        <Text>
                                                            The Data you selected was
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
    }
});

export default SignUp;




// To check the value of selected item just for testing
{/* <Button onPress={()=>{alert("Selected blood group value: "+selectedBloodGroup)}}>
     <Text>
         Selected Blood Group value
     </Text>
 </Button> */}
 // To check the value of selected item just for testing