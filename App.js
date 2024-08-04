import "react-native-gesture-handler";
import React from 'react';
import Navigation from './Navigations';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
