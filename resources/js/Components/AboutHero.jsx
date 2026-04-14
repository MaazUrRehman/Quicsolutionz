// components/AboutHero.jsx
import { Link } from '@inertiajs/react';

export default function AboutHero() {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-50" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-orange-100 to-transparent rounded-full opacity-50" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-orange-100 mb-8">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
                            Established 2005
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight">
                        <span className="block">Building</span>
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_100%] animate-gradient-x">
                                Excellence
                            </span>
                            <svg 
                                className="absolute -bottom-2 left-0 w-full h-3 opacity-50" 
                                viewBox="0 0 200 10" 
                                preserveAspectRatio="none"
                            >
                                <path 
                                    d="M0,5 Q50,0 100,5 T200,5" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    fill="none"
                                    className="text-orange-500"
                                />
                            </svg>
                        </span>
                    </h1>

                    {/* Subheading */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                            For nearly two decades, we've been at the forefront of innovation, 
                            delivering exceptional quality and transformative solutions that 
                            empower businesses worldwide.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {[
                            { value: "10+", label: "Years of Industry Experience" },
                            { value: "100+", label: "Satisfied Clients" },
                            { value: "500+", label: " Projects Successfully Delivered" }
                        ].map((stat, index) => (
                            <div 
                                key={index}
                                className="text-center group cursor-pointer"
                            >
                                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={route('products-page')} className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-3">
                                Explore Our Products
                            </span>
                        </Link>
                        
                        <Link href={ route('requestquote')} className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <span className="flex items-center gap-3">
                                Request A Quote
                            </span>
                        </Link>
                    </div>

                    
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-orange-200 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-orange-200 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-orange-200 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-orange-200 rounded-br-2xl" />
        </section>
    );
}