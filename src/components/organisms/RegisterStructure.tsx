import * as React from 'react';
import {
    TextField,
    Box,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import { useAuthContext } from '@/context/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useRouter } from 'next/router';

type Props = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

type errorRegister = {
    message: string;
}

export function RegisterStructure({ setIsLogin }: Props) { 
    const router = useRouter();
    const { signup, loading, setLoading } = useAuthContext();

    const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    const userNamerRegex = /^[a-zA-Z0-9]{4,16}$/;

    const [registerState, setRegisterState] = React.useState<ISignUpUser>({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [validPassword, setValidPassword] = React.useState<boolean>(false);
    const [matchPassword, setMatchPassword] = React.useState<boolean>(false);
    const [validUsername, setValidUsername] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    function userNameMatchWithRegex(username: string) {
        return userNamerRegex.test(username);
    }

    function newPasswordMatchWithPassword(password: string, confirmPassword: string) {
        return password === confirmPassword;
    }

    function isValidPassword(password: string) {
        return passwordRegex.test(password);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setRegisterState({
            ...registerState,
            [name]: value,
        })
        if (name === 'username') {
            setValidUsername(userNameMatchWithRegex(value));
        }
        if (name === 'password') {
            setValidPassword(isValidPassword(value));
        }
        if (name === 'confirmPassword') {
            setMatchPassword(newPasswordMatchWithPassword(value, registerState.password));
        }
    }

    const handleDissabledButton = () => { 
        if (validPassword && matchPassword && validUsername) {
            return false;
        }
        return true;
    }
    const getRegisteredUserLocalStorage = (user: ISignUpUser) => { 
        const userLocalStorage = localStorage.getItem('user');
        if (userLocalStorage) {
            const userParsed = JSON.parse(userLocalStorage);
            if (userParsed.username === user.username) {
                return true;
            }
        }
        return false;
    }
    const saveRegisteredUserLocalStorage = (user: ISignUpUser) => { 
        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleShowPassword = () => { 
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const { username, password } = registerState;

        const passwordBytes = new TextEncoder().encode(password);
        const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', passwordBytes);
        const hashedPasswordArray = Array.from(new Uint8Array(hashedPasswordBuffer));
        const hashedPasswordHex = Array.from(hashedPasswordArray)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
        const user = {
            username,
            password: hashedPasswordHex,
        }
        setLoading(true);
        const userLocalStorage = getRegisteredUserLocalStorage(user as ISignUpUser);

        if (userLocalStorage) { 
            setLoading(false);
            setError('User already registered');
            return;
        }

        else { 
            try {
                signup(user as ISignUpUser);
                saveRegisteredUserLocalStorage(user as ISignUpUser);
            } catch (error: errorRegister | null | undefined | any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        }

    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        marginBottom: '1rem',
                    }}
                >
                    Register
                </Typography>
                {
                    error && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'error.main',
                                marginBottom: '1rem',
                            }}
                        >
                            {error}
                        </Typography>
                    )
                }
                
                <Box 
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',    
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={registerState.username}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                        error={!validUsername}
                        helperText={!validUsername ? 'Username must be 4-16 characters long and can only contain letters and numbers' : ''}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={registerState.password}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                        error={!validPassword}
                        helperText={!validPassword ? 'Password must be 8-16 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character' : ''}
                    
                        InputProps={{
                            endAdornment: (
                                <Button
                                    onClick={handleShowPassword}
                                    sx={{
                                        padding: '0.5rem',
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Button>
                            )
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={registerState.confirmPassword}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                        error={!matchPassword}
                        helperText={!matchPassword ? 'Passwords do not match' : ''}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    onClick={handleShowPassword}
                                    sx={{
                                        padding: '0.5rem',  
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Button>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '100%',
                            marginBottom: '1rem',
                        }}
                        disabled={handleDissabledButton()}
                    >
                        {loading ? <CircularProgress size="1.5rem" /> : 'Register'}
                    </Button>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.primary',
                        }}  
                    >
                        Already have an account?
                        <Button
                            onClick={
                                () => setIsLogin(true)
                            }
                            sx={{
                                color: 'secondary.main',
                            }}
                        >Login
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}