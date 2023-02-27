import * as React from "react";
import {useAuthContext} from "@/context/AuthContext";
import { useRouter } from "next/router";

interface WrapperProps<T> {
  component: React.ComponentType<T>;
}

export const WithAuth = <T extends {}>({ component: WrappedComponent }: WrapperProps<T>) => { 
    const Wrapper = (props: T) => {
        const { isAuth } = useAuthContext();
        const router = useRouter();
        React.useEffect(() => {
            if (!isAuth) {
                router.push('/login');
            }
        }, [isAuth, router])
        
        if (!isAuth) {
            return <p>Redirecting to login...</p>
        }
        return <WrappedComponent {...props} />
    };
    return Wrapper;
}
