
import React, { PureComponent } from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import {
    Container, Header, Item, Input, Icon, Text,
    List, ListItem, Left, Body, Right, Thumbnail
    , Content, Card, CardItem,Button
} from 'native-base';

import database from '@react-native-firebase/database';



import { TouchableOpacity } from 'react-native-gesture-handler';

import FeedList from './FeedList';

export default class Donations extends PureComponent {
    

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            temp: [],
            error: null,
            query: "",
            searchString: '',
            SearchedDrugName: ''
        };

        

        this.fulldata = [];

    }


    componentDidMount() {
        
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // database()
        //     .ref('/bloodRequest')
        //     .on('value', (snapshot) => {

        //     });

        let jobData = [];
        //Taking data from job vacancy form
        // let email=navigation.getParam('email');
        let email="bilalmohib7896@gmail.com"

        database().ref("bloodRequest").on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                jobData.push(data.val())
                console.log(data.val())
            })

            //console.log(jobData);
        
            this.setState({
                data: jobData
            })

        })
    }
   

    renderFooter = () => {
        if (!this.state.loading) return null
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }
    handleSearch(text) {
        this.setState({
            searchString: text
        });



        var search = text.split(' ');
        var found = [];
        this.state.data.forEach(i => {
            // Extra step here to count each search query item (after splitting by space)
            var matches = 0;
            search.forEach(s => {
                var props = 0;
                for (var prop in i) {
                    // Check if property value contains search
                    if (i[prop].toString().indexOf(s) > -1) {
                        props++;
                    }
                }
                if (props >= 1) {
                    // Found a matching prop, increase our match count
                    matches++;
                }
            })
            if (matches == search.length) {
                // if all search paramters were found
                found.push(i);
            }
        })
        this.setState({
            data: found
        })

        // console.log('After Searching temp Array is =',tempArray);

        // this.setState({
        //     data: found
        // })

    }
    // ListStyle = (d) => {
    //     return {
    //         display: d,
    //     }
    // }
    checkfun = () => {

        // let localarr=[];

        // localarr.push(this.state.data);

        // console.log("Local Array==> " + localarr.email);

        // if (localarr.some(data => data.email === "mbilals9922@gmail.com")) {
        //     console.log("Object found inside the array.");
        // } else {
        //     console.log("Object not found.");
        // }

        console.log(this.state.data)

        alert("Pressed")
    }

    
    render() {

        

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search"

                            value={this.state.searchString}
                            autoFocus={true}
                            onChangeText={(text) => this.handleSearch(text)}
                        // onKeyPress={({ nativeEvent }) => {
                        //     if (nativeEvent.key === 'Backspace') {
                        //         this.setState({
                        //             data: this
                        //         })
                        //     }
                        // }} 
                        />
                        {/* <Icon name="ios-people" /> */}
                    </Item>
                </Header>

                
                <List>
                    <FlatList
                        data={this.state.data}

                        keyExtractor={(item, index) => index.toString()}
                        style={{
                            borderColor: "green", borderWidth: 0.3, width: "95%", shadowColor: "#000",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 5,
                            marginLeft: "2%",
                            height:"auto"
                        }}
                        renderItem={({ item, index }) => {
                    
                            return (
                                <View>
                                    {/* fullName: UserProfile.first_name + " " + UserProfile.last_name,
                email: UserProfile.email,
                photoUrl: UserProfile.photoURL,
                RBG: selectedBloodGroup,
                RBB: selectedBloodBags,
                RD: formattedDate,
                HA: hospitalAddress,
                BR: bloodReason,
                timeSubmitted: dateTime */}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsData', {
                                        email: item.email,
                                        fullName:item.fullName,
                                        photoUrl:item.photoUrl,
                                        RBG:item.RBG,
                                        RD:item.RD,
                                        HA:item.HA,
                                        BR:item.BR,
                                        time:item.timeSubmitted,
                                        RBB:item.RBB,
                                        phone:item.contact,
                                        likes:item.likes
                                    })}>
                                        <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: `${item.photoUrl}` }} />
                        <Body>
                            <Text>{item.fullName}</Text>
                            <Text note>{item.email}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Text style={styles.headerText}>{item.RBG}</Text>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Body>
                            <Button iconLeft transparent>
                                <Icon style={{ fontSize: 30, color: "green" }} name='cog' />
                                <Text style={{ fontSize: 25, color: "green" }}>{item.contact}</Text>
                            </Button>
                        </Body>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>Likes</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Text>{item.timeSubmitted}</Text>
                    </Right>
                </CardItem>
            </Card>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </List>

            </Container>
        );
    }
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