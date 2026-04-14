// components/AboutOurCompany.jsx
export default function AboutOurCompany() {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 rounded-2xl mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Image/Content */}
                    <div>
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm mb-6">
                            ABOUT US
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Building Excellence
                            {/* <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                                Since 2005
                            </span> */}
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Founded with a vision to streamline access to reliable IT hardware and telecommunications equipment, our company has evolved into a trusted global supplier. We specialize in sourcing, stocking, and distributing enterprise-grade networking, telecom, and infrastructure products for businesses and technology partners worldwide.
                        </p>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Through strategic partnerships and a strong supply network, we provide competitive pricing, dependable inventory availability, and efficient order fulfillment. Our focus on reliability, transparency, and long-term partnerships enables our clients to build and scale their technology infrastructure with confidence.
                        </p>

                        {/* Key Highlights */}
                        <div className="grid grid-cols-2 gap-6 mt-10">
                            {[
                                { number: "10+", label: "Years Experience" },
                                { number: "50+", label: "Brands We Carry" },
                                { number: "10,000+", label: "Products Available" },
                                { number: "500+", label: "Orders Successfully Delivered" }
                            ].map((highlight, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="text-3xl font-bold text-orange-600 mb-2">
                                        {highlight.number}
                                    </div>
                                    <div className="text-sm text-orange-500">
                                        {highlight.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image/Stats */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg">
                            {/* Main Image Placeholder */}
                            <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-64 rounded-xl mb-8 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="text-xl font-bold">Our Headquarters</span>
                                </div>
                            </div>

                            {/* Company Details */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Office Address</h4>
                                        <p className="text-gray-600">5835 Sandy Ln
                                            Lockport, NY 14094</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Contact</h4>
                                        <p className="text-gray-600">+1 (303) 800-6160</p>
                                        <p className="text-gray-600">info@quicsolutionz.net</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Business Hours</h4>
                                        <p className="text-gray-600">Monday – Friday: 8:00 AM – 5:00 PM</p>
                                        <p className="text-gray-600">Saturday – Sunday: Limited Virtual Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}