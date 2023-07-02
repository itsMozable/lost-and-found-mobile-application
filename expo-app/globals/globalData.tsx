import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const colors = {
  patternBackground: '#3c545f',

  patternFont: '#ffffff',
  patternFontError: '#ff0000',
  patternFontLogo: '#19be9b',
  patternButtons: '#19be9b',
  patternBorderColor: '#ffffff',

  patternColorB: 'orange',
  patternColorC: 'pink',
  patternColorD: '#738d7f',
  patternColorF: '#19be9b',
  patternColorG: '#2d8cf0',
};

// Design über alle Seiten hinweg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.patternBackground,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternColorE,
  },

  ButtonContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  roundedSquareButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternButtons,
    margin: 20,
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
    color: 'red',
    fontSize: 15,
  },
});
