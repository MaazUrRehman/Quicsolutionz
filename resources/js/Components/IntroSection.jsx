// components/IntroSection.jsx
import { Link } from '@inertiajs/react';

export default function IntroSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        About Quicsolutionz
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Column 1: Company Intro with Image */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div className="flex">
                            <div className="h-48 w-full overflow-hidden  relative">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt="Telecommunication Network Infrastructure"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white font-bold text-xs">QUICSOLUTIONZ</span>
                                </div>
                            </div>

                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></span>
                                Who We Are
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We are a highly experienced telecommunications network support provider,
                                dedicated to delivering innovative solutions and exceptional service to our
                                global partners.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Company News */}
                    {/* <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></span>
                            Company News
                        </h3>

                        <div className="space-y-6">
                            <div className="group cursor-pointer">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-sm">15<br />MAR</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            New Partnership with Nokia
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Expanding our network solutions portfolio
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-sm">10<br />MAR</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            Industry Conference 2024
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Showcasing latest 5G innovations
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-sm">05<br />MAR</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            ISO 9001:2024 Certification
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Quality management excellence achieved
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-sm">28<br />FEB</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            New Regional Office Opening
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Expanding presence in Southeast Asia
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-600 font-bold text-sm">20<br />FEB</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            Employee Excellence Awards 2024
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Celebrating our team's outstanding achievements
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}

                    {/* Column 3: Contact Info & Team Image */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="h-40 overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Our Team Working Together"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent"></div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></span>
                                Contact Us
                            </h3>

                            <div className="space-y-4">
                                {/* <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-gray-900 font-medium">thomas@gzseeker.com</p>
                                    </div>
                                </div> */}

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tel </p>
                                        <p className="text-gray-900 font-medium">+13038006160</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Company</p>
                                        <p className="text-gray-900 font-medium">5835 Sandy Ln Lockport NY 14094</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={route('requestquote')}
                                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Get in Touch
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}