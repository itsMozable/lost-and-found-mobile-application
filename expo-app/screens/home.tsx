/* eslint-disable react/style-prop-object */
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/header';
import { colors } from '../globals/globalData';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Leaving FoundLink',
        'Are you sure you want to "get lost" ?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Header label="FoundLink" />
      </View>
      <View style={styles.squareButtonContainer}>
        <Pressable
          onPress={() => router.push('./newOffer/newOffer')}
          style={styles.squareButton}
        >
          <Text style={styles.squareButtonText}>I have something lost</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('./openExistingOffer/openOffer')}
          style={styles.squareButton}
        >
          <Text style={styles.squareButtonText}>i found something</Text>
        </Pressable>
      </View>
      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.bottomMenuNegButton}
          onPress={() => router.replace('../loginAndAuth/logout')}
        >
          <Text style={styles.bottomMenuButtonText}>Logout</Text>
        </Pressable>

        <Pressable
          style={styles.bottomMenuPosButton}
          onPress={() => router.push('./userProfile/userProfile')}
        >
          <Text style={styles.bottomMenuButtonText}>
            User Profile / Settings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexdirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    marginTop: 60,
  },
  squareButtonContainer: {
    flex: 5,
    justifyContent: 'space-evenly',
  },
  squareButton: {
    width: '40%',
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorA,
  },
  squareButtonText: {
    textAlign: 'center',
    color: '#FFF',
    /*   fontFamily: '', */
    fontSize: 20,
  },
  bottomMenuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    columnGap: 3,
  },
  bottomMenuPosButton: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorC,
  },
  bottomMenuNegButton: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorC,
  },
  bottomMenuButtonText: {
    textAlign: 'center',
    color: colors.patternColorD,
    /*  fontFamily: '', */
    fontSize: 20,
  },
});
