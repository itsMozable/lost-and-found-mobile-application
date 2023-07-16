/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../globals/globalData';
import { apiBaseUrl } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.patternBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    /*   fontFamily: '', */
    fontSize: 30,
    color: colors.patternFont,
  },
});

export default function Logout() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  useEffect(() => {
    async function LogoutOnRoute() {
      const tokenToClearSession = await SecureStore.getItemAsync('token');
      async function clearSecureStorage() {
        await SecureStore.deleteItemAsync('userName');
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('secret');

        const userName = await SecureStore.getItemAsync('userName');
        const token = await SecureStore.getItemAsync('token');
        const secret = await SecureStore.getItemAsync('secret');

        if (userName || token || secret) {
          console.log('Session Cleanup Failed');
        }
      }
      if (tokenToClearSession) {
        const response = await fetch(`${apiBaseUrl}/api/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: tokenToClearSession,
          },
          body: null,
        });
        const data = await response.json();
        if ('errors' in data) {
          setErrors(data.errors);
          console.log(errors);
          clearSecureStorage();
          router.replace('../../');
        }
        router.replace('../../');
      } else {
        console.log('failed to load Token');
        clearSecureStorage();
        router.replace('../../');
      }
    }
    LogoutOnRoute();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Logging you out</Text>
    </View>
  );
}
