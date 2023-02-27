import *  as  React from 'react';

export const useLocalStorate = (key: string, initialValue: any) => { 
    const [storedValue, setStoredValue] = React.useState(() => { 
        try { 
            const value = window.localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }
        } catch (error) { 
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            setStoredValue(value);
        }
    }
    return [storedValue, setValue];
}