import React, { Component, useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
// import statusCodes along with GoogleSignin
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

import Icon from 'react-native-vector-icons/FontAwesome';

import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';
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
  TouchableOpacity
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
} from 'native-base';
// GoogleSignin.configure({
//   webClientId: '393392146268-kfo91hi9aj5kclf12qlr0b7hmub4eive.apps.googleusercontent.com',
//   offlineAccess: true,
//   hostedDomain: '',
//   forceConsentPrompt: true,
// });



function Login({ navigation }) {
  // const [data, setData] = useState([]);

  const [userExists, setUserExists] = useState(false);

  const alldataUser = [];

  // let userExists = false;

  // AccessToken.getCurrentAccessToken().then(
  //   (at) => {


  //     if (at.accessToken != null) {

  //       console.log("Yahan dekho==>", at.accessToken);
  //       fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + at.accessToken)
  //         .then((response) => {
  //           response.json().then((json) => {
  //             // const ID = json.id
  //             // console.log("ID " + ID);

  //             const allData = json

  //             const EM = json.email;

  //             console.log("Email is: "+EM)


  //             database()
  //               .ref('/PersonalDetailsSignUp')
  //               .on('value', (snapshot) => {
  //                 var userPersonalDetails = snapshot.val();
  //                 //            console.log(userPersonalDetails);

  //                 let keys = Object.keys(userPersonalDetails);
  //                 console.log(keys);

  //                 for (let i = 0; i < keys.length; i++) {
  //                   let strKeys = keys[i].toString();

  //                   let email = userPersonalDetails[strKeys].email;

  //                   const EM = json.email;

  //                   console.log("Email is: "+EM)

  //                   console.log("Email " + json.email);
  //                   if (json.email == email) {
  //                     console.log("The User Exists");



  //                   }


  //                 }
  //               });

  //             // const FN = json.first_name
  //             // console.log("First Name " + FN);
  //           })
  //         })
  //         .catch(() => {
  //           console.log('ERROR GETTING DATA FROM FACEBOOK')
  //         })

  //     } //Refresh it every time
  //   }
  // );




  ///////////////////////////This is for stoping the user from going back but inside class components////////////////////////////
  // constructor(props) {
  //     super(props);
  //     // this.state={
  //     //     user_info:{}
  //     // }
  // }

  // componentDidMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  // AccessToken.getCurrentAccessToken().then(
  //     (data) => { console.log("Yahan dekho==>", data); } //Refresh it every time
  // );

  // }

  // componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

  // }

  // handleBackButton() {
  //     // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //     return true;
  // }
  ///////////////////////////This is for stoping the user from going back but inside class components////////////////////////////
  // async function onGoogleButtonPress() {
  //   // Get the users ID token
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     setData(userInfo);
  //     console.log(userInfo)
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //       // user has not signed in yet
  //     } else {
  //       // some other error
  //     }
  //   }
  // }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
      // ToastAndroid.show('User cancelled the login process', ToastAndroid.SHORT);
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
      // ToastAndroid.show('Something went wrong obtaining access token', ToastAndroid.SHORT);
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential)
      .then((user) => {
        console.log("USER DATA ==> ", JSON.stringify(user));


        database()
          .ref('/PersonalDetailsSignUp')
          .once('value', (snapshot) => {
            var userPersonalDetails = snapshot.val();
            //            console.log(userPersonalDetails);

            let keys = Object.keys(userPersonalDetails);
            console.log(keys);

            var i = 0;

            while (i < keys.length) {
              let strKeys = keys[i].toString();

              let email = userPersonalDetails[strKeys].email;

              //console.log("Email is: "+EM)

              console.log("Email " + email);
              if (user.additionalUserInfo.profile.email == email) {
                console.log("The User Exists");
                navigation.navigate('MyDrawer', {
                  UserProfile: user.additionalUserInfo.profile
                })
                return;

              }
              else {
                navigation.navigate('SignUp', {
                  UserProfile: user.additionalUserInfo.profile
                })
              }

              i++;


            }
          });



        // setUserInfo(user);
        // setStatus(true);
        // navigation.navigate('Home');
      })
      .catch((err) => {
        console.log("Error=> ", err);
        // ToastAndroid.show("Error=> ", err, ToastAndroid.SHORT);
      })
  }

  // on() method
  // useEffect(() => {


  //   AccessToken.getCurrentAccessToken().then(
  //     (at) => {


  //       if (at.accessToken != null) {

  //         console.log("Yahan dekho==>", at.accessToken);
  //         fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,picture&access_token=' + at.accessToken)
  //           .then((response) => {
  //             response.json().then((json) => {
  //               // const ID = json.id
  //               // console.log("ID " + ID);

  //               const allData = json

  //               alldataUser.push(json);

  //               database()
  //                 .ref('/PersonalDetailsSignUp')
  //                 .once('value', (snapshot) => {
  //                   var userPersonalDetails = snapshot.val();
  //                   //            console.log(userPersonalDetails);

  //                   let keys = Object.keys(userPersonalDetails);
  //                   console.log(keys);

  //                   for (let i = 0; i < keys.length; i++) {
  //                     let strKeys = keys[i].toString();

  //                     let email = userPersonalDetails[strKeys].email;

  //                     //console.log("Email is: "+EM)

  //                     console.log("Email " + json.email);
  //                     if (allData.email == email) {
  //                       console.log("The User Exists");

  //                       setUserExists(true)

  //                     }


  //                   }
  //                 });

  //               // const FN = json.first_name
  //               // console.log("First Name " + FN);
  //             })
  //           })
  //           .catch(() => {
  //             console.log('ERROR GETTING DATA FROM FACEBOOK')
  //           })

  //       } //Refresh it every time
  //     }
  //   );

  // })


  const app = () => {
    console.log("DATA in return ", alldataUser[0].picture.data.url)
  }

  return (

    <Container>
      {/* <Header /> */}
      <Content>
        <Card style={{ flex: 1, marginTop: "20%" }}>
          <CardItem>
            <Body>
              <Body>
                <Image style={{ height: 100, width: 100, flex: 1 }} source={require('../UI/bloodIcon.jpeg')} />
              </Body>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Body>
                <Text style={styles.textHeading}>
                  Welcome to Pakistan Donor
                </Text>
              </Body>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              {/* <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => firebaseGoogleLogin().then(() => console.log('Signed in with Google!'))}
              // disabled={isSigninInProgress} 
              /> */}
              {/* <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              /> */}
              <Body>
                {(userExists) ? (
                  <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontStyle: "italic", color: "grey" }}>
                      You are already logged in.
                  </Text>

                    {/* <Button title="Press me" onPress={app} /> */}


                    <Text></Text>

                    <Text></Text>

                    <Body>

                      <Icon.Button
                        name="facebook"
                        backgroundColor="#3b5998"
                        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                      >
                        Login with Facebook
                      </Icon.Button>
                    </Body>

                    <Text></Text>

                    <Text style={{ fontSize: 18, color: "green" }}>By Muhammad Bilal Mohib ul Nabi</Text>

                    <Icon.Button
                      name="github"
                      backgroundColor="grey"
                      onPress={() => navigation.navigate('Website')}
                    >
                      Github Profile Link of Developer
                      </Icon.Button>

                  </View>
                ) : (
                    <View>
                      <Text style={{ textAlign: "center", fontSize: 20, fontStyle: "italic", color: "grey" }}>
                        Sign Up/Login to continue to the blood donation app
                      </Text>

                      {/* <Button title="Press me" onPress={app} /> */}


                      <Text></Text>

                      <Icon.Button
                        name="facebook"
                        backgroundColor="#3b5998"
                        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
                      >
                        SignUp/Login with Facebook
                      </Icon.Button>

                      <Text></Text>

                      <Icon.Button
                        name="github"
                        backgroundColor="grey"
                        onPress={() => navigation.navigate('Website')}
                      >
                        Github Profile Link of Developer
                      </Icon.Button>

                      <Text></Text>

                      <Text style={{ fontSize: 18, color: "green" }}>By Muhammad Bilal Mohib ul Nabi</Text>

                    </View>
                  )}


              </Body>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({

  textHeading: {
    color: 'black',
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 30,
    textAlign: 'center'
  },

});

export default Login;


// import React from 'react';
// import { Button,View,Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';



// function Login({navigation}) {

    // async function onFacebookButtonPress() {
    //     // Attempt login with permissions
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //     if (result.isCancelled) {
    //       throw 'User cancelled the login process';
    //     }

    //     // Once signed in, get the users AccesToken
    //     const data = await AccessToken.getCurrentAccessToken();

    //     if (!data) {
    //       throw 'Something went wrong obtaining access token';
    //     }

    //     // Create a Firebase credential with the AccessToken
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //     // Sign-in the user with the credential
    //     auth().signInWithCredential(facebookCredential)
    //     .then((user) => {
    //         console.log("USER DATA ==> ", user);
    //         // this.setState({
    //         //     user_info:user
    //         // })
    //         // this.setState({ userInfo: user, loggedIn: true })
    //         this.props.navigation.navigate('Detail')

    //         // navigation.navigate('Home')
    //     })
    //     .catch((err) => {
    //         this.props.navigation.navigate('Detail')
    //         console.log("Error=> ", err);
    //     })

    //   }

//   return (
//       <View>

//     <Button
//       title="Facebook Sign-In"
//       onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
//     />
//     </View>
//   );
// }
// export default Login;