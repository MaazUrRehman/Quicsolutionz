import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ProductCarousel({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4; // Adjust based on your design
    
    const nextSlide = () => {
        setCurrentIndex(prev => 
            prev + itemsPerView >= products.length ? 0 : prev + 1
        );
    };
    
    const prevSlide = () => {
        setCurrentIndex(prev => 
            prev === 0 ? products.length - itemsPerView : prev - 1
        );
    };
    
    // Get visible products
    const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);
    
    return (
        <div className="relative">
            {/* Carousel Navigation */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
                <ChevronLeft size={24} />
            </button>
            
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
                <ChevronRight size={24} />
            </button>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={route('product.details', product.id)}
                        className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Product Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.image || '/default-product.jpg'}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                                {product.name}
                            </h3>
                            
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={`${
                                            i < (product.rating || 0)
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-xs text-gray-500">
                                    ({product.review_count || 0})
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                                {product.original_price && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ${product.original_price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            
                            {product.manufacturer && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {product.manufacturer}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsPerView)}
                        className={`w-2 h-2 rounded-full ${
                            currentIndex >= index * itemsPerView && 
                            currentIndex < (index + 1) * itemsPerView
                                ? 'bg-blue-600'
                                : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}