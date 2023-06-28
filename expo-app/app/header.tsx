import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../globals/globalData';

type Props = {
  label: string;
  content: string;
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.patternColorE,
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight + 5,
    paddingBottom: 10,
  },
  headerLabel: {
    color: colors.patternColorA,
    fontSize: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
    /*     fontFamily: '', */
  },
  headerContent: {
    color: colors.patternColorA,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 20,
    /*     fontFamily: '', */
  },
});

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerLabel}>{props.label}</Text>
        <Text style={styles.headerContent}>{props.content}</Text>
      </View>
    </SafeAreaView>
  );
}
