import * as React from 'react'
import { LoginInitialStructure } from '@/components/atoms/LoginInitialStructure'
import { LoginStructure } from '@/components/organisms/LoginStructure'
import { RegisterStructure } from '@/components/organisms/RegisterStructure'


export default function Login() { 
    const [isLogin, setIsLogin] = React.useState(true)

    if (isLogin) {
        return (
            <LoginInitialStructure>
                <LoginStructure setIsLogin={setIsLogin} />
            </LoginInitialStructure>
        )
    } else { 
        return (
            <LoginInitialStructure>
                <RegisterStructure setIsLogin={setIsLogin} />
            </LoginInitialStructure>
        )
    }
}