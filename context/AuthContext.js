'use client';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        edit: false,
        user: {},
        error: null,
        address: {
            street: '',
            city: '',
            state: '',
            phoneNo: 0,
            zipCode: 0,
            country: '',
            userId: '',
        },
    });

    const router = useRouter();

    const toastConfig = {
        position: 'bottom-center',
        autoClose: 2000,
        theme: 'dark',
    };

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            if (response.status === 200) {
                router.push('/login');
                setAuthState((prevState) => ({ ...prevState, user: {} }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postAddress = async (selectedCountry) => {
        try {
            const updatedAddress = { ...authState.address, country: selectedCountry, userId: authState.user._id };
            setAddress(updatedAddress);

            const response = await axios.post('/api/users/address', updatedAddress);
            toast.success('Address Added', toastConfig);
            setAuthState((prevState) => ({ ...prevState, edit: false }));
        } catch (error) {
            setError(error);
            toast.error('Something went wrong', toastConfig);
        }
    };

    const getAddress = async () => {
        if (authState.user._id) {
            try {
                const response = await axios.get(`/api/users/address/${authState.user._id}`);
                setAddress({ ...response.data });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getUserDetails = async () => {
        try {
            const authResponse = await axios.get('/api/check-auth');
            const isAuthenticated = authResponse.data.isAuthenticated;

            await Promise.all([
                setAuthState((prevState) => ({ ...prevState, isAuthenticated })),
                isAuthenticated &&
                    axios.get('/api/users/user')
                    .then(userResponse => {
                        const responseData = userResponse.data.data;
                        setAuthState((prevState) => ({ ...prevState, user: responseData, isAuthenticated: true }));
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    })
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const setAddress = (updatedAddress) => {
        setAuthState((prevState) => ({ ...prevState, address: updatedAddress }));
    };

    const setError = (error) => {
        setAuthState((prevState) => ({ ...prevState, error }));
    };

    const setEdit = (edit) => {
        setAuthState((prevState) => ({ ...prevState, edit }));
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    
    useEffect(() => {
        getAddress();
    }, [authState.user._id]);

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                getUserDetails,
                getAddress,
                postAddress,
                logout,
                setAddress,
                setEdit,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
