import Constants from 'expo-constants';

const manifest = Constants;
/* const apiBaseUrl = 'http://192.168.1.169:3000/api'; */
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api`
    : 'https://api.example.com';

console.log(apiBaseUrl);

export const colors = {
  patternColorA: '#4761C2',
  patternColorB: '#DDE6FF',
  patternColorC: '#C2D3F2',
  patternColorD: '#273774',
  patternColorE: '#E3E9FF',
  patternColorF: '#f2f4fd',
};
