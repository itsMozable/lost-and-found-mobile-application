import { useFonts } from '@expo-google-fonts/pacifico';
/* eslint-disable react/style-prop-object */
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { apiBaseUrl, colors } from '../globals/globalData';
import Header from './header';

type LoginDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { username: string; token: string } };

export default function Index() {
  const router = useRouter();
  const [logUserName, setLogUserName] = useState<string>('');
  const [logPassword, setLogPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  async function attemptLogin(userName: string, password: string) {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data: LoginDataResponseBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    await SecureStore.deleteItemAsync('loggedInAs');
    await SecureStore.deleteItemAsync('sessionToken');
    await SecureStore.deleteItemAsync('sessionSecret');

    await SecureStore.setItemAsync('loggedInAs', data.user.username);
    await SecureStore.setItemAsync('sessionToken', data.user.token);

    const loggedInAs = await SecureStore.getItemAsync('loggedInAs');
    const sessionToken = await SecureStore.getItemAsync('sessionToken');

    if (loggedInAs === data.user.username && sessionToken === data.user.token) {
      router.replace({
        pathname: '/loginAndAuth/authorization',
        params: {
          home: '../screens/home',
        },
      });
    } else {
      console.log('failed to create client side session');
      return;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logo}>
        <Header label="FoundLink" />
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
        <Text style={styles.loginText}>LOGIN</Text>
      </Pressable>
      <Pressable
        style={styles.registerButton}
        onPress={() => router.push('/loginAndAuth/registration')}
      >
        <Text style={styles.registerText}>New User Sign - Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 140,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 80,
  },
  loginInputView: {
    backgroundColor: colors.patternColorB,
    width: '70%',
    height: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  loginTextInput: {
    /* fontFamily: '', */
    flex: 1,
    height: 50,
  },
  loginButton: {
    marginTop: 50,
    width: '60%',
    height: 50,
    backgroundColor: colors.patternColorA,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    /* fontFamily: '', */
    color: '#FFF',
    fontSize: 20,
  },
  registerButton: {
    marginTop: 50,
    width: '60%',
    height: 30,
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
    width: '70%',
  },
});
