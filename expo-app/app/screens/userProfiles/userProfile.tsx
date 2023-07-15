/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { User } from '../../../../api/migrations/1687369134-createTableUsers';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';
import { apiBaseUrl } from '../../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.patternBackground,
    alignContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternBackground,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 80,
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
  buttonContainer: {
    flex: 10,
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
    marginVertical: 1,
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

  links: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
  bottomMenuButtonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    height: 70,
    backgroundColor: colors.patternBackground,
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
    borderRadius: 200,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleSquareButtonContainer: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type GetUserDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      userData: User;
    };

type EditUserDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      isEdited: boolean;
    };
// get User ???
export default function UserProfile() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userAddrStreet, setUserAddrStreet] = useState<string>('');
  const [userAddrHouseNo, setUserAddrHouseNo] = useState<string>('');
  const [userPostCode, setUserPostCode] = useState<string>('');
  const [userLocationCity, setUserLocationCity] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const successfulUploadAlert = () =>
    Alert.alert('It is done!', 'Your personal Data has been updated! !', [
      {
        text: 'Take me home',
        onPress: () => router.push('../home'),
      },
    ]);

  useEffect(() => {
    async function getUserData() {
      const userName = await SecureStore.getItemAsync('userName');
      console.log('getUserData');

      const response = await fetch(`${apiBaseUrl}/api/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          getDetails: 'all',
          userName: userName,
        }),
      });

      const data: GetUserDataResponseBody = await response.json();
      console.log(data);

      if ('errors' in data) {
        setErrors(data.errors);
        console.log(errors);
        return;
      }
      setUserName(data.userData.userName);
      setUserFirstName(data.userData.userFirstName);
      setUserLastName(data.userData.userLastName);
      setUserAddrStreet(data.userData.userAddrStreet);
      setUserAddrHouseNo(data.userData.userAddrHouseNo);
      setUserPostCode(data.userData.userPostCode);
      setUserLocationCity(data.userData.userLocationCity);
      setUserEmail(data.userData.userEmail);
      console.log('UserLastName', data.userData.userLastName);
    }

    getUserData().catch((error) => console.error(error));

    console.log('UserName', userFirstName);
  }, []);

  async function applyUserData() {
    console.log('userAddress', userAddrStreet);
    const response = await fetch(`${apiBaseUrl}/api/editUser`, {
      method: 'PUT',
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
      }),
    });

    const data: EditUserDataResponseBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    if (data.isEdited) {
      successfulUploadAlert();
    } else {
      console.log('Failed to update position');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          label="FoundLink"
          content="by Mozi since 1984"
          title="This is your Profile,"
        />
      </View>

      <Text style={{ color: colors.patternFont }}>{userName}</Text>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../globals/icons/robot_hello.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.roundedSquareButton}>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Email"
            onChangeText={setUserEmail}
            value={userEmail}
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

      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.roundedSquareButton}
          onPress={() => applyUserData()}
        >
          <Text style={styles.squareButtonText}>Apply changes</Text>
        </Pressable>

        <Pressable
          style={styles.roundedSquareButton}
          onPress={() => router.push('../home')}
        >
          <Text style={styles.squareButtonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
