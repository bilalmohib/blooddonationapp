import React, { Component } from "react";
import LottieView from 'lottie-react-native';
import { View, Text } from 'react-native';


class Splash extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}
            >
                <LottieView 
                source={require('../Snippets/splash.json')} 
                autoPlay 
                loop={false}
                speed={0.5}
                onAnimationFinish={()=>
                   this.props.navigation.navigate('Login')
                    // console.log("I will navigate now")
                }
                 />
            </View>
        )
    }
}
export default Splash;