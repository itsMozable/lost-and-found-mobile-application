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
import { colors } from '../../globals/globalData';
import Header from '../header';

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

  // Styling
  const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexdirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    logoContainer: {
      flex: 1,
      marginTop: 30,
      marginBottom: 10,
    },
    squareButtonContainer: {
      flex: 20,
      justifyContent: 'space-evenly',
    },
    squareButton: {
      width: '90%',
      aspectRatio: 2 / 1,
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
    menuLinks: {
      color: colors.patternColorB,
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 20,
    },
  });

  // App Page

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Header label="FoundLink" content="" />
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
          <Text style={styles.menuLinks}>Profil</Text>
        </Pressable>
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
