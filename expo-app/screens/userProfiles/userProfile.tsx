/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { apiBaseUrl, colors } from '../../globals/globalData';

type GetUserDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      userData: {
        userName: string;
        userFirstName: string;
        userMiddleName: string;
        userLastName: string;
        userAddrStreet: string;
        userAddrHouseNo: string;
        userPostCode: string;
        userLocationCity: string;
        userEmail: string;
        userPassword: string;
      };
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
//get User ???
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

      const response = await fetch(`${apiBaseUrl}/getUser`, {
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
      setUserPassword(data.userData.userPassword);
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>User Data:</Text>
      </View>
      <ScrollView style={styles.inputsScrollview}>
        <View style={styles.doubleInputContainer}>
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabelText}> User Name ? :</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    height: 90,
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
    height: 115,
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
    color: colors.patternColorD,
    /*     fontFamily: '', */
    fontSize: 20,
  },
});
