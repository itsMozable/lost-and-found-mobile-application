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
import { colors } from '../../globals/globalData';
import Header from '../components/header';
import { apiBaseUrl } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    color: colors.patternFont,
    borderStyle: 'solid',
    borderColor: '#B7B7B7',
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    color: colors.patternFont,
    marginTop: 5,
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: 'grey',
  },
  dropdownStyle: {
    marginHorizontal: 10,
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
    backgroundColor: colors.patternDropdown,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  roundedSquareButton: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternButtons,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
    zIndex: 1,
  },
  squareButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    fontSize: 15,
    zIndex: 1,
  },
  logIn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  links: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
  bottomMenuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 10,
  },

  bottomMenuButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    /*  fontFamily: '', */
    fontSize: 15,
  },
  menuLinks: {
    color: colors.patternFont,
    fontSize: 15,
    marginHorizontal: 15,
  },
  icon: {
    width: 150,
    height: 150,
  },
  iconContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleSquareButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type RegDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      user: {
        userName: string;
        firstName: string;
        lastName: string;
        addrStreet: string;
        addrHouseNo: string;
        postCode: string;
        locationCity: string;
        email: string;
        password: string;
      };
    };

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

    console.log(JSON.stringify(response));

    const data: RegDataResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      console.log(data.errors, 'errörs');

      return;
    }
    if (
      'user' in data &&
      data.user.userName &&
      data.user.firstName &&
      data.user.lastName &&
      data.user.addrStreet &&
      data.user.addrHouseNo &&
      data.user.postCode &&
      data.user.locationCity &&
      data.user.email &&
      data.user.password
    ) {
      successfulRegistrationAlert();
    } else {
      console.log('something went wrong');
      console.log(data);
    }
  }

  /* console.log(userName); */

  return (
    <ImageBackground
      source={require('../../globals/images/LP.jpeg')}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.headerContainer}>
          <Header label="FoundLink" content="by Mozi since 1984" title="" />
        </View>

        <ScrollView>
          <View style={styles.inputContainer}>
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

            <View style={styles.doubleSquareButtonContainer}>
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
            </View>
            <View style={styles.doubleSquareButtonContainer}>
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
            </View>
            <View style={styles.doubleSquareButtonContainer}>
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
            </View>
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
            <Text style={styles.squareButtonText}>Back</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
