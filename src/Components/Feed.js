
import React, { PureComponent } from 'react';
import { View, FlatList, ActivityIndicator, Button, BackHandler } from 'react-native';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import {
    Container, Card, Header, Item, Input, Icon, Text,
    List, ListItem, Left, Body, Right, Thumbnail,CardItem
} from 'native-base';

import database from '@react-native-firebase/database';



import { TouchableOpacity } from 'react-native-gesture-handler';

import FeedList from './FeedList';

export default class Feed extends PureComponent {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       headerTitle: () => <Button title="Hello" />,
    //       headerRight: () => (
    //         <Button
    //           onPress={navigation.getParam('increaseCount')}
    //           title="+1"
    //           color="#fff"
    //         />
    //       ),
    //     };
    //   };


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
        database().ref(`bloodRequest/`).on('value', (snapshot) => {
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
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }

    // handleBackButton() {
    //     ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    //     return true;
    // }


   


    // requestAPIPhotos = () => {
    //     this.setState({
    //         data: 
    //     })

    // };

    // _renderItem = ({ item, index }) => {
    //     return (
    // <View>
    //     <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsMainContainer', {
    //         BRAND_NAME: item.fullName,
    //         keye: index,
    //         BID: item.email
    //     })}>
    //         <ListItem avatar>
    //             <Left>
    //                 <Thumbnail source={{ uri: 'https://png.pngtree.com/element_our/png_detail/20180922/right-arrow-icon-design-vector-png_107354.jpg' }} />
    //             </Left>
    //             <Body>
    //                 <Text>{item.NAME}</Text>
    //                 <Text note>{item.CATEGORY}</Text>
    //             </Body>
    //             <Right>
    //                 <Text note>{item.DUMB}</Text>
    //             </Right>
    //         </ListItem>
    //     </TouchableOpacity>
    // </View>
    //     )
    // }

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
                                        <FeedList
                                            email={item.email}
                                            fullName={item.fullName}
                                            photoUrl={item.photoUrl}
                                            RBG={item.RBG}
                                            RD={item.RD}
                                            HA={item.HA}
                                            BR={item.BR}
                                            RBB={item.RBB}
                                            time={item.timeSubmitted}
                                            phone={item.contact}
                                            likes={item.likes}
                                        />
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
