// components/CompanyDetails.jsx
export default function CompanyDetails() {
    const timelineEvents = [
        {
            year: "2024",
            title: "Company Founded",
            description: "Founded with 10+ years of combined industry experience, bringing expertise and passion to IT hardware and telecom solutions.",
            milestone: "🏢"
        },
        {
            year: "Mid 2024",
            title: "Building Connections",
            description: "Started collaborating with IT companies and partners, establishing strong relationships and understanding market needs.",
            milestone: "🔗"
        },
        {
            year: "Last 2024",
            title: "Warehouse Upgrade",
            description: "Enhanced storage and logistics capabilities to ensure faster fulfillment and reliable inventory management.",
            milestone: "🏭"
        },
        {
            year: "2025",
            title: "Expanding the Team",
            description: "Welcomed experienced professionals and young talent to strengthen our capabilities and drive innovation.",
            milestone: "👥"
        },
        {
            year: "Later 2025",
            title: "Global Deliveries",
            description: "Began delivering IT hardware and telecom solutions to clients across multiple regions, expanding our reach worldwide.",
            milestone: "🌐"
        },
        {
            year: "2026",
            title: "Recognized by Industry Players",
            description: "Acknowledged by major IT companies for consistent quality, reliability, and commitment to service excellence.",
            milestone: "🏆"
        }
    ];

    const services = [
        {
            title: "Bulk Supply Solutions",
            description: "Reliable large-scale procurement and delivery for industrial clients.",
            icon: "📦",
            features: ["Custom Order Management", "Just-in-Time Delivery", "Volume Discounts"]
        },
        {
            title: "Quality Assurance",
            description: "Comprehensive testing and certification for all products.",
            icon: "✅",
            features: ["Product Testing", "Independent Validation", "Batch Testing"]
        },
        {
            title: "Technical Support",
            description: "24/7 expert assistance for product selection and implementation.",
            icon: "🔧",
            features: ["Deployment Assistance", "Remote Assistance", "Technical Documentation"]
        },
        {
            title: "Custom Solutions",
            description: "Tailored products and services to meet specific business needs.",
            icon: "⚙️",
            features: ["Product Customization", "Blind Shipping", "Special Packaging"]
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-orange-50 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Our Journey Timeline */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm mb-4">
                            OUR JOURNEY
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Milestones & Growth
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A snapshot of our journey as we continue to grow, innovate, and excel in IT hardware and telecom distribution.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-orange-600"></div>
                        
                        {/* Timeline events */}
                        <div className="space-y-12">
                            {timelineEvents.map((event, index) => (
                                <div 
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Year marker */}
                                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg z-10 mb-6 md:mb-0">
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">{event.milestone}</div>
                                            <div className="text-xl font-bold text-white">{event.year}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Connector line for mobile */}
                                    <div className="md:hidden absolute top-12 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-orange-600"></div>
                                    
                                    {/* Event content */}
                                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Services */}
                <div>
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm mb-4">
                            OUR SERVICES
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            What We Offer
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive solutions tailored to meet diverse business needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="text-4xl mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {service.description}
                                </p>
                                
                                <ul className="space-y-3">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                
            </div>
        </section>
    );
}