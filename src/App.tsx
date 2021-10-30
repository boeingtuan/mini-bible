import React from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigation from '~/RootNavigation';
import SplashScreen from '~/components/SplashScreen';
import { persistor, store } from '~/redux/store';
import { MINIMUM_SPLASH_SCREEN_TIME } from '~/const';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsShowSplashScreen(false);
    }, MINIMUM_SPLASH_SCREEN_TIME);
  }, [setIsShowSplashScreen]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {bootstrapped => {
          if (!bootstrapped || isShowSplashScreen) {
            return <SplashScreen />;
          }
          return <RootNavigation />;
        }}
      </PersistGate>
    </Provider>
  );
};

export default App;
