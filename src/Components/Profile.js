import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
const Profile = ({ route, navigation }) => {
    const { UserProfile } = route.params;
    return (
        // fullName: UserProfile.first_name + " " + UserProfile.last_name,
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
      <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: `${UserProfile.picture.data.url}`}} />
                <Body>
                  <Text>{UserProfile.first_name + " " + UserProfile.last_name}</Text>
                  <Text note>{UserProfile.email}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: `${UserProfile.picture.data.url}`}} style={{height: 200, width: 200, flex: 1}}/>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }


export default Profile;