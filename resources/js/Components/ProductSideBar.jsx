import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';

export default function ProductSidebar({ 
    brands = [], 
    categories = [], 
    priceRange = { min: 0, max: 1000 },
    searchQuery = '' 
}) {
    const [filters, setFilters] = useState({
        search: searchQuery,
        price: priceRange.max,
        selectedBrands: [],
        selectedCategories: []
    });
    
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        
        // You can implement filtering logic here
        // This is a basic example - adjust based on your backend
        const params = {
            search: newFilters.search,
            max_price: newFilters.price,
            brands: newFilters.selectedBrands,
            categories: newFilters.selectedCategories
        };
        
        // router.get(route('products'), params, { preserveState: true });
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold">Filters</h3>
            </div>
            
            {/* Search */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search products..."
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${filters.price}
                </label>
                <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                </div>
            </div>
            
            {/* Categories */}
            {categories.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.selectedCategories.includes(category.id)}
                                    onChange={(e) => {
                                        const newCategories = e.target.checked
                                            ? [...filters.selectedCategories, category.id]
                                            : filters.selectedCategories.filter(id => id !== category.id);
                                        handleFilterChange('selectedCategories', newCategories);
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-600">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Brands */}
            {brands.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label key={brand.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.selectedBrands.includes(brand.id)}
                                    onChange={(e) => {
                                        const newBrands = e.target.checked
                                            ? [...filters.selectedBrands, brand.id]
                                            : filters.selectedBrands.filter(id => id !== brand.id);
                                        handleFilterChange('selectedBrands', newBrands);
                                    }}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-600">{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Clear Filters */}
            <button
                onClick={() => {
                    setFilters({
                        search: '',
                        price: priceRange.max,
                        selectedBrands: [],
                        selectedCategories: []
                    });
                }}
                className="w-full py-2 mt-4 text-center text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
                Clear All Filters
            </button>
        </div>
    );
}