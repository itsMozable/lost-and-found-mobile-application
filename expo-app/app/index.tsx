'use client';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../globals/globalData';
import Header from './header';

const manifest = Constants;
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000`
    : 'http://localhost:3000';

console.log(apiBaseUrl);

type LoginDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { userName: string; token: string } };

export default function Index() {
  const router = useRouter();
  const [logUserName, setLogUserName] = useState<string>('');
  const [logPassword, setLogPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const successfulLogInAlert = () => router.push('../screens/home');

  async function attemptLogin(userName: string, password: string) {
    const response = await fetch(`${apiBaseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: logUserName, password: logPassword }),
    });
    console.log(response);

    const data: LoginDataResponseBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      console.log(data.errors);
      return;
    }

    successfulLogInAlert();
    // only at pocket offer backend but not Jose
    /*    await SecureStore.deleteItemAsync('loggedInAs');
    await SecureStore.deleteItemAsync('sessionToken');
    await SecureStore.deleteItemAsync('sessionSecret');

    await SecureStore.setItemAsync('loggedInAs', data.user.userName);
    await SecureStore.setItemAsync('sessionToken', data.user.token);

    const loggedInAs = await SecureStore.getItemAsync('loggedInAs');
    const sessionToken = await SecureStore.getItemAsync('sessionToken');

    if (loggedInAs === data.user.userName && sessionToken === data.user.token) {
      successfulLogInAlert();
    } else {
      console.log('failed to create client side session');
      return;
    } */
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#009877',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      marginBottom: 35,
    },
    loginInputView: {
      backgroundColor: colors.patternColorC,
      width: '50%',
      height: 30,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTextInput: {
      /* fontFamily: '', */
      flex: 1,
      height: 30,
    },
    loginButton: {
      width: '50%',
      height: 30,
      marginBottom: 10,
      backgroundColor: colors.patternColorA,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginText: {
      /* fontFamily: '', */
      color: '#FFF',
      fontSize: 15,
    },
    registerButton: {
      width: '50%',
      height: 30,
      marginBottom: 10,
      backgroundColor: colors.patternColorA,
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerText: {
      /*  fontFamily: '', */
      fontSize: 15,
      color: '#FFF',
    },
    errorMessageText: {
      /* fontFamily: '', */
      color: '#9e3030',
      fontSize: 15,
      textAlign: 'center',
      width: '50%',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logo}>
        <Header label="FoundLink" content="by Mozi since 1984" />
      </View>
      <View style={styles.loginInputView}>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Username"
          onChangeText={setLogUserName}
          value={logUserName}
        />
      </View>
      <View style={styles.loginInputView}>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setLogPassword}
          value={logPassword}
        />
      </View>
      {errors.map((error) => (
        <Text style={styles.errorMessageText} key={`error-${error.message}`}>
          {error.message}
        </Text>
      ))}
      <Pressable
        style={styles.loginButton}
        onPress={() => attemptLogin(logUserName, logPassword)}
      >
        <Text style={styles.loginText}>Login existing User</Text>
      </Pressable>
      <Pressable
        style={styles.registerButton}
        onPress={() => router.push('/(auth)/registration')}
      >
        <Text style={styles.registerText}>New User Sign - Up</Text>
      </Pressable>
      <Pressable
        style={styles.registerButton}
        onPress={() => router.push('screens/home')}
      >
        <Text style={styles.registerText}>Admin Button</Text>
      </Pressable>
    </View>
  );
}
