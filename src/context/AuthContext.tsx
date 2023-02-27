import * as React from 'react';
import { useRouter } from 'next/router';


type authContextType = {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
    isAuth: boolean;
    signup: (user: ISignUpUser) => void;
    saveLocalToken: (token: string) => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    signUpUser: ISignUpUser | null;
    setSignUpUser: React.Dispatch<React.SetStateAction<ISignUpUser | null>>;
}

type Props = {
    children: React.ReactNode;
}

const authContextDefaultValues: authContextType = {
    user: null,
    login: (user: IUser) => { },
    logout: () => { },
    isAuth: false,
    signup: (user: ISignUpUser) => { },
    saveLocalToken: (token: string) => { },
    loading: false,
    setLoading: () => { },
    signUpUser: null,
    setSignUpUser: () => { },
}

export const AuthContext = React.createContext<authContextType>(authContextDefaultValues);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => { 
    const router = useRouter();
    const [user, setUser] = React.useState<IUser | null>(null);
    const [signUpUser, setSignUpUser] = React.useState<ISignUpUser | null>(null);
    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const saveLocalToken = (token: string) => {
        router.push('/');
        localStorage.setItem('token', token);
        setIsAuth(true);
    }

    const login = (user: IUser ) => {
        router.push('/');
        setUser(user);
        setIsAuth(true);
    }

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        router.push('/login');
    }

    const signup = (user: ISignUpUser) => {
        setSignUpUser(user);
        setIsAuth(true);
        router.push('/');
    }

    const values = React.useMemo(() => ({
        user,
        login,
        logout,
        isAuth,
        signup,
        saveLocalToken,
        loading,
        setLoading,
        signUpUser,
        setSignUpUser,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, isAuth]);

    return (
        <AuthContext.Provider value={ values }>
            {children}
        </AuthContext.Provider>
    )
}