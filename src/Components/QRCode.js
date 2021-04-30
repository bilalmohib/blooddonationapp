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
// import {
//     Container,
//     Header,
//     Content,
//     Card,
//     CardItem,
//     Thumbnail,
//     Left,
//     Body,
//     Item
// } from 'native-base';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Col, Row, Grid } from "react-native-easy-grid";

import { SliderBox } from "react-native-image-slider-box";

import image1 from '../UI/image1.jpg'
import image2 from '../UI/image2.jpg'
import image3 from '../UI/image3.jpg'
import image4 from '../UI/image4.jpg'



// const Home = ({ route, navigation }) => {

//     useEffect(() => {
//         const backAction = () => {
//             Alert.alert("Hold on!", "Are you sure you want to go back?", [
//                 {
//                     text: "Cancel",
//                     onPress: () => null,
//                     style: "cancel"
//                 },
//                 // { text: "YES", onPress: () => BackHandler.exitApp() }
//             ]);
//             return true;
//         };

//         const backHandler = BackHandler.addEventListener(
//             "hardwareBackPress",
//             backAction
//         );

//         return () => backHandler.remove();
//     }, []);


//     const { UserProfile } = route.params;

//     let images = [
//         image1,
//         image2,
//         image3,
//         image4, // Network image
//     ]


//     return (

//         <Container>
//             <SliderBox autoplay={true} circleLoop={true} images={images} />
//             <Content>
//                 <Card>
//                     <CardItem>

//                     </CardItem>
//                 </Card>
//             </Content>
//         </Container>

//     )
// }

// const styles = StyleSheet.create({
//     buttonText: {
//         fontSize: 25, color: "white",
//         width:"100%"
//     },
// });


// export default Home;
import { RNCamera } from 'react-native-camera';


class QRCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcodes: [],
        }
    }


    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => null,
    //                 style: "cancel"
    //             },
    //             // { text: "YES", onPress: () => BackHandler.exitApp() }
    //         ]);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );

    //     return () => backHandler.remove();
    // }, []);


    // const { UserProfile } = route.params;

    // let images = [
    //     image1,
    //     image2,
    //     image3,
    //     image4, // Network image
    // ]

    renderBarcode = ({ bounds, data }) => (
        <React.Fragment key={data + bounds.origin.x}>
            <View
                style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    position: 'absolute',
                    borderColor: '#F00',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 10,
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                }}
            >
                <Text style={{
                    color: '#F00',
                    flex: 1,
                    position: 'absolute',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                }}>{data}</Text>
            </View>
        </React.Fragment>
    );

    barcodeRecognized = ({ barcodes }) => this.setState({ barcodes })

    renderBarcodes = () => (
        <View>
            {this.state.barcodes.map(this.renderBarcode)}
        </View>
    );

    bta = () => {
        console.log("Bta==>" + this.state.barcodes.bounds.origin)
    }

    render() {
        console.log(this.state.barcodes)
        return (

            // <Container>
            //     <SliderBox autoplay={true} circleLoop={true} images={images} />

            //     <Content>
            //     <Text style={styles.welcome}>Welcome to React Native!</Text>
            //                 <Text style={styles.instructions}>To get started, edit App.js</Text>
            //                 <Text style={styles.instructions}>Use it</Text>
            //                 <RNCamera
            //                     ref={ref => {
            //                         this.camera = ref;
            //                     }}
            //                     style={{
            //                         flex: 1,
            //                         width: '100%',
            //                     }}
            //                 >
            //                 </RNCamera>
            //         {/* <Card>
            //             <CardItem>

            //             </CardItem>
            //         </Card> */}
            //     </Content>
            // </Container >
            <View style={styles.container}>

                <Text style={styles.welcome}>QR Code detector</Text>
                <Text style={styles.instructions}>Now you will be able to see the code detect</Text>
                {/* <Text style={styles.instructions}></Text> */}
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        width: '100%',
                    }}
                    onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                >
                    {this.renderBarcodes()}
                </RNCamera>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 25, color: "white",
        width: "100%"
    },
    welcome: {
        fontSize: 30,
        fontStyle: "italic"
    },
    instructions: {
        fontSize: 20
    },
    container: {
        height: "100%",
        width: "100%"
    }
});


export default QRCode;

