/* eslint-disable react/style-prop-object */
import 'expo-router/entry';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { apiUrl, colors } from './globals/globalData';
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

  async function attemtLogin(userName: string, password: string) {
    const response = await fetch(`${apiUrl}/login`, {
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
        <Header label="POCKET OFFER" />
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
        onPress={() => attemtLogin(logUserName, logPassword)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </Pressable>
      <Pressable
        style={styles.registerButton}
        onPress={() => router.push('/loginAndAuth/registration')}
      >
        <Text style={styles.registerText}>Sign up as new user</Text>
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
    fontFamily: 'NotoSans_400Regular',
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
    fontFamily: 'NotoSans_600SemiBold',
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
    fontFamily: 'NotoSans_600SemiBold',
    fontSize: 15,
    color: '#FFF',
  },
  errorMessageText: {
    fontFamily: 'NotoSans_600SemiBold',
    color: '#9e3030',
    fontSize: 15,
    textAlign: 'center',
    width: '70%',
  },
});
