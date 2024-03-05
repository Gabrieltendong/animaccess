// import 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
// import Rooter from 'src/navigations';
// import {enableLatestRenderer} from 'react-native-maps';

// enableLatestRenderer();

// const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    //   <NavigationContainer>
    //     <Rooter />
    //   </NavigationContainer>
    // </QueryClientProvider>
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text>Bonjour le monde</Text>
    </View>
  );
};

export default App;
