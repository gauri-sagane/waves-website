import * as actions from './index';
import axios from 'axios';
import { getAuthHeader, removeTokenCookie, getTokenCookie } from '../../utils/tools';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const userRegister = (values) => {
    return async(dispatch) => {
        try{
            const user = await axios.post(`api/auth/register`, {
                email: values.email,
                password: values.password
            });
            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.successGlobal('Welcome !! Check your mail to verify account.'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userSignIn = (values) => {
    return async(dispatch) => {
        try{
            const user = await axios.post(`api/auth/signin`, {
                email: values.email,
                password: values.password
            });
            dispatch(actions.userAuthenticate({
                data: user.data.user,
                auth: true
            }))
            dispatch(actions.successGlobal('Welcome back !!'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userIsAuth = () => {
    return async(dispatch) => {
        try{
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.get(`api/auth/isauth`, getAuthHeader());
            dispatch(actions.userAuthenticate({data: user.data, auth: true}))


        }catch(error){
            dispatch(actions.userAuthenticate({data: {}, auth: false}));
        }
    }
}

export const userSignOut = () => {
    return async(dispatch) => {
        removeTokenCookie();
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal("Good Bye !!"))
    }
}

export const userUpdateProfile = (data) => {
    return async(dispatch, getState) => {
        try{
            const profile = await axios.patch(`/api/users/profile`, {
                data: data
            }, getAuthHeader());
            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname
            }
            dispatch(actions.userUpdateProfile(userData))
            dispatch(actions.successGlobal("Profile Updated !!"))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}


export const userChangeEmail = (data) => {
    return async(dispatch, getState) => {
        try{
            const profile = await axios.patch(`/api/users/email`, {
                email: data.email,
                newEmail: data.newEmail
            }, getAuthHeader());
            const userData = {
                ...getState().users.data,
                email: profile.data.email
            }
            dispatch(actions.userChangeEmail(data.newEmail))
            dispatch(actions.successGlobal("Good job !! Remember to verify yur account !!"))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userAddToCart = (item) => {
    return async(dispatch, getState) => {
        try{
            const cart = getState().users.cart;
            dispatch(actions.userAddToCart([...cart, item]))
            dispatch(actions.successGlobal(`${item.model} added to cart`))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeFromCart = (position) => {
    console.log(position)
    return async(dispatch, getState) => {
        try{
            const cart = getState().users.cart;
            cart.splice(position, 1);
            dispatch(actions.userAddToCart(cart));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}