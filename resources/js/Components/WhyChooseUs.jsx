// components/WhyChooseUsSection.jsx
export default function WhyChooseUsSection() {
    const features = [
        {
            icon: "🎯",
            title: "Quality Guaranteed",
            description: "Every product undergoes rigorous quality checks to ensure top-notch performance and durability.",
            gradient: "from-orange-500 to-orange-600"
        },
        {
            icon: "⚡",
            title: "Fast Delivery",
            description: "Express shipping with real-time tracking. Get your products delivered in 2-3 business days.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: "🛡️",
            title: "Secure Payment",
            description: "100% secure payment processing with multiple payment options and SSL encryption.",
            gradient: "from-green-500 to-green-600"
        },
        {
            icon: "🔄",
            title: "Easy Returns",
            description: "30-day return policy with hassle-free returns and full refunds if unsatisfied.",
            gradient: "from-purple-500 to-purple-600"
        },
        {
            icon: "💬",
            title: "24/7 Support",
            description: "Round-the-clock customer support via chat, email, and phone for instant assistance.",
            gradient: "from-red-500 to-red-600"
        },
        {
            icon: "🌟",
            title: "Best Prices",
            description: "Competitive pricing with regular discounts and special offers for loyal customers.",
            gradient: "from-yellow-500 to-yellow-600"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-orange-50 rounded-2xl mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-sm mb-4">
                        WHY CHOOSE US
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Experience the 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"> Difference</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're committed to providing exceptional service and premium products that exceed expectations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 bg-gradient-to-r ${feature.gradient}`}>
                                <span className="text-3xl">{feature.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                
            </div>
        </section>
    );
}