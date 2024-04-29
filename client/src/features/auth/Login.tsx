import React, { useState, useEffect, FormEvent } from 'react';
import LoginHeader from './LoginHeader.tsx';
import InputField from '../../ui/inputField.tsx';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { login } from '../../services/apiAuth.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorState, setErrorState] = useState({
        errorMessage: '',
        isErrorMessageShown: false
    });

    const signIn = useSignIn();
    const navigate = useNavigate();

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            email: event.target.value
        });
    };

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            password: event.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (!formData.email || !formData.password) {
            setErrorState({
                errorMessage: 'Please fill in all fields',
                isErrorMessageShown: true
            });
            setIsSubmitting(false);
            return;
        }

        const response = await login(formData);
        setIsSubmitting(false);

        if (response.status === 'success') {
            signIn({
                auth: {
                    token: response.data.token,
                    type: 'Bearer'
                },
                userState: response.data
            });

            toast.success('Login successful', {
                duration: 2500
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            toast.error('Login failed, please try again', {
                duration: 2500
            });
        }
    };

    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <div className="flex min-h-[100vh] flex-1">
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/ui/login.jpg"
                        alt=""
                    />
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <LoginHeader />

                    <div className="mt-10">
                        <div>
                            <form className="space-y-6">
                                <InputField
                                    label={'Email address'}
                                    labelFor={'email'}
                                    inputId={'email'}
                                    inputName={'email'}
                                    inputType={'email'}
                                    autoComplete={'email'}
                                    isRequired={true}
                                    onChange={emailChangeHandler}
                                />

                                <InputField
                                    label={'Password'}
                                    labelFor={'password'}
                                    inputId={'password'}
                                    inputName={'password'}
                                    inputType={'password'}
                                    autoComplete={'current-password'}
                                    isRequired={true}
                                    onChange={passwordChangeHandler}
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-primary-main focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-3 block text-sm leading-6 text-gray-700"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}
                                        className="flex w-full justify-center rounded-md bg-secondary-main px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {isSubmitting ? (
                                            <div className={'animate-spin'}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                            </div>
                                        ) : (
                                            'Sign in'
                                        )}
                                    </button>
                                </div>

                                <div
                                    className={`flex justify-center ${
                                        errorState.isErrorMessageShown ? 'block' : 'hidden'
                                    }`}
                                >
                                    <p className="text-sm font-semibold leading-6 text-red-700 hover:text-red-900">
                                        {errorState.errorMessage}
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg
                                        className="w-7 h-7"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.537 12.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.34.025-1.77-.794-3.3-.794-1.531 0-2.01.769-3.275.82-1.316.049-2.317-1.318-3.158-2.532-1.72-2.484-3.032-7.017-1.27-10.077A4.9 4.9 0 0 1 8.91 6.884c1.292-.025 2.51.869 3.3.869.789 0 2.27-1.075 3.828-.917a4.67 4.67 0 0 1 3.66 1.984 4.524 4.524 0 0 0-2.16 3.805m-2.52-7.432A4.4 4.4 0 0 0 16.06 2a4.482 4.482 0 0 0-2.945 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z" />
                                    </svg>

                                    <span className="text-sm font-semibold leading-6">Apple</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
