// components/MissionAndVision.jsx
export default function MissionAndVision() {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-orange-50 rounded-2xl mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm mb-4">
                        OUR CORE VALUES
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Mission & Vision
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Guiding principles that define who we are and where we're going
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Mission Card */}
                    <div className="relative">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-3xl font-black text-gray-900 mb-6">
                                    Our Mission
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Deliver high-quality IT hardware and telecom solutions that empower businesses to operate efficiently and competitively.                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Build long-term partnerships through transparent communication, reliability, and exceptional service.                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Continuously innovate to meet evolving technology needs and industry standards.                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="relative">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-3xl font-black text-gray-900 mb-6">
                                    Our Vision
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            To become a leading global supplier of premium IT and telecom products.                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Set new industry benchmarks for quality, innovation, and customer satisfaction.                                        </p>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">
                                            Expand our global reach while remaining committed to local communities and sustainable practices.                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mt-20">
                    <h3 className="text-3xl font-black text-gray-900 mb-12 text-center">
                        Our Core Values
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Integrity",
                                description: "We uphold honesty, transparency, and ethical practices in every aspect of our business.",
                                icon: "🤝",
                                color: "from-green-500 to-green-600"
                            },
                            {
                                title: "Excellence",
                                description: "We are committed to delivering exceptional quality and service that exceeds client expectations.",
                                icon: "⭐",
                                color: "from-yellow-500 to-yellow-600"
                            },
                            {
                                title: "Innovation",
                                description: "We embrace continuous improvement, adopting cutting-edge solutions and advanced technologies to serve our clients better.",
                                icon: "💡",
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                title: "Reliability  ",
                                description: "We ensure dependable supply, timely delivery, and consistent support for every client.",
                                icon: "⚡",
                                color: "from-cyan-500 to-cyan-600"
                            }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 text-center"
                            >
                                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-r ${value.color}`}>
                                    <span className="text-4xl">{value.icon}</span>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}