'use client';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../globals/globalData';
import Header from './components/header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
  },
  ButtonContainer: {
    flex: 1,
    marginBottom: 150,
  },
  roundedSquareButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternButtons,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
  },
  squareButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    fontSize: 20,
  },
  bottomMenuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.patternBackground,
    gap: 30,
  },

  bottomMenuButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    fontSize: 15,
  },
  menuLinks: {
    color: colors.patternFont,
    fontSize: 15,
    marginHorizontal: 15,
  },
  errorMessageText: {
    color: colors.patternFontError,
    fontSize: 15,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

const manifest = Constants;
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000`
    : 'http://localhost:3000';

console.log(apiBaseUrl);

type LoginDataResponseBody =
  | {
      error: string;
    }
  | { user: { userName: string; token: string } };

export default function Index() {
  const router = useRouter();
  const [logUserName, setLogUserName] = useState<string>('');
  const [logPassword, setLogPassword] = useState<string>('');
  const [error, setError] = useState('');

  const successfulLogInAlert = () => router.push('../screens/home');

  async function attemptLogin() {
    const response = await fetch(`${apiBaseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: logUserName, password: logPassword }),
    });
    console.log(JSON.stringify(response));

    const data: LoginDataResponseBody = await response.json();
    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    successfulLogInAlert();
  }

  return (
    <ImageBackground
      source={require('../globals/images/LP.jpeg')}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.headerContainer}>
          <Header label="FoundLink" content="by Mozi since 1984" title={''} />
        </View>

        <Image
          source={require('../globals/icons/raccoon_head.png')}
          style={styles.icon}
        />

        <View style={styles.ButtonContainer}>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Username"
              onChangeText={setLogUserName}
              value={logUserName}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setLogPassword}
              value={logPassword}
            />
          </View>
          <Text style={styles.errorMessageText} key={`error-${error}`}>
            {error}
          </Text>

          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => attemptLogin()}
          >
            <Text style={styles.squareButtonText}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => router.push('/(auth)/registration')}
          >
            <Text style={styles.squareButtonText}>Sign - Up</Text>
          </Pressable>
          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => router.push('screens/home')}
          >
            <Text style={styles.squareButtonText}>Super Secret Button</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
