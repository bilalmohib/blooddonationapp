import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Splash from './src/Components/Splash';
import Login from './src/Components/Login';
import Website from './src/Components/Website';
import SignUp from './src/Components/SignUp';
import Home from './src/Components/Home';
import Feed from './src/Components/Feed';
import Donations from './src/Components/Donations';
import About from './src/Components/About';
import Request from './src/Components/Request';
import Profile from './src/Components/Profile';

import DetailsData from "./src/Components/DetailsData";

import FeedList from './src/Components/FeedList';

import QRCode from './src/Components/QRCode';

import BarCode from './src/Components/BarCode';






// // For Drawer Navigation
// const Drawer = createDrawerNavigator();

// function MyDrawer({ route, navigation }) {

//   const { UserProfile } = route.params;

//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={Home}
//         options={{
//           title: 'My home',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//         initialParams={{ UserProfile: UserProfile }} />
//       <Drawer.Screen name="Feed"
//         component={Feed}
//       // options={{
//       //   headerLeft: () => (
//       //     <HeaderBackButton
//       //     onPress={() => navigation.navigate('Home',{
//       //       UserProfile: UserProfile
//       //     })}
//       //     />
//       //   ),
//       // }}


//       />
//       <Drawer.Screen name="Donations" component={Donations} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="About Me" component={About} />
     
//     </Drawer.Navigator>
//   );
// }
// // For Drawer Navigation





const MainStackNavigation = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <MainStackNavigation.Navigator initialRouteName="Home">
        <MainStackNavigation.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false
          }}
        />
        <MainStackNavigation.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />

        <MainStackNavigation.Screen
          name="Website"
          component={Website}
          options={{

          }}
        />
        <MainStackNavigation.Screen
          name="SignUp"
          component={SignUp}
          options={{

          }}
        />
        {/* <MainStackNavigation.Screen
          name="Request"
          component={Request}
          options={{
            title: 'Make a Blood Request',
          }}
        /> */}
        {/* <MainStackNavigation.Screen
          name="Feed"
          component={Feed}
          options={{
            title: 'Feed',
          }}
        /> */}
        
        {/* <MainStackNavigation.Screen
          name="DetailsData"
          component={DetailsData}
          options={{
            title: 'DetailsData',
          }}
        /> */}

        

        {/* <MainStackNavigation.Screen
          name="Donations"
          component={Donations}
          options={{
            title: 'My Donations',
          }}
        /> */}

        {/* <MainStackNavigation.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{
            // navigationOptions: {
            //   title: 'MyScreen',

            // }
            title: "Blood For Life",
            headerLeft: null,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
              paddingLeft: "15%"
            },
          }}
        /> */}
         <MainStackNavigation.Screen
          name="QRCode"
          component={QRCode}
          options={{
            title: 'QR Code',
          }}
        />
        <MainStackNavigation.Screen
          name="BarCode"
          component={BarCode}
          options={{
            title: 'Bar Code',
          }}
        />

        <MainStackNavigation.Screen
          name="Home"
          component={Home}
          options={{
            title: 'QR Bar Code Scanner App',
            headerStyle: {
              backgroundColor: 'rgb(2, 117, 216)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
              paddingLeft: "15%"
            },
          }}
        />
      </MainStackNavigation.Navigator>
    </NavigationContainer>
  );
}


export default App;