
import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar,  ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview'


const Website = () => {
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={styles.flexContainer}>
          <WebView
           startInLoadingState={true}
           renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
              style={styles.flexContainer}
            />
          )}
           source={{ uri: 'https://github.com/Muhammad-Bilal-7896/' }} />
        </SafeAreaView>
      </>
    )
  }
  
  const styles = StyleSheet.create({
    flexContainer: {
      flex: 1
    }
  })
  
  export default Website;