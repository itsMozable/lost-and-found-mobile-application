import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../globals/globalData';

type Props = {
  label: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    width: '100%',
  },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  label: {
    color: colors.patternColorA,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Pacifico_400Regular',
  },
});
