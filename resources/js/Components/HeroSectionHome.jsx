// // components/HeroSection.jsx
// import { Link } from '@inertiajs/react';
// export default function HeroSection() {
//     return (
//         <section className=" relative overflow-hidden py-20 mb-12 min-h-[600px] flex items-center w-full">
//             {/* Background Image with Overlay - Full width */}
//             <div className="absolute mx-auto inset-0 z-0 w-[72%]">
//                 <img 
//                     src="/assets/images/home_quicsol.jpeg" 
//                     alt="Hero Background" 
//                     className="w-full h-full object-cover"
//                 />
//                 {/* Dark overlay with gradient for better text readability */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
//                 {/* Orange tint overlay to maintain theme */}
//             </div>

            
//             <div className="relative z-10 w-[65%] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
//                 <div className="text-left max-w-2xl">
//                     {/* Removed the badge from here as it wasn't in your provided code */}
                    
//                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
//                         Fuel your Growth.
//                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
//                             Outpace the Competition
//                         </span>
//                     </h1>

//                     <p className="text-xl md:text-xl text-gray-200 max-w-xl mb-10">
//                         Discover our curated collection of high-quality products from trusted manufacturers worldwide.
//                     </p>

//                     {/* Buttons - Left aligned */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-start items-center ">
//                         <Link href={route('requestquote')} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto border border-orange-400">
//                             Request Quote
//                         </Link>
//                         <Link href={route('products-page')} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg text-lg border-2 border-orange-400/50 hover:bg-white/20 hover:border-orange-400 transition-all duration-300 w-full sm:w-auto">
//                             View Products
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }






// components/HeroSection.jsx
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = [
        'https://www.seeker816.com/photo/cl30974589-zte.jpg',
        'https://www.seeker816.com/photo/cl31016983-nokia_siemens.jpg',
        'https://www.seeker816.com/photo/cl22510522-ericsson.jpg',
        'https://www.seeker816.com/photo/cl22510524-nokia.jpg',
        'https://www.seeker816.com/photo/cl30974112-hw.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden py-20 mb-12 min-h-[600px] flex items-center w-full">
            {/* Carousel Images Container */}
            <div className="absolute mx-auto inset-0 z-0 w-[72%]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{
                            opacity: index === currentImageIndex ? 1 : 0
                        }}
                    >
                        <img 
                            src={image} 
                            alt={`Hero Background ${index + 1}`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
                
                {/* Dark overlay with gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 w-[65%] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="text-left max-w-2xl">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        Fuel your Growth.
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400">
                            Outpace the Competition
                        </span>
                    </h1>

                    <p className="text-xl md:text-xl text-gray-200 max-w-xl mb-10">
                        Discover our curated collection of high-quality products from trusted manufacturers worldwide.
                    </p>

                    {/* Buttons - Left aligned */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                        <Link 
                            href={route('requestquote')} 
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto border border-orange-400"
                        >
                            Request Quote
                        </Link>
                        <Link 
                            href={route('products-page')} 
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg text-lg border-2 border-orange-400/50 hover:bg-white/20 hover:border-orange-400 transition-all duration-300 w-full sm:w-auto"
                        >
                            View Products
                        </Link>
                    </div>
                </div>
            </div>

            {/* Optional: Image indicators (dots) - Uncomment if you want to show which image is current */}
            {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                                ? 'w-8 bg-orange-500' 
                                : 'bg-white/50 hover:bg-white/80'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div> */}
        </section>
    );
}