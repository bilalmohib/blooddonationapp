
import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet,Linking } from 'react-native';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import {
    Container, Header, Item, Input, Icon, Text,
    List, ListItem, Left, Body, Right, Thumbnail
    , Content, Card, CardItem, Button
} from 'native-base';


import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const DetailsData = ({ route, navigation }) => {
    const { email, fullName, photoUrl, RBG, RBB, RD, HA, BR, time, phone,likes } = route.params;
    useEffect(() => {
        console.log(RBB);
    })
    return (
        <Container>
            <ScrollView>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: `${photoUrl}` }} />
                        <Body>
                            <Text>{fullName}</Text>
                            <Text note>{email}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body style={styles.ItemBorder}>
                        <Body>
                            <Text style={styles.headerText}>{RBG}</Text>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Button style={styles.ItemBorder} transparent>
                            <Icon style={{ fontSize: 30, color: "red" }} name="md-beaker-sharp" />
                            <Text style={styles.bloodBagsText}>
                                Required Bags:
                                        <Text style={styles.bloodBagsTextNo}>{RBB}</Text>
                            </Text>
                        </Button>
                        <Text></Text>

                        <Button style={styles.ItemBorder} transparent>
                            <Icon style={{ fontSize: 30 }} name="md-home" />
                            <Text style={styles.HATextNo}>
                                <Text style={styles.HAText}>
                                    {`Hospital Address :-\n\n`}
                                </Text>

                                {`"${HA}"`}</Text>

                        </Button>
                        <Text></Text>
                        <Button style={styles.ItemBorder} transparent>
                            <Icon style={{ fontSize: 30 }} name="md-time-sharp" />
                            <Text style={styles.bloodDateText}>

                                {`Upto Date:      `}
                                <Text style={styles.bloodDateTextNo}>{RD}</Text>
                            </Text>
                        </Button>
                        <Text></Text>
                        <Button style={styles.ItemBorder} transparent>
                            <Icon style={{ fontSize: 30, color: "green" }} name="md-alert-circle-outline" />
                            <Text style={styles.bloodReasonText}>
                                {`Blood taking reason:\n`}
                                <Text style={styles.bloodReasonTextNo}>{`"${BR}"`}</Text>
                            </Text>
                        </Button>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body style={styles.ItemBorder}>
                        <Body>
                            <Text style={styles.time}>Time Submitted: {time}</Text>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Button onPress={()=>{Linking.openURL('whatsapp://send?text=' + `Assalamoalikum ${fullName} I have reached you via the Pakistan Donors App and Wants to help you for blood.Do contact me as soon as you read this message.` + `&phone=92` + `${phone}`);}} iconLeft success>
                                <Icon style={{ fontSize: 30 }} name='cog' />
                                <Text style={{ fontSize: 25 }}>{phone}</Text>
                            </Button>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Button onPress={()=>{Linking.openURL(`tel:${phone}`);}} iconLeft light>
                                <Icon style={{ fontSize: 30 }} name='md-call-outline' />
                                <Text style={{ fontSize: 25 }}>{phone}</Text>
                            
                            </Button>
                        </Body>
                    </Body>
                </CardItem>
                {/* <CardItem>
                        <Left>
                      
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Text>{time}</Text>
                        </Right>
                    </CardItem> */}
            </ScrollView>



        </Container>
    )
}


const styles = StyleSheet.create({
    ItemBorder: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "green",
        height: "auto"
    }, headerText: {
        textAlign: "center", fontSize: 70, marginTop: 10, marginBottom: 15, fontWeight: "bold", color: "red", borderBottomColor: "#5bc0de", borderBottomWidth: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 0.3,
        borderRadius: 2,
        width: 250
    },
    bloodBagsText: {
        fontSize: 25,
        textAlign: "left"
    },
    bloodBagsTextNo: {
        fontSize: 30,
    },
    HAText: {
        fontSize: 28,
        textAlign: "left",
        color: "grey",
        fontWeight: "normal",
        textTransform: "none",
        fontWeight: "bold",
        fontStyle: "normal",
    },
    HATextNo: {
        fontStyle: "italic",
        fontSize: 20,
        color: "black"

    },
    bloodReasonText: {
        fontSize: 20
    },
    bloodReasonTextNo: {
        fontStyle: "italic",
        fontSize: 18
    },
    bloodDateText: {
        fontSize: 20,
        color: "black",
        textTransform: "none"
    },
    bloodDateTextNo: {
        fontSize: 15,
        fontStyle: "italic"
    },
    time: {
        fontSize: 18,
        textDecorationStyle: "dashed"
    }
});


export default DetailsData;