/* eslint-disable react/style-prop-object */
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../globals/globalData';
import Header from '../components/header';

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: 'column',
    alignItems: 'center',
    backgroundColor: '#19be9b',
  },
  logoContainer: {},

  squareButtonContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  squareButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorA,
    margin: 10,
    padding: 10,
  },
  squareButtonText: {
    textAlign: 'center',
    color: '#e9e2ef',
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorB,
  },
  bottomMenuNegButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternColorC,
  },
  bottomMenuButtonText: {
    textAlign: 'center',
    color: colors.patternColorD,
    /*  fontFamily: '', */
    fontSize: 15,
  },
  menuLinks: {
    color: colors.patternColorE,
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

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

  // App Page

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Header label="FoundLink" content="by Mozi since 1984" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => router.push('../(auth)/logout')}>
          <Text style={styles.menuLinks}>Logout</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./messages/messages')}>
          <Text style={styles.menuLinks}>Messages</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./userItems/userItems')}>
          <Text style={styles.menuLinks}>Items</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./userProfiles/userProfile')}>
          <Text style={styles.menuLinks}>Profile</Text>
        </Pressable>
      </View>
      <View style={styles.squareButtonContainer}>
        <Pressable
          onPress={() => router.push('./lostSomething/lostSomething')}
          style={styles.squareButton}
        >
          <Text style={styles.squareButtonText}>I lost something</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('./foundSomething/foundSomething')}
          style={styles.squareButton}
        >
          <Text style={styles.squareButtonText}>I found something</Text>
        </Pressable>
      </View>
      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.bottomMenuNegButton}
          onPress={() => router.replace('../(auth)/logout')}
        >
          <Text style={styles.bottomMenuButtonText}>Blue Pill</Text>
        </Pressable>
        <Pressable
          style={styles.bottomMenuPosButton}
          onPress={() =>
            Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
          }
        >
          <Text style={styles.bottomMenuButtonText}>Red Pill</Text>
        </Pressable>
      </View>
    </View>
  );
}
