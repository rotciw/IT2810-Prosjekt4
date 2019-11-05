import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

// Apollo Client imports
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// MobX provider
import { Provider } from 'mobx-react';

// MobX store
import RootStore from './stores/RootStore';

// RootStore is a class that constructs the other stores
const rootStore = new RootStore();

// Initialize ApolloClient with url to the GraphQL interface on the server
const client = new ApolloClient({ uri: 'http://it2810-38.idi.ntnu.no:3000/graphql' });

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApolloProvider client={client}>
      {/* MobX Provider for all components from App component */}
      {/* For each component that uses store, the corresponding store injected */}
        <Provider
          rootStore={rootStore}
          filterStore={rootStore.filterStore}
          sortStore={rootStore.sortStore}
          searchBarStore={rootStore.searchBarStore}
          paginationStore={rootStore.paginationStore}
        >
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
