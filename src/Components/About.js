import React, { useState, useEffect } from "react";

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

} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Icon,
    Left,
    Body,
    Item
} from 'native-base';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Col, Row, Grid } from "react-native-easy-grid";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const About = ({ navigation }) => {

    

    return (

        <Container>
            <Content>
                <Card>
                    <Text>This is the About Component</Text>
                </Card>
            </Content>
        </Container>

    )
}
export default About;