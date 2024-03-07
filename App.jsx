import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import Rooter from 'src/navigations';
import {enableLatestRenderer} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyAFpAbTDluIMS4p9EnCNEGjJmcf64JDtx0");

enableLatestRenderer();

const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []); 

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Rooter />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
