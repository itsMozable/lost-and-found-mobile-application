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
import { User } from '../../../../api/migrations/1687369134-createTableUsers';
import { colors } from '../../../globals/globalData';
import Header from '../../header';
import { apiBaseUrl } from '../../index';

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
  const [userMiddleName, setUserMiddleName] = useState<string>('');
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

      const response = await fetch(`${apiBaseUrl}/api/userProfile`, {
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
      setUserMiddleName(data.userData.userMiddleName);
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
        userMiddleName: userMiddleName,
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logoContainer: {
      flex: 1,
      marginTop: 30,
      marginBottom: 10,
    },
    titleContainer: {
      height: 10,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      /*    fontFamily: '', */
      fontSize: 18,
      color: colors.patternColorD,
      textAlign: 'center',
    },

    inputsScrollview: {
      flex: 6.5,
      width: '80%',
    },
    doubleInputContainer: {
      height: 120,
      width: '100%',
      justifyContent: 'center',
    },
    singleInputContainer: {
      height: 65,
      width: '100%',
      justifyContent: 'center',
    },
    inputLabelContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    inputLabelText: {
      /*     fontFamily: '', */
      fontSize: 15,
      color: colors.patternColorD,
      marginLeft: 5,
    },
    textInputField: {
      height: 40,
      width: '100%',
      backgroundColor: colors.patternColorB,
      paddingLeft: 5,
      textAlign: 'left',
    },
    bottomMenuButtonContainer: {
      height: 3,
      paddingTop: 15,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      columnGap: 3,
    },
    bottomMenuPosButton: {
      flex: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.patternColorC,
    },
    bottomMenuNegButton: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.patternColorC,
    },
    bottomMenuButtonText: {
      textAlign: 'center',
      color: colors.patternColorC,
      /*     fontFamily: '', */
      fontSize: 20,
    },
    menuLinks: {
      color: colors.patternColorB,
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 20,
    },
    navigationBar: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Header label="User Profil" content={userName} />
      </View>
      <View style={styles.navigationBar}>
        <Pressable onPress={() => router.push('../home')}>
          <Text style={styles.menuLinks}>Back</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./messages/messages')}>
          <Text style={styles.menuLinks}>Messages</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./userItems/userItems')}>
          <Text style={styles.menuLinks}>Items</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./userProfiles/userProfile')}>
          <Text style={styles.menuLinks}>Profile</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.inputsScrollview}>
        <View style={styles.doubleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>User Name</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="User Name ?"
            onChangeText={setUserName}
            value={userName}
          />
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Name</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="First Name"
            onChangeText={setUserFirstName}
            value={userFirstName}
          />
          <TextInput
            style={styles.textInputField}
            placeholder="Middle Name"
            onChangeText={setUserMiddleName}
            value={userMiddleName}
          />
          <TextInput
            style={styles.textInputField}
            placeholder="Last Name"
            onChangeText={setUserLastName}
            value={userLastName}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Street</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="Address: Street"
            onChangeText={setUserAddrStreet}
            value={userAddrStreet}
          />
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>
              House Number / Additional Info
            </Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="Address: House Number"
            onChangeText={setUserAddrHouseNo}
            value={userAddrHouseNo}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Post Code</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="Post Code"
            onChangeText={setUserPostCode}
            value={userPostCode}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Location</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="Town / City"
            onChangeText={setUserLocationCity}
            value={userLocationCity}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Email</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="Email"
            onChangeText={setUserEmail}
            value={userEmail}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>password</Text>
          </View>
          <TextInput
            style={styles.textInputField}
            placeholder="password"
            onChangeText={setUserPassword}
            value={userPassword}
          />
        </View>
        <View style={styles.singleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}>Phone Number</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.bottomMenuNegButton}
          onPress={() => router.push('../home')}
        >
          <Text style={styles.bottomMenuButtonText}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.bottomMenuPosButton}
          onPress={() => applyUserData()}
        >
          <Text style={styles.bottomMenuButtonText}>Apply Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}
