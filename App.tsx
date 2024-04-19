/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [openUrl, setOpenUrl] = useState<boolean>();
  const [url, setUrl] = useState<string>('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const openLink = async () => {
    const supported = await Linking.canOpenURL(url);
    if (!supported) return Alert.alert('Please provide correct url.');
    if (openUrl) {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      }
    } else {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.mainView}>
          <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 20}}>
            Enter the URL to open it
          </Text>
          <Text style={styles.label}>URL:</Text>
          <TextInput
            style={styles.textInput}
            value={url}
            onChangeText={text => setUrl(text)}
          />
          <Text style={[styles.label, {marginTop: 20}]}>
            You want to open the URL in:
          </Text>
          <View style={styles.openUrlText}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setOpenUrl(true)}>
              <View style={styles.radio}>
                {openUrl && <View style={styles.radioDark}></View>}
              </View>
              <Text>In app browser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setOpenUrl(false)}>
              <View style={[styles.radio, {marginLeft: 10}]}>
                {!openUrl && <View style={styles.radioDark}></View>}
              </View>
              <Text>Normal browser</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={openLink}
            disabled={!url}
            style={[styles.button, {backgroundColor: !url ? 'grey' : 'blue'}]}>
            <Text style={{color: 'white', fontWeight: '700'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mainView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {fontWeight: '700', paddingBottom: 5, fontSize: 18},
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  openUrlText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    marginVertical: 10,
  },
  radio: {
    borderWidth: 0.5,
    height: 15,
    width: 15,
    borderRadius: 30,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDark: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  button: {
    height: 40,
    width: '70%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default App;
