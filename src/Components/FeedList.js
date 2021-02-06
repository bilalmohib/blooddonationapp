import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import {
    Container, Header, Item, Input, Icon, Text,
    List, ListItem, Left, Body, Right, Thumbnail
    , Content, Card, CardItem, Button
} from 'native-base';


import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react/cjs/react.development';


const FeedList = (props) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(props.likes);
        setCount(props.likes);
    }, [])

    const setLikes = () => {
        setCount(count + 1)
        // database()
        //     .ref('/bloodRequest')
        //     .update({
        //         likes: count+1,
        //     })
        //     .then(() => console.log('Data updated.'));
    }

    return (
        <View>
            {/* <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: `${props.photoUrl}` }} />
                        <Body>
                            <Text>{props.fullName}</Text>
                            <Text note>{props.email}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Text style={styles.headerText}>{props.RBG}</Text>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Button iconLeft transparent>
                                <Icon style={{ fontSize: 30, color: "green" }} name='cog' />
                                <Text style={{ fontSize: 25, color: "green" }}>{props.phone}</Text>
                            </Button>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button onPress={setLikes} transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{count} Likes</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Text>10/12/2020 2:20 2s</Text>
                    </Right>
                </CardItem>
            </Card> */}
           
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: `${props.photoUrl}` }} />
                    </Left>
                    <Body>
                                             {/* fullName: UserProfile.first_name + " " + UserProfile.last_name,
                email: UserProfile.email,
                photoUrl: UserProfile.photoURL,
                RBG: selectedBloodGroup,
                RBB: selectedBloodBags,
                RD: formattedDate,
                HA: hospitalAddress,
                BR: bloodReason,
                timeSubmitted: dateTime */}
                        <Text>{props.fullName}</Text>
                        <Text note style={{color:"red"}}>Blood Group: {props.RBG}</Text>
                        <Text note style={{color:"blue"}}>Required Bags: {props.RBB}</Text>
                    </Body>
                    <Right>
                        <Text></Text>
                        <Text note>{props.time}</Text>
                    </Right>
                </ListItem>

        </View>
    )
}


const styles = StyleSheet.create({
    headerText: {
        textAlign: "center", fontSize: 40, marginTop: 10, marginBottom: 15, fontWeight: "bold", color: "red", borderBottomColor: "#5bc0de", borderBottomWidth: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 0.3,
        borderRadius: 2,
        width: 230
    },
    bloodBagsText: {
        fontSize: 25,
        textAlign: "left"
    },
    bloodBagsTextNo: {
        fontSize: 30,
    },
    HAText: {
        fontSize: 25,
        textAlign: "left",
        color: "grey",
        fontWeight: "normal",
        textTransform: "none",
        fontWeight: "bold",
        fontStyle: "normal"
    },
    HATextNo: {
        fontStyle: "italic",
        fontSize: 18,
        color: "blue"

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
    }
});


export default FeedList;