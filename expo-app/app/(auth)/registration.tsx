import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RegisterResponseBodyPost } from '../../../api/app/api/(auth)/register/route';
import { colors } from '../../globals/globalData';
import { apiBaseUrl } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 5,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  inputsScrollview: {
    flex: 6.5,
    width: '80%',
  },
  registrationText: {
    /*  fontFamily: '', */
    fontSize: 30,
    color: colors.patternColorD,
  },
  regInputView: {
    backgroundColor: colors.patternColorB,
    width: '70%',
    height: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  regTextInput: {
    /* fontFamily: '', */
    flex: 1,
    height: 50,
  },
  signUpButton: {
    marginTop: 40,
    width: '60%',
    height: 40,
    backgroundColor: colors.patternColorA,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    /*     fontFamily: '', */
    color: '#FFF',
    fontSize: 20,
  },
  errorMessageText: {
    /*     fontFamily: '', */
    color: '#9e3030',
    fontSize: 15,
    textAlign: 'center',
    width: '70%',
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
});

type RegDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { userName: string } };

export default function RegisterForm() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userAddrStreet, setUserAddrStreet] = useState<string>('');
  const [userAddrHouseNo, setUserAddrHouseNo] = useState<string>('');
  const [userPostCode, setUserPostCode] = useState<string>('');
  const [userLocationCity, setUserLocationCity] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  // const [passwordShown, setPasswordShown] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  /*   const togglePassword = () => {
    setPasswordShown(!passwordShown);
 */
  const successfulRegistrationAlert = () =>
    Alert.alert('Signed up!', 'You have successfully signed up!', [
      { text: 'back to login', onPress: () => router.push('../') },
    ]);

  /* here: Zeile 23-42 vom Jose */
  /*
  async function register() {
    const response = await fetch(`${apiBaseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userName,
        firstName: userFirstName,
        lastName: userLastName,
        addrStreet: userAddrStreet,
        addrHouseNo: userAddrHouseNo,
        postCode: userPostCode,
        locationCity: userLocationCity,
        email: userEmail,
        password: userPassword,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

      if ('error' in data) {
      setErrors(data.error);
      return;
    }

    console.log(data);
    router.push('../');

    successfulRegistrationAlert();
  }*/

  async function createNewUser() {
    const response = await fetch(`${apiBaseUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        firstName: userFirstName,
        lastName: userLastName,
        addrStreet: userAddrStreet,
        addrHouseNo: userAddrHouseNo,
        postCode: userPostCode,
        locationCity: userLocationCity,
        email: userEmail,
        password: userPassword,
      }),
    });

    console.log(response);

    const data: RegDataResponseBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    console.log(data);
    successfulRegistrationAlert();
  }

  /* console.log(userName); */

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logo}>{/* <Header label="FoundLink" /> */}</View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.registrationText}>WELCOME!</Text>
        <Text style={styles.registrationText}>Please sign up here:</Text>
      </View>

      <ScrollView style={styles.inputsScrollview}>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="Username"
            onChangeText={setUserName}
            /* onChange={(event) => setUserName(event.currentTarget.value)} */
            value={userName}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="first Name"
            onChangeText={setUserFirstName}
            value={userFirstName}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="last Name"
            onChangeText={setUserLastName}
            value={userLastName}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="Address Street"
            onChangeText={setUserAddrStreet}
            value={userAddrStreet}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="House Number"
            onChangeText={setUserAddrHouseNo}
            value={userAddrHouseNo}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="Postal Code"
            onChangeText={setUserPostCode}
            value={userPostCode}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="Location City"
            onChangeText={setUserLocationCity}
            value={userLocationCity}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="Email"
            onChangeText={setUserEmail}
            value={userEmail}
          />
        </View>
        <View style={styles.regInputView}>
          <TextInput
            style={styles.regTextInput}
            placeholder="new Password"
            secureTextEntry={true}
            onChangeText={setUserPassword}
            value={userPassword}
          />
        </View>
      </ScrollView>

      {/*        {errors.map((error) => (
          <Text style={styles.errorMessageText} key={`error-${error.message}`}>
            {error.message}
          </Text>
        ))} */}
      <Pressable
        style={styles.signUpButton}
        onPress={
          () => createNewUser()
          /*               userName,
              userFirstName,
              userLastName,
              userAddrStreet,
              userAddrHouseNo,
              userPostCode,
              userLocationCity,
              userEmail,
              userPassword, */
          /* register() */
        }
      >
        <Text style={styles.signUpButtonText}>New User Sign - Up</Text>
      </Pressable>
      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.bottomMenuNegButton}
          onPress={() => router.replace('../')}
        >
          <Text style={styles.bottomMenuButtonText}>Home</Text>
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
