import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../utils/loader';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

export default function authGuard(ComposedComponent) {

    const AuthenticationCheck = (props) => {
        const navigate = useNavigate();
        const [isAuth, setIsAuth] = useState(false);
        const users = useSelector(state => state.users);


        useEffect(() => {
            if(!users.auth){
                // <Navigate to="/" />
                navigate('/')
            }else{
                setIsAuth(true);
            }
        }, [users, navigate]);

        if(!isAuth){
            return(
                <Loader full={true}/>
            )
        }else{
            return(
                <ComposedComponent users={users} {...props}/>
            )
        }

    }
    
    return <AuthenticationCheck />;
}