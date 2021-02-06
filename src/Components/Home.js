import React, { useState, useEffect } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    BackHandler,
    ToastAndroid,
    Image,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Linking,
    StatusBar,
    SafeAreaView,
    Alert
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Item
} from 'native-base';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Col, Row, Grid } from "react-native-easy-grid";

import { SliderBox } from "react-native-image-slider-box";

import image1 from '../UI/image1.jpg'
import image2 from '../UI/image2.jpg'
import image3 from '../UI/image3.jpg'
import image4 from '../UI/image4.jpg'

import bloodmap from '../UI/bloodcross.jpg';

// const Home = ({ route, navigation }) => {

//     const { UserProfile } = route.params;

//     let images = [
//         "https://source.unsplash.com/1024x768/?nature",
//         "https://source.unsplash.com/1024x768/?water",
//         "https://source.unsplash.com/1024x768/?girl",
//         "https://source.unsplash.com/1024x768/?tree", // Network image
//     ]

//     React.useLayoutEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
//             ),
//             headerLeft: () => (
//                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
//             ),
//         });
//     }, [navigation]);

//     return (

//         <Container>
//             <Content>
//                 <Card>
//                     <CardItem>
//                         <Grid>
//                             <Row>
//                                 <Col>
//                                     <CardItem>
//                                         <Body>
//                                             <Body>
//                                                 <TouchableOpacity onPress={() =>
//                                                     navigation.navigate('Request', {
//                                                         UserProfile: UserProfile
//                                                     })
//                                                 }>
//                                                     <Text>Request</Text>
//                                                 </TouchableOpacity>
//                                             </Body>
//                                         </Body>
//                                     </CardItem>
//                                 </Col>
//                                 <Col>
//                                     <CardItem>
//                                         <Body>
//                                             <Body>
//                                                 <TouchableOpacity onPress={() => {
//                                                     /* 1. Navigate to the Details route with params */
//                                                     navigation.navigate('Feed');
//                                                 }}>
//                                                     <Text>Feed</Text>
//                                                 </TouchableOpacity>
//                                             </Body>
//                                         </Body>
//                                     </CardItem>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <CardItem>
//                                         <Body>
//                                             <Body>
//                                                 <TouchableOpacity onPress={() => alert("My Donations")}>
//                                                     <Text>My Donations</Text>
//                                                 </TouchableOpacity>
//                                             </Body>
//                                         </Body>
//                                     </CardItem>
//                                 </Col>
//                                 <Col>
//                                     <CardItem>
//                                         <Body>
//                                             <Body>
//                                                 <TouchableOpacity onPress={() => alert("My Profile")}>
//                                                     <Text>My Profile</Text>
//                                                 </TouchableOpacity>
//                                             </Body>
//                                         </Body>
//                                     </CardItem>
//                                 </Col>
//                             </Row>
//                         </Grid>
//                     </CardItem>
//                 </Card>
//             </Content>
//         </Container>

//     )
// }
// export default Home;

const Home = ({ route, navigation }) => {

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                // { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    const { UserProfile } = route.params;

    let images = [
        image1,
        image2,
        image3,
        image4, // Network image
    ]


    return (

        <Container>
            <SliderBox autoplay={true} circleLoop={true} images={images} />
            <Content>
                <Card>
                    <CardItem>

                    </CardItem>
                    <CardItem>
                        <Grid>
                            <Row>
                                <Col>
                                    <CardItem>
                                        <Body>
                                            <Body>
                                                <Icon.Button
                                                    name="send"
                                                    style={{ width: 150, height: 100 }}
                                                    name="user"
                                                    iconStyle={{ fontSize: 25 }}
                                                    backgroundColor="red"
                                                    onPress={() =>
                                                        navigation.navigate('Request', {
                                                            UserProfile: UserProfile
                                                        })
                                                    }
                                                >
                                                    <Text style={styles.buttonText}>Request Blood</Text>
                                                </Icon.Button>

                                            </Body>
                                        </Body>
                                    </CardItem>
                                </Col>
                                <Col>
                                    <CardItem>
                                        <Body>
                                            <Body>
                                                <Icon.Button
                                                    name="list"
                                                    style={{ width: 150, height: 100 }}

                                                    iconStyle={{ fontSize: 25 }}
                                                    backgroundColor="skyblue"
                                                    onPress={() => {
                                                        /* 1. Navigate to the Details route with params */
                                                        navigation.navigate('Feed');
                                                    }}
                                                >
                                                    <Text style={styles.buttonText}>Requests</Text>
                                                </Icon.Button>
                                            </Body>
                                        </Body>
                                    </CardItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CardItem>
                                        <Body>
                                            <Body>
                                                <Icon.Button
                                                    name="list-alt"
                                                    style={{ width: 150, height: 100 }}

                                                    iconStyle={{ fontSize: 20 }}
                                                    backgroundColor="green"
                                                    onPress={() => {
                                                        /* 1. Navigate to the Details route with params */
                                                        navigation.navigate('Donations');
                                                    }}
                                                >
                                                    <Text style={styles.buttonText}>My Donor</Text>
                                                </Icon.Button>
                                            </Body>
                                        </Body>
                                    </CardItem>
                                </Col>
                                <Col>
                                    <CardItem>
                                        <Body>
                                            <Body>
                                                <Icon.Button
                                                    style={{ width: 150, height: 100 }}
                                                    name="user"
                                                    iconStyle={{ fontSize: 25 }}

                                                    backgroundColor="grey"
                                                    onPress={() => {
                                                        /* 1. Navigate to the Details route with params */
                                                        navigation.navigate('Profile', {
                                                            UserProfile: UserProfile
                                                        });
                                                    }}
                                                >
                                                    <Text style={styles.buttonText}>My Profile</Text>
                                                </Icon.Button>
                                            </Body>
                                        </Body>
                                    </CardItem>
                                </Col>
                            </Row>
                        </Grid>
                    </CardItem>
                    <CardItem>
                        <Image
                            style={{ width: "100%", height: 300 }}
                            source={bloodmap}
                        />
                    </CardItem>
                    <CardItem>

                    </CardItem>
                    
                    <Icon.Button
                            name="star"
                            style={{  height: 70,borderRadius:0,width:"100%",textAlign:"center" }}
                            iconStyle={{ fontSize: 25 }}
                            backgroundColor="red"
                            onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigation.navigate('Feed');
                            }}
                        >
                            <Text style={{textAlign:"center", fontSize: 40, color: "white",width:"100%"}}>Rate Us</Text>
                        </Icon.Button>
                </Card>
            </Content>








        </Container>

    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 25, color: "white",
        width:"100%"
    },
});


export default Home;

