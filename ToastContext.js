import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type,
            position: 'bottom',
            text1,
            text2,
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
