/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
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
import { getValidSessionByToken } from '../../../../api/database/sessionsDatabase';
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
      const sessionToken = await SecureStore.getItemAsync('sessionToken');
      const sessionSecret = await SecureStore.getItemAsync('sessionSecret');
      const keyObject = JSON.stringify({
        keyA: sessionToken,
        keyB: sessionSecret,
      });

      const response = await fetch(`${apiBaseUrl}/api/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: keyObject,
        },
        body: JSON.stringify({
          getDetails: 'all',
        }),
      });
      const data: GetUserDataResponseBody = await response.json();

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
      setUserPassword(data.userData.passwordHash);
    }
    getUserData().catch((error) => console.error(error));
  }, []);

  async function applyUserData() {
    const sessionToken = await SecureStore.getItemAsync('sessionToken');
    const sessionSecret = await SecureStore.getItemAsync('sessionSecret');
    const keyObject = JSON.stringify({
      keyA: sessionToken,
      keyB: sessionSecret,
    });

    const response = await fetch(`${apiBaseUrl}/editUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: keyObject,
      },
      body: JSON.stringify({
        userName: userName,
        userFirstName: userFirstName,
        userLastName: userLastName,
        userAddrStreet: userAddrStreet,
        userAddrHouseNo: userAddrHouseNo,
        userPostCode: userPostCode,
        userLocationCity: userLocationCity,
        userEmail: userEmail,
        userPassword: userPassword,
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
        <Header label="User Profil" content={userName} title={''} />
      </View>

      <ScrollView style={styles.inputScrollview}>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>User Name</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="First Name"
            onChangeText={setUserFirstName}
            value={userFirstName}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>Name</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="First Name"
            onChangeText={setUserFirstName}
            value={userFirstName}
          />
          <TextInput
            style={styles.squareButtonText}
            placeholder="Last Name"
            onChangeText={setUserLastName}
            value={userLastName}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>Street</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Address: Street"
            onChangeText={setUserAddrStreet}
            value={userAddrStreet}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>
              House Number / Additional Info
            </Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Address: House Number"
            onChangeText={setUserAddrHouseNo}
            value={userAddrHouseNo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>Post Code</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Post Code"
            onChangeText={setUserPostCode}
            value={userPostCode}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>Location</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Town / City"
            onChangeText={setUserLocationCity}
            value={userLocationCity}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>Email</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="Email"
            onChangeText={setUserEmail}
            value={userEmail}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.roundedSquareButton}>
            <Text style={styles.squareButtonText}>password</Text>
          </View>
          <TextInput
            style={styles.squareButtonText}
            placeholder="password"
            onChangeText={setUserPassword}
            value={userPassword}
          />
        </View>

        <View style={styles.bottomMenuButtonContainer}>
          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => router.push('../home')}
          >
            <Text style={styles.squareButtonText}>Home</Text>
          </Pressable>
          <Pressable
            style={styles.roundedSquareButton}
            onPress={() => applyUserData()}
          >
            <Text style={styles.squareButtonText}>Apply Changes</Text>
          </Pressable>
        </View>
        <View style={styles.bottomMenuButtonContainer}>
          <Pressable onPress={() => router.push('../home')}>
            <Text style={styles.menuLinks}>Home</Text>
          </Pressable>

          <Pressable onPress={() => router.push('../messages/messages')}>
            <Text style={styles.menuLinks}>Messages</Text>
          </Pressable>
          <Pressable onPress={() => router.push('../userItems/userItems')}>
            <Text style={styles.menuLinks}>Items</Text>
          </Pressable>
          <Pressable onPress={() => router.push('../userProfiles/userProfile')}>
            <Text style={styles.menuLinks}>Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
