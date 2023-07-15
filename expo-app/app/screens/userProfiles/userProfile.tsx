/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
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
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternBackground,
  },
  inputContainer: {
    flex: 10,
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
  },
  iconContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputScrollview: {
    flex: 1,
  },
  doubleSquareButtonContainer: {
    flex: 1,
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

  useEffect(() => {
    async function getUserData() {
      console.log('getUserData');

      const response = await fetch(`${apiBaseUrl}/api/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          getDetails: 'all',
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
    const response = await fetch(`${apiBaseUrl}/editUser`, {
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
      router.replace(`../home`);
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
          title="Hello ${userName}!"
        />
      </View>

      <ScrollView>
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
      </ScrollView>
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
