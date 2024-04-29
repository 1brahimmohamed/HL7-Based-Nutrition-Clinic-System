import { Link } from 'react-router-dom';

const LoginHeader = () => {
    return (
        <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
                <img className="h-14 w-auto" src="/images/brand/logo-full-icon-right.png" alt="MDIMA Logo" />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Not a member?{' '}
                    <Link to="/carrers" className="font-semibold text-primary-main hover:text-primary-dark">
                        Join MDIMA's medical staff
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginHeader;
