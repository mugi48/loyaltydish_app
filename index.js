import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { persistor, store } from './src/Store';
import client from './src/Store/services/Client';
import { name as appName } from './app.json'; // Ensure this file exists and contains the app name

const Main = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Main);
