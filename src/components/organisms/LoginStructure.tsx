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


type LoginStructureProps = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginStructure({ setIsLogin }: LoginStructureProps) {
    const { saveLocalToken, loading, setLoading, signup } = useAuthContext();
    const [loginState, setLoginState] = React.useState<ILoginUser>({
        username: '',
        password: '',
    })
    const [loginError, setLoginError] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);

    const getLocalUser = () => { 
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const localUser = getLocalUser();
        if (localUser) { 
            console.log('hay un usuario local')
            const passwordBytes = new TextEncoder().encode(loginState.password);
            const hasehedPasswordBuffer = await crypto.subtle.digest('SHA-256', passwordBytes);
            const hasehedPasswordBytes = new Uint8Array(hasehedPasswordBuffer);
            const hasehedPasswordHex = Array.from(hasehedPasswordBytes)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            if (localUser.username === loginState.username) {
                console.log('el usuario local es igual al que se quiere loguear')
                if (localUser.password === hasehedPasswordHex) {
                    console.log('el usuario local es igual al que se quiere loguear y la contraseña es igual')
                    signup(localUser);
                }
            }
        }
                setLoading(true);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginState),
        })
        const data = await response.json();
        if (data.error) {
            setLoading(false);
            setLoginError(data.error);
        }
        if (data.token) {
            saveLocalToken(data.token);
        }

    }


    if (loading) {
        console.log('loading', loading)
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
                <CircularProgress
                    color='secondary'
                />
        </Box>
    )
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
                component={'form'}
                onSubmit={handleLoginSubmit}
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
                        color: 'primary',
                        marginBottom: '16px',
                    }}
                >
                    Login
                </Typography>
                <TextField
                    label="username"
                    variant="outlined"
                    sx={{ marginBottom: '16px' }}
                    value={loginState.username}
                    onChange={(e) => setLoginState({ ...loginState, username: e.target.value })}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    sx={{ marginBottom: '16px' }}
                    value={loginState.password}
                    onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
                    InputProps={{
                        endAdornment: (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Box>
                        )
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        color: 'error.main',
                        marginBottom: '16px',
                        textAlign: 'center',
                        maxWidth: '200px'
                    }}
                >
                    {loginError}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        marginBottom: '16px',
                    }}
                >
                    <Button
                        disabled={loginState.username === '' || loginState.password === ''}
                        variant="contained"
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'secondary.main',
                            color: 'background.paper',
                        }}
                        type="submit"
                    >
                        {'Login'}
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Typography 
                        variant="body2"
                        sx={{
                            color: 'secondary.main',
                            cursor: 'pointer',
                            marginRight: '16px',
                        }}
                        onClick={() => setIsLogin(false)}
                    >
                        {'Don\'t have an account? Sign up here!'}
                    </Typography>
                    
                </Box>
            </Box>
        </Box>
    )
}