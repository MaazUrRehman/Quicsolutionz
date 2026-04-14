import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-300 border-t border-gray-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Our Services - 6 columns with updated wording */}
                    <div className="lg:col-span-6">
                        <div className="mb-6 flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                            <h3 className="text-white font-semibold text-lg">Our Expertise</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Telecom Infrastructure Solutions
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Global Logistics & Supply Chain
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Software Licensing & Activation
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Custom Sourcing & Procurement
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Quality Assurance & Testing
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Industrial Equipment Supply
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Repair & Technical Support
                                </li>
                                <li className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300 cursor-default group">
                                    <svg className="w-4 h-4 text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    24/7 Emergency Support
                                </li>
                            </ul>
                        </div>
                        
                        {/* Stats/Highlights */}
                        <div className="mt-8 grid grid-cols-3 gap-4 bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">10+</div>
                                <div className="text-xs text-gray-400">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">500+</div>
                                <div className="text-xs text-gray-400">Happy Clients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-500">24/7</div>
                                <div className="text-xs text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={route('home')}
                                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 inline-flex items-center group w-full"
                                >
                                    <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="flex-1">Home</span>
                                    <svg className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('products-page')}
                                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 inline-flex items-center group w-full"
                                >
                                    <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                        </svg>
                                    </span>
                                    <span className="flex-1">Products</span>
                                    <svg className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('aboutus')}
                                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 inline-flex items-center group w-full"
                                >
                                    <span className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-500/20 transition-colors">
                                        <svg className="w-4 h-4 text-gray-500 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                    </span>
                                    <span className="flex-1">About Us</span>
                                    <svg className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                        
                        {/* Replaced Stay Updated with Trust Badges */}
                        <div className="mt-4 p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-lg border border-orange-500/20">
                            <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
                                <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Trusted Partner
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className="text-xs text-gray-400">Global Shipping</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span className="text-xs text-gray-400">Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                            <h3 className="text-white font-semibold text-lg">Contact Info</h3>
                        </div>
                        <div className="space-y-4">
                            {/* Request Quote with Email Icon */}
                            <div className="flex items-center space-x-3 group">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <Link
                                    href={route('requestquote')}
                                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-flex items-center group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                                    Request Quote
                                </Link>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Business Hours</p>
                                    <p className="text-gray-400 text-sm">Monday–Friday: 8:00 AM – 5:00 PM MT</p>
                                    <p className="text-gray-400 text-sm">Weekends: Limited Virtual Support</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm">5835 Sandy Ln Lockport NY 14094</span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400 text-sm">+1 303 800 6160</span>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Quicsolutionz</span>. All Rights Reserved.
                        </div>
                        <div className="text-xs text-gray-500">
                            Leading Supplier of Telecom & Industrial Equipment
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}