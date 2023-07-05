import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RegisterResponseBodyPost } from '../../../api/app/api/(auth)/register/route';
import { colors } from '../../globals/globalData';
import Header from '../components/header';
import { apiBaseUrl } from '../index';

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
    flex: 10,
    justifyContent: 'center',
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

  const successfulRegistrationAlert = () =>
    Alert.alert('Signed up!', 'You have successfully signed up!', [
      { text: 'back to login', onPress: () => router.push('../') },
    ]);

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
    <ImageBackground
      source={require('../../globals/images/LP.jpeg')}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.container}>
          <Header label="FoundLink" content="by Mozi since 1984" title={''} />
        </View>
        <ScrollView>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Username"
              onChangeText={setUserName}
              /* onChange={(event) => setUserName(event.currentTarget.value)} */
              value={userName}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="first Name"
              onChangeText={setUserFirstName}
              value={userFirstName}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="last Name"
              onChangeText={setUserLastName}
              value={userLastName}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Address Street"
              onChangeText={setUserAddrStreet}
              value={userAddrStreet}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="House Number"
              onChangeText={setUserAddrHouseNo}
              value={userAddrHouseNo}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Postal Code"
              onChangeText={setUserPostCode}
              value={userPostCode}
            />
          </View>
          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Location City"
              onChangeText={setUserLocationCity}
              value={userLocationCity}
            />
          </View>

          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="Email"
              onChangeText={setUserEmail}
              value={userEmail}
            />
          </View>

          <View style={styles.roundedSquareButton}>
            <TextInput
              style={styles.squareButtonText}
              placeholder="new Password"
              secureTextEntry={true}
              onChangeText={setUserPassword}
              value={userPassword}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomMenuButtonContainer}>
          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => createNewUser()}
          >
            <Text style={styles.squareButtonText}>Sign - Up</Text>
          </Pressable>

          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => router.push('../')}
          >
            <Text style={styles.squareButtonText}>Index</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
