import * as React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

import { Colors, Fonts } from '~/styles';

import BibleLogo from '~/assets/bible-logo.png';

type Props = {};

const SplashScreen: React.FC<Props> = () => {
  return (
    <View style={styles.wrapper}>
      <Image source={BibleLogo} style={styles.logo} />
      <Text style={styles.welcomeText}>
        Welcome to <Text style={styles.appNameText}>Mini Bible</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    ...Fonts.R18,
    marginTop: 20,
    fontSize: 20,
  },
  appNameText: {
    ...Fonts.B18,
    color: Colors.primary,
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default SplashScreen;
