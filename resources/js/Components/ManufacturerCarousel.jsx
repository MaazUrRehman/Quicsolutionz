// components/ManufacturersCarousel.jsx
import { useState, useEffect } from 'react';

export default function ManufacturersCarousel({ manufacturers, allManufacturers }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    // Don't render if no manufacturers
    if (!manufacturers || manufacturers.length === 0) {
        return null;
    }

    // Ensure allManufacturers is an array
    const safeAllManufacturers = Array.isArray(allManufacturers) ? allManufacturers : [];

    // Create manufacturer items with images from manufacturers table
    const manufacturerItems = manufacturers
        .filter(item => item != null && item !== '') // Filter out null/undefined/empty values
        .map((item, index) => {
            const manufacturerName = typeof item === 'string' ? item.trim() : '';
            
            // Skip if manufacturerName is empty after trimming
            if (!manufacturerName) return null;
            
            // Find matching manufacturer in allManufacturers by comparing with 'title' field
            const matchedManufacturer = safeAllManufacturers.find(
                m => m && m.title && m.title.toLowerCase().trim() === manufacturerName.toLowerCase()
            );
            
            return {
                id: matchedManufacturer?.id || `temp-${index}`,
                name: manufacturerName,
                logo: matchedManufacturer?.image || null // Get image if match found
            };
        })
        .filter(item => item !== null); // Remove any null items

    // If no valid manufacturer items, don't render
    if (manufacturerItems.length === 0) {
        return null;
    }
    
    // Calculate how many items to show based on screen size
    const getItemsPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1280) return 6;
            if (window.innerWidth >= 1024) return 5;
            if (window.innerWidth >= 768) return 4;
            if (window.innerWidth >= 640) return 3;
            return 2;
        }
        return 6;
    };

    const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isHovered && manufacturerItems.length > itemsPerView) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex + itemsPerView >= manufacturerItems.length ? 0 : prevIndex + 1
                );
            }, 3000);
            
            return () => clearInterval(interval);
        }
    }, [isHovered, manufacturerItems.length, itemsPerView]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + itemsPerView >= manufacturerItems.length ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.max(0, manufacturerItems.length - itemsPerView) : prevIndex - 1
        );
    };

    // Create a doubled array for seamless infinite scroll effect
    const displayManufacturers = [...manufacturerItems, ...manufacturerItems];

    // Get first letter for fallback
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    return (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Trusted Manufacturers
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
                </div>

                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex * (100 / itemsPerView))}%)`
                            }}
                        >
                            {displayManufacturers.map((manufacturer, index) => (
                                <div
                                    key={`${manufacturer.id}-${index}`}
                                    className="flex-shrink-0 px-2"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    {/* Removed padding from main card, only keeping border and shadow */}
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-orange-200 overflow-hidden">
                                        {/* Logo/Image Section - No padding */}
                                        <div className="h-32 flex items-center justify-center bg-white">
                                            {manufacturer.logo ? (
                                                <img 
                                                    src={`/assets/manufacturer/${manufacturer.logo}`}
                                                    alt={manufacturer.name}
                                                    className="w-full h-full object-cover transition-all duration-300"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = 'none';
                                                        // Show fallback on error
                                                        const parent = e.target.parentElement;
                                                        parent.className = 'h-32 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100';
                                                        const fallbackDiv = document.createElement('div');
                                                        fallbackDiv.className = 'w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center';
                                                        fallbackDiv.innerHTML = `<span class="text-orange-700 font-bold text-2xl">${getInitial(manufacturer.name)}</span>`;
                                                        parent.appendChild(fallbackDiv);
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center shadow-md">
                                                        <span className="text-orange-700 font-bold text-2xl">
                                                            {getInitial(manufacturer.name)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Manufacturer Name - With padding only here */}
                                        <div className="text-center py-3 px-2 bg-white border-t border-gray-100">
                                            <span className="text-sm font-semibold font-montserrat  text-gray-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                {manufacturer.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {manufacturerItems.length > itemsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-300 z-10"
                                aria-label="Previous manufacturers"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-300 z-10"
                                aria-label="Next manufacturers"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {manufacturerItems.length > itemsPerView && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: Math.ceil(manufacturerItems.length / itemsPerView) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index * itemsPerView)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    Math.floor(currentIndex / itemsPerView) === index 
                                        ? 'w-8 bg-orange-500' 
                                        : 'w-2 bg-gray-300 hover:bg-orange-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}