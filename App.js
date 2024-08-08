import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './Navigations';
import { ToastProvider } from './ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </ToastProvider>
  );
}
