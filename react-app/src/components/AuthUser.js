import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosCustom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = localStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const getEmail = () =>{
        const userString = localStorage.getItem('email');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const getCustomerToken = () => {
        const userString = localStorage.getItem('token_customer');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
    const getCustomer = () => {
        const userString = localStorage.getItem('customer');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }


    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());
    const [email,setEmail] = useState(getEmail());
    const [customerToken,setCustomerToken] = useState(getCustomerToken());
    const [customer,setCustomer] = useState(getCustomer());

    const saveToken = (email,user,token) =>{
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('email',JSON.stringify(email));

        setToken(token);
        setUser(user);
        setEmail(email);
        navigate('/admin/users');
    }

    const saveCustomerToken = (token,customer) =>{
        localStorage.setItem('token_customer',JSON.stringify(token));
        localStorage.setItem('customer',JSON.stringify(customer));
        setCustomerToken(token);
        setCustomer(customer);
        navigate('/');
    }

    const logout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate('/admin/login');
        window.location.reload();
    }
    const logoutCustomer = () => {
        localStorage.removeItem('token_customer');
        localStorage.removeItem('customer');
        navigate('/');
    }

    const http = axiosInstance;
    return {
        setToken:saveToken,
        saveCustomerToken,
        token,
        user,
        email,
        customer,
        customerToken,
        getToken,
        getUser,
        getCustomerToken ,
        getEmail,
        getCustomer,
        http,
        logout,
        logoutCustomer
    }
}