import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="min-h-screen bg-[#F7F7F7] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <Link href={route('home')}>
                            <ApplicationLogo className="h-16 w-auto text-gray-800" />
                        </Link>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us today and get access to exclusive features
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-200 sm:px-10">
                        <form className="space-y-6" onSubmit={submit}>
                            <div>
                                <InputLabel 
                                    htmlFor="name" 
                                    value="Full Name" 
                                    className="block text-sm font-semibold text-gray-700"
                                />

                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-gray-900 placeholder-gray-500 focus:border-[#F37D2F] focus:ring-2 focus:ring-[#F37D2F] focus:ring-opacity-30 transition-all duration-300 shadow-sm"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>

                                <InputError message={errors.name} className="mt-2 text-sm" />
                            </div>

                            <div>
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email Address" 
                                    className="block text-sm font-semibold text-gray-700"
                                />

                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-gray-900 placeholder-gray-500 focus:border-[#F37D2F] focus:ring-2 focus:ring-[#F37D2F] focus:ring-opacity-30 transition-all duration-300 shadow-sm"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <InputError message={errors.email} className="mt-2 text-sm" />
                            </div>

                            <div>
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Password" 
                                    className="block text-sm font-semibold text-gray-700"
                                />

                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-gray-900 placeholder-gray-500 focus:border-[#F37D2F] focus:ring-2 focus:ring-[#F37D2F] focus:ring-opacity-30 transition-all duration-300 shadow-sm"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mt-2 text-xs text-gray-500">
                                    Password must be at least 8 characters long
                                </div>
                                
                                <InputError message={errors.password} className="mt-2 text-sm" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="block text-sm font-semibold text-gray-700"
                                />

                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="pl-10 block w-full border-2 border-gray-200 rounded-xl py-3 text-gray-900 placeholder-gray-500 focus:border-[#F37D2F] focus:ring-2 focus:ring-[#F37D2F] focus:ring-opacity-30 transition-all duration-300 shadow-sm"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 text-sm"
                                />
                            </div>

                            <div className="flex items-center">
                                <div className="text-sm">
                                    <span className="text-gray-600">
                                        By creating an account, you agree to our{' '}
                                    </span>
                                    <Link
                                        href="#"
                                        className="font-medium text-[#F37D2F] hover:text-[#E56D1F] transition-colors duration-300"
                                    >
                                        Terms of Service
                                    </Link>
                                    <span className="text-gray-600"> and </span>
                                    <Link
                                        href="#"
                                        className="font-medium text-[#F37D2F] hover:text-[#E56D1F] transition-colors duration-300"
                                    >
                                        Privacy Policy
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <PrimaryButton 
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-[#F37D2F] hover:bg-[#E56D1F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F37D2F] shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Account...
                                        </span>
                                    ) : (
                                        'Create Account'
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#F37D2F] hover:border-[#F37D2F] hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F37D2F] transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In to Existing Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}