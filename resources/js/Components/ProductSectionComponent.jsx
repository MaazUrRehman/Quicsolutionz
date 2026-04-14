// import { Link } from '@inertiajs/react';
// import { useState, useEffect, useMemo } from 'react';

// export default function ProductSection({
//     products,
//     searchQuery = '',
//     manufacturer = '',
//     manufacturers = [],
//     isLoadingMore = false
// }) {
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedAlphabet, setSelectedAlphabet] = useState('');
//     const [selectedManufacturer, setSelectedManufacturer] = useState(manufacturer || '');
//     const [filteredManufacturers, setFilteredManufacturers] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [sortBy, setSortBy] = useState('newest');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(20);

//     // Set manufacturer from URL params on component mount
//     useEffect(() => {
//         if (manufacturer) {
//             setSelectedManufacturer(manufacturer);
//         }
//     }, [manufacturer]);

//     // Validate products on initial load
//     useEffect(() => {
//         if (products === undefined || products === null) {
//             setError("No products data received");
//             setIsLoading(false);
//             return;
//         }

//         if (!Array.isArray(products)) {
//             console.error('Products is not an array:', products);
//             setError(`Expected products to be an array but got ${typeof products}`);
//             setIsLoading(false);
//             return;
//         }

//         setIsLoading(false);
//         setError(null);
//     }, [products]);

//     const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

//     // Process products data to ensure it's always an array
//     const processedProducts = useMemo(() => {
//         if (!Array.isArray(products)) {
//             console.warn('Products is not an array, returning empty array');
//             return [];
//         }
//         return products;
//     }, [products]);

//     // Get image URL
//     const getProductImageUrl = (product) => {
//         if (product.image) {
//             return `/assets/product/${product.image}`;
//         }

//         if (product.manufacturer_name && manufacturers && Array.isArray(manufacturers)) {
//             const matchedManufacturer = manufacturers.find(
//                 manufacturer =>
//                     manufacturer.title &&
//                     product.manufacturer_name &&
//                     manufacturer.title.toLowerCase() === product.manufacturer_name.toLowerCase()
//             );

//             if (matchedManufacturer && matchedManufacturer.image) {
//                 return `/assets/manufacturer/${matchedManufacturer.image}`;
//             }
//         }

//         return null;
//     };

//     // Get display image component
//     const getDisplayImage = (product) => {
//         const imageUrl = getProductImageUrl(product);

//         if (imageUrl) {
//             return (
//                 <div className="w-full h-full overflow-hidden">
//                     <img
//                         src={imageUrl}
//                         alt={product.product_name || 'Product Image'}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.style.display = 'none';
//                             const parent = e.target.parentElement;
//                             parent.innerHTML = `
//                                 <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                                     <span class="text-2xl text-gray-400">${product.product_name?.charAt(0) || 'P'}</span>
//                                 </div>
//                             `;
//                         }}
//                     />
//                 </div>
//             );
//         }

//         return (
//             <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                 <span className="text-2xl text-gray-400">
//                     {product.product_name?.charAt(0) || 'P'}
//                 </span>
//             </div>
//         );
//     };

//     // Filter products by search query
//     const searchFilteredProducts = useMemo(() => {
//         if (!searchQuery || searchQuery.trim() === '') {
//             return processedProducts;
//         }

//         const query = searchQuery.toLowerCase().trim();
//         return processedProducts.filter(product => {
//             return (
//                 (product.product_name && product.product_name.toLowerCase().includes(query)) ||
//                 (product.manufacturer_name && product.manufacturer_name.toLowerCase().includes(query)) ||
//                 (product.model_number && product.model_number.toLowerCase().includes(query)) ||
//                 (product.part_number && product.part_number.toLowerCase().includes(query)) ||
//                 (product.description && product.description.toLowerCase().includes(query)) ||
//                 (product.category && product.category.toLowerCase().includes(query))
//             );
//         });
//     }, [processedProducts, searchQuery]);

//     // Unique brands from search filtered products
//     const allBrandsFromProducts = useMemo(() => {
//         if (!Array.isArray(searchFilteredProducts) || searchFilteredProducts.length === 0) return [];

//         const uniqueBrands = [...new Set(searchFilteredProducts
//             .filter(p => p && p.manufacturer_name && p.manufacturer_name.trim() !== '')
//             .map(p => p.manufacturer_name.trim())
//         )];
//         return uniqueBrands.sort((a, b) => a.localeCompare(b));
//     }, [searchFilteredProducts]);

//     // Group manufacturers by alphabet
//     const groupedManufacturers = useMemo(() => {
//         const groups = {};
//         alphabets.forEach(letter => { groups[letter] = []; });

//         allBrandsFromProducts.forEach(brand => {
//             if (!brand || brand.trim() === '') return;
//             let firstLetter = brand.charAt(0).toUpperCase();
//             if (alphabets.includes(firstLetter)) {
//                 groups[firstLetter] = groups[firstLetter] || [];
//                 if (!groups[firstLetter].includes(brand)) {
//                     groups[firstLetter].push(brand);
//                 }
//             } else {
//                 groups['#'] = groups['#'] || [];
//                 if (!groups['#'].includes(brand)) {
//                     groups['#'].push(brand);
//                 }
//             }
//         });
//         return groups;
//     }, [allBrandsFromProducts, alphabets]);

//     // Update filtered manufacturers when alphabet changes
//     useEffect(() => {
//         if (!selectedAlphabet) {
//             setFilteredManufacturers([]);
//             return;
//         }
//         const filtered = groupedManufacturers[selectedAlphabet] || [];
//         setFilteredManufacturers(filtered);
//     }, [selectedAlphabet, groupedManufacturers]);

//     // Total filtered products count
//     const totalFilteredProducts = useMemo(() => {
//         if (!Array.isArray(searchFilteredProducts)) return 0;

//         let result = [...searchFilteredProducts];
//         if (selectedManufacturer) {
//             result = result.filter(product =>
//                 product && product.manufacturer_name &&
//                 product.manufacturer_name.toLowerCase() === selectedManufacturer.toLowerCase()
//             );
//         }

//         return result.length;
//     }, [searchFilteredProducts, selectedManufacturer]);

//     const totalPages = Math.ceil(totalFilteredProducts / itemsPerPage);

//     // Main filtering, sorting, and pagination logic
//     useEffect(() => {
//         if (!Array.isArray(searchFilteredProducts) || searchFilteredProducts.length === 0) {
//             setFilteredProducts([]);
//             return;
//         }

//         // Apply manufacturer filter
//         let result = [...searchFilteredProducts];
//         if (selectedManufacturer) {
//             result = result.filter(product =>
//                 product && product.manufacturer_name &&
//                 product.manufacturer_name.toLowerCase() === selectedManufacturer.toLowerCase()
//             );
//         }

//         // Apply sorting
//         const sortedProducts = [...result];

//         if (sortBy === 'name_asc') {
//             sortedProducts.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
//         } else if (sortBy === 'name_desc') {
//             sortedProducts.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
//         } else if (sortBy === 'price_low') {
//             sortedProducts.sort((a, b) => {
//                 const priceA = parseFloat(a.product_price) || 0;
//                 const priceB = parseFloat(b.product_price) || 0;
//                 return priceA - priceB;
//             });
//         } else if (sortBy === 'price_high') {
//             sortedProducts.sort((a, b) => {
//                 const priceA = parseFloat(a.product_price) || 0;
//                 const priceB = parseFloat(b.product_price) || 0;
//                 return priceB - priceA;
//             });
//         } else if (sortBy === 'manufacturer') {
//             sortedProducts.sort((a, b) =>
//                 (a.manufacturer_name || '').localeCompare(b.manufacturer_name || '')
//             );
//         } else if (sortBy === 'category') {
//             sortedProducts.sort((a, b) =>
//                 (a.category || '').localeCompare(b.category || '')
//             );
//         } else { // 'newest'
//             sortedProducts.sort((a, b) => {
//                 const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
//                 const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
//                 return dateB - dateA;
//             });
//         }

//         // Handle page boundary
//         if (currentPage > totalPages && totalPages > 0 && currentPage !== 1) {
//             setCurrentPage(1);
//             return;
//         }

//         // Apply pagination
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         const paginatedResult = sortedProducts.slice(startIndex, endIndex);

//         setFilteredProducts(paginatedResult);

//     }, [searchFilteredProducts, selectedManufacturer, sortBy, currentPage, itemsPerPage, totalPages]);

//     // Reset to page 1 when filters change
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedAlphabet, selectedManufacturer, sortBy, itemsPerPage]);

//     const handleAlphabetClick = (letter) => {
//         if (selectedAlphabet === letter) {
//             setSelectedAlphabet('');
//         } else {
//             setSelectedAlphabet(letter);
//         }
//     };

//     const handleManufacturerClick = (manufacturer) => {
//         setSelectedManufacturer(prev =>
//             prev === manufacturer ? '' : manufacturer
//         );
//     };

//     const handleSortChange = (e) => {
//         setSortBy(e.target.value);
//     };

//     const resetFilters = () => {
//         setSelectedAlphabet('');
//         setSelectedManufacturer('');
//         setSortBy('newest');
//         setCurrentPage(1);
//         window.history.pushState({}, '', route('products-page'));
//     };

//     const getProductCount = (manufacturer) => {
//         if (!manufacturer || !Array.isArray(searchFilteredProducts)) return 0;
//         return searchFilteredProducts.filter(p =>
//             p && p.manufacturer_name &&
//             p.manufacturer_name.toLowerCase() === manufacturer.toLowerCase()
//         ).length;
//     };

//     const hasManufacturers = (letter) => {
//         const manufacturersInLetter = groupedManufacturers[letter] || [];
//         return manufacturersInLetter.length > 0;
//     };

//     const handlePageChange = (page) => {
//         if (page < 1 || page > totalPages) return;
//         setCurrentPage(page);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const handleItemsPerPageChange = (e) => {
//         setItemsPerPage(Number(e.target.value));
//     };

//     const uniqueCategories = useMemo(() => {
//         if (!Array.isArray(searchFilteredProducts) || searchFilteredProducts.length === 0) return [];
//         const categories = [...new Set(searchFilteredProducts
//             .filter(p => p && p.category && p.category.trim() !== '')
//             .map(p => p.category.trim())
//         )];
//         return categories.sort((a, b) => a.localeCompare(b));
//     }, [searchFilteredProducts]);

//     // Loading state
//     if (isLoading) {
//         return (
//             <div className="bg-[#F7F7F7] min-h-screen py-8 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F37D2F] mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading products...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="bg-[#F7F7F7] min-h-screen py-8 flex items-center justify-center">
//                 <div className="text-center max-w-lg mx-4">
//                     <div className="text-4xl mb-4 text-red-500">⚠️</div>
//                     <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
//                     <p className="text-gray-600 mb-4">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="px-4 py-2 bg-[#F37D2F] text-white rounded-lg hover:bg-[#E56D1F]"
//                     >
//                         Reload Page
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // No products state
//     if (!Array.isArray(processedProducts) || processedProducts.length === 0) {
//         return (
//             <div className="bg-[#F7F7F7] min-h-screen py-8">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
//                         <div className="mx-auto max-w-md">
//                             <div className="text-6xl mb-4 text-gray-300">📦</div>
//                             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                                 No Products Available
//                             </h3>
//                             <p className="text-gray-600 mb-6">
//                                 There are no products in the database yet.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Main render
//     return (
//         <div className="bg-[#F7F7F7] min-h-screen py-8">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Page Header */}
//                 <div className="mb-8">
//                     <h1 className="text-4xl font-black text-gray-900 mb-2">
//                         Our Products
//                     </h1>
//                     <p className="text-gray-600">
//                         Browse {searchFilteredProducts.length} products from {allBrandsFromProducts.length} brands across {uniqueCategories.length} categories
//                     </p>

//                     {/* Active Filters */}
//                     {(selectedAlphabet || selectedManufacturer || searchQuery) && (
//                         <div className="mt-4 flex flex-wrap items-center gap-2">
//                             <span className="text-sm font-medium text-gray-700">Active filters:</span>
//                             {selectedAlphabet && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
//                                     Letter: {selectedAlphabet}
//                                     <button
//                                         onClick={() => setSelectedAlphabet('')}
//                                         className="ml-2 text-orange-600 hover:text-orange-800"
//                                     >
//                                         &times;
//                                     </button>
//                                 </span>
//                             )}
//                             {selectedManufacturer && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
//                                     Brand: {selectedManufacturer} ({getProductCount(selectedManufacturer)})
//                                     <button
//                                         onClick={() => setSelectedManufacturer('')}
//                                         className="ml-2 text-orange-600 hover:text-orange-800"
//                                     >
//                                         &times;
//                                     </button>
//                                 </span>
//                             )}
//                             {searchQuery && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
//                                     Search: {searchQuery}
//                                     <Link
//                                         href={route('products-page')}
//                                         className="ml-2 text-blue-600 hover:text-blue-800"
//                                     >
//                                         &times;
//                                     </Link>
//                                 </span>
//                             )}
//                             <button
//                                 onClick={resetFilters}
//                                 className="text-sm text-gray-600 hover:text-[#F37D2F] font-medium flex items-center"
//                             >
//                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                 </svg>
//                                 Clear all
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Left Sidebar */}
//                     <aside className="lg:w-1/4">
//                         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
//                             <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
//                                 <h2 className="text-xl font-bold text-gray-900">
//                                     Filter by Brand
//                                 </h2>
//                                 <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                                     {allBrandsFromProducts.length} brands
//                                 </span>
//                             </div>

//                             {/* Alphabet Grid */}
//                             <div className="mb-6">
//                                 <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
//                                     <svg className="w-4 h-4 mr-2 text-[#F37D2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                     </svg>
//                                     Browse Alphabetically
//                                 </h3>
//                                 <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2">
//                                     {alphabets.map((letter) => (
//                                         <button
//                                             key={letter}
//                                             onClick={() => handleAlphabetClick(letter)}
//                                             disabled={!hasManufacturers(letter)}
//                                             className={`h-10 flex items-center justify-center rounded-lg font-bold transition-all duration-300 relative
//                                                 ${!hasManufacturers(letter)
//                                                     ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
//                                                     : selectedAlphabet === letter
//                                                         ? 'bg-[#F37D2F] text-white transform scale-105 shadow-lg'
//                                                         : 'bg-gray-100 text-gray-700 hover:bg-[#F37D2F] hover:text-white hover:shadow-md'
//                                                 }`}
//                                             title={hasManufacturers(letter)
//                                                 ? `Brands starting with ${letter}`
//                                                 : `No brands starting with ${letter}`
//                                             }
//                                         >
//                                             {letter}
//                                             {hasManufacturers(letter) && (
//                                                 <span className="absolute -top-1 -right-1 bg-[#F37D2F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                                                     {groupedManufacturers[letter]?.length || 0}
//                                                 </span>
//                                             )}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Selected Alphabet Manufacturers */}
//                             {selectedAlphabet && filteredManufacturers.length > 0 && (
//                                 <div className="mt-6 animate-fadeIn">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <h3 className="text-sm font-semibold text-gray-700">
//                                             <span className="text-[#F37D2F]">{selectedAlphabet}</span>
//                                             <span className="text-gray-500 ml-2">
//                                                 ({filteredManufacturers.length} brand{filteredManufacturers.length !== 1 ? 's' : ''})
//                                             </span>
//                                         </h3>
//                                         <button
//                                             onClick={() => setSelectedAlphabet('')}
//                                             className="text-xs text-gray-500 hover:text-[#F37D2F] flex items-center"
//                                         >
//                                             Close
//                                             <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 shadow-inner">
//                                         {filteredManufacturers.map((manufacturer) => {
//                                             const productCount = getProductCount(manufacturer);
//                                             const isSelected = selectedManufacturer === manufacturer;

//                                             return (
//                                                 <button
//                                                     key={manufacturer}
//                                                     onClick={() => handleManufacturerClick(manufacturer)}
//                                                     className={`w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200
//                                                         ${isSelected
//                                                             ? 'bg-orange-50 text-[#F37D2F] font-semibold border-l-4 border-l-[#F37D2F]'
//                                                             : 'text-gray-700 hover:text-[#F37D2F]'
//                                                         }`}
//                                                 >
//                                                     <div className="flex items-center justify-between">
//                                                         <span className="flex-1 text-left">{manufacturer}</span>
//                                                         <div className="flex items-center space-x-2">
//                                                             <span className={`text-xs px-2 py-0.5 rounded-full
//                                                                 ${isSelected
//                                                                     ? 'bg-[#F37D2F] text-white'
//                                                                     : 'bg-gray-100 text-gray-600'
//                                                                 }`}>
//                                                                 {productCount}
//                                                             </span>
//                                                             <svg className={`w-4 h-4 ${isSelected ? 'text-[#F37D2F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                             </svg>
//                                                         </div>
//                                                     </div>
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Statistics */}
//                             <div className="mt-8 pt-6 border-t border-gray-200">
//                                 <h4 className="text-sm font-semibold text-gray-700 mb-3">Statistics</h4>
//                                 <div className="space-y-2">
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-gray-600">Total Products</span>
//                                         <span className="font-semibold text-gray-900">{searchFilteredProducts.length}</span>
//                                     </div>
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-gray-600">Manufacturers</span>
//                                         <span className="font-semibold text-blue-600">{allBrandsFromProducts.length}</span>
//                                     </div>
//                                     <div className="flex justify-between text-sm">
//                                         <span className="text-gray-600">Categories</span>
//                                         <span className="font-semibold text-purple-600">{uniqueCategories.length}</span>
//                                     </div>
//                                     {selectedManufacturer && (
//                                         <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
//                                             <span className="text-gray-700 font-medium">Selected Brand</span>
//                                             <span className="font-semibold text-[#F37D2F]">
//                                                 {selectedManufacturer} ({getProductCount(selectedManufacturer)})
//                                             </span>
//                                         </div>
//                                     )}
//                                     {searchQuery && (
//                                         <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
//                                             <span className="text-gray-700 font-medium">Search Results</span>
//                                             <span className="font-semibold text-blue-600">
//                                                 "{searchQuery}"
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>

//                     {/* Right Side - Product Grid */}
//                     <div className="lg:w-3/4">
//                         {/* Results Header */}
//                         <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-900">
//                                     {searchQuery && !selectedManufacturer
//                                         ? `Search Results for "${searchQuery}"`
//                                         : selectedManufacturer
//                                             ? `${selectedManufacturer} Products`
//                                             : 'All Products'
//                                     }
//                                 </h2>
//                                 <p className="text-gray-600 text-sm mt-1">
//                                     Showing {filteredProducts.length} of {totalFilteredProducts} product{totalFilteredProducts !== 1 ? 's' : ''}
//                                     {selectedManufacturer
//                                         ? ` from ${selectedManufacturer}`
//                                         : searchQuery
//                                             ? ` matching "${searchQuery}"`
//                                             : ` from ${allBrandsFromProducts.length} brands`
//                                     }
//                                     {totalPages > 0 && ` (Page ${currentPage} of ${totalPages})`}
//                                 </p>
//                             </div>
//                             <div className="flex flex-wrap items-center gap-4">
//                                 {/* Items per page selector */}
//                                 <div className="relative">
//                                     <select
//                                         value={itemsPerPage}
//                                         onChange={handleItemsPerPageChange}
//                                         className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:border-[#F37D2F] focus:ring-1 focus:ring-[#F37D2F] text-sm"
//                                     >
//                                         <option value={12}>12 per page</option>
//                                         <option value={20}>20 per page</option>
//                                         <option value={30}>30 per page</option>
//                                         <option value={50}>50 per page</option>
//                                         <option value={100}>100 per page</option>
//                                     </select>
//                                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </div>
//                                 </div>

//                                 {/* Sorting selector */}
//                                 <div className="relative">
//                                     <select
//                                         value={sortBy}
//                                         onChange={handleSortChange}
//                                         className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:border-[#F37D2F] focus:ring-1 focus:ring-[#F37D2F] text-sm"
//                                     >
//                                         <option value="newest">Sort by: Newest</option>
//                                         <option value="name_asc">Name: A to Z</option>
//                                         <option value="name_desc">Name: Z to A</option>
//                                         <option value="price_low">Price: Low to High</option>
//                                         <option value="price_high">Price: High to Low</option>
//                                         <option value="manufacturer">Manufacturer: A to Z</option>
//                                         <option value="category">Category: A to Z</option>
//                                     </select>
//                                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Product Grid */}
//                         {filteredProducts.length > 0 ? (
//                             <>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {filteredProducts.map((product) => (
//                                         <ProductCard
//                                             key={product.id}
//                                             product={product}
//                                             getDisplayImage={getDisplayImage}
//                                         />
//                                     ))}
//                                 </div>

//                                 {/* Pagination */}
//                                 {totalPages > 1 && (
//                                     <div className="mt-12">
//                                         <Pagination
//                                             currentPage={currentPage}
//                                             totalPages={totalPages}
//                                             onPageChange={handlePageChange}
//                                         />
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
//                                 <div className="mx-auto max-w-md">
//                                     <div className="text-6xl mb-4 text-gray-300">🔍</div>
//                                     <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                                         No Products Found
//                                     </h3>
//                                     <p className="text-gray-600 mb-6">
//                                         {searchQuery && selectedManufacturer
//                                             ? `No products found for "${searchQuery}" and brand "${selectedManufacturer}". Try another search or clear filters.`
//                                             : searchQuery
//                                                 ? `No products found for "${searchQuery}". Try another search or clear filters.`
//                                                 : selectedManufacturer
//                                                     ? `No products found for brand "${selectedManufacturer}". Try another brand or clear filters.`
//                                                     : 'No products match your current filters. Try a different search or clear filters.'
//                                         }
//                                     </p>
//                                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                                         <button
//                                             onClick={resetFilters}
//                                             className="px-6 py-3 bg-[#F37D2F] text-white font-semibold rounded-lg hover:bg-[#E56D1F] transition-colors duration-300 inline-flex items-center justify-center space-x-2"
//                                         >
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                             </svg>
//                                             <span>Clear All Filters</span>
//                                         </button>
//                                         {selectedManufacturer && (
//                                             <button
//                                                 onClick={() => setSelectedManufacturer('')}
//                                                 className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
//                                             >
//                                                 View All Products
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Loading indicator for more products */}
//                         {isLoadingMore && (
//                             <div className="mt-8 text-center">
//                                 <div className="inline-flex items-center space-x-2">
//                                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F37D2F]"></div>
//                                     <span className="text-sm text-gray-500">Loading more products...</span>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Styles */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(-10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fadeIn {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//                 .line-clamp-2 {
//                     display: -webkit-box;
//                     -webkit-line-clamp: 2;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//                 .line-clamp-1 {
//                     display: -webkit-box;
//                     -webkit-line-clamp: 1;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// }

// // Pagination Component
// function Pagination({ currentPage, totalPages, onPageChange }) {

//     const getPageNumbers = () => {
//         const delta = 2;
//         const range = [];
//         const rangeWithDots = [];
//         let l;

//         for (let i = 1; i <= totalPages; i++) {
//             if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
//                 range.push(i);
//             }
//         }

//         range.forEach(i => {
//             if (l) {
//                 if (i - l === 2) {
//                     rangeWithDots.push(l + 1);
//                 } else if (i - l !== 1) {
//                     rangeWithDots.push('...');
//                 }
//             }
//             rangeWithDots.push(i);
//             l = i;
//         });

//         return rangeWithDots;
//     };

//     return (
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//             </div>
//             <nav className="flex items-center space-x-2">
//                 <button
//                     onClick={() => onPageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`p-2 rounded-lg ${currentPage === 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-orange-50 hover:text-[#F37D2F]'
//                         }`}
//                 >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                 </button>

//                 {getPageNumbers().map((page, index) => (
//                     page === '...' ? (
//                         <span key={index} className="px-3 py-2 text-gray-400">
//                             ...
//                         </span>
//                     ) : (
//                         <button
//                             key={index}
//                             onClick={() => onPageChange(page)}
//                             className={`px-4 py-2 rounded-lg font-medium ${currentPage === page
//                                 ? 'bg-[#F37D2F] text-white'
//                                 : 'text-gray-700 hover:bg-orange-50 hover:text-[#F37D2F]'
//                                 }`}
//                         >
//                             {page}
//                         </button>
//                     )
//                 ))}

//                 <button
//                     onClick={() => onPageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`p-2 rounded-lg ${currentPage === totalPages
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-orange-50 hover:text-[#F37D2F]'
//                         }`}
//                 >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                 </button>
//             </nav>
//         </div>
//     );
// }

// // Product Card Component
// function ProductCard({ product, getDisplayImage }) {
//     if (!product) return null;

//     return (
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
//             {/* Product Image Section */}
//             <div className="relative h-48 overflow-hidden bg-gray-100">
//                 {getDisplayImage(product)}

//                 {product.category && (
//                     <div className="absolute top-3 left-3">
//                         <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
//                             {product.category}
//                         </span>
//                     </div>
//                 )}
//             </div>

//             {/* Product Header */}
//             <div className="p-5 pb-3">
//                 <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                             <span className="px-2 py-1 rounded text-xs font-bold font-manrope whitespace-nowrap bg-green-100 text-green-800">
//                                 {product.availability || 'Call for availability'}
//                             </span>
//                         </div>
//                         <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2 line-clamp-2">
//                             {product.part_number || 'Unnamed Product'}
//                         </h3>
//                     </div>
//                 </div>

//                 {/* Manufacturer Badge */}
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                         <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                         <span className="text-sm font-medium font-manrope text-gray-700 line-clamp-1">
//                             {product.manufacturer_name || 'Unknown Brand'}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Product Details */}
//             <div className="px-5 py-3 bg-gray-50 border-y border-gray-200">
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div>
//                         <div className="text-gray-500 font-manrope mb-1">Model</div>
//                         <div className="font-medium font-manrope text-gray-900 truncate">
//                             {product.model_number || 'N/A'}
//                         </div>
//                     </div>
//                     <div>
//                         <div className="text-gray-500 font-manrope mb-1">Condition</div>
//                         <div className="font-medium font-manrope text-gray-900 truncate">
//                             {product.condition || 'N/A'}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Price and Actions */}
//             <div className="p-5">
//                 <div className="flex items-center justify-between mb-4">
//                     <div>
//                         {product.product_price ? (
//                             <>
//                                 <div className="text-2xl font-black font-manrope text-[#F37D2F]">
//                                     ${parseFloat(product.product_price).toFixed(2)}
//                                 </div>
//                                 <div className="text-xs text-gray-500">USD</div>
//                             </>
//                         ) : (
//                             <div className="text-lg font-semibold font-manrope text-gray-500">
//                                 Price on request
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex space-x-3">
//                     <Link href={route('product-details', product.id)} className="flex-1 px-4 py-3 bg-[#F37D2F] text-white font-semibold font-manrope rounded-lg hover:bg-[#E56D1F] transition-colors duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                         <span>View Details</span>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }













import { Link } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

export default function ProductSection({
    products,
    allManufacturers = [],
    groupedManufacturers = {},
    manufacturers = [],
    searchQuery = '',
    isLoadingMore = false,
    selectedManufacturer: externalSelectedManufacturer = null,
    onManufacturerFilter,
    manufacturerTotalCount = null,
    totalProductsCount = null
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAlphabet, setSelectedAlphabet] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState(externalSelectedManufacturer || '');
    const [filteredManufacturers, setFilteredManufacturers] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    // Sync with external selected manufacturer
    useEffect(() => {
        if (externalSelectedManufacturer !== undefined) {
            setSelectedManufacturer(externalSelectedManufacturer);
        }
    }, [externalSelectedManufacturer]);

    // Validate products on initial load
    useEffect(() => {
        if (products === undefined || products === null) {
            setError("No products data received");
            setIsLoading(false);
            return;
        }

        if (!Array.isArray(products)) {
            console.error('Products is not an array:', products);
            setError(`Expected products to be an array but got ${typeof products}`);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setError(null);
    }, [products]);

    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Process products data
    const processedProducts = useMemo(() => {
        if (!Array.isArray(products)) {
            console.warn('Products is not an array, returning empty array');
            return [];
        }
        return products;
    }, [products]);

    // Get image URL
    const getProductImageUrl = (product) => {
        if (product.image) {
            return `/assets/product/${product.image}`;
        }

        if (product.manufacturer_name && manufacturers && Array.isArray(manufacturers)) {
            const matchedManufacturer = manufacturers.find(
                manufacturer =>
                    manufacturer.title &&
                    product.manufacturer_name &&
                    manufacturer.title.toLowerCase() === product.manufacturer_name.toLowerCase()
            );

            if (matchedManufacturer && matchedManufacturer.image) {
                return `/assets/manufacturer/${matchedManufacturer.image}`;
            }
        }

        return null;
    };

    // Get display image component
    const getDisplayImage = (product) => {
        const imageUrl = getProductImageUrl(product);

        if (imageUrl) {
            return (
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={product.product_name || 'Product Image'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
                                placeholder.innerHTML = `<span class="text-2xl text-gray-400">${product.product_name?.charAt(0) || 'P'}</span>`;
                                parent.appendChild(placeholder);
                            }
                        }}
                    />
                </div>
            );
        }

        return (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-400">
                    {product.product_name?.charAt(0) || 'P'}
                </span>
            </div>
        );
    };

    // Filter products by search query
    const searchFilteredProducts = useMemo(() => {
        if (!searchQuery || searchQuery.trim() === '') {
            return processedProducts;
        }

        const query = searchQuery.toLowerCase().trim();
        return processedProducts.filter(product => {
            return (
                (product.product_name && product.product_name.toLowerCase().includes(query)) ||
                (product.manufacturer_name && product.manufacturer_name.toLowerCase().includes(query)) ||
                (product.model_number && product.model_number.toLowerCase().includes(query)) ||
                (product.part_number && product.part_number.toLowerCase().includes(query)) ||
                (product.description && product.description.toLowerCase().includes(query)) ||
                (product.category && product.category.toLowerCase().includes(query))
            );
        });
    }, [processedProducts, searchQuery]);

    // Update filtered manufacturers when alphabet changes
    useEffect(() => {
        if (!selectedAlphabet) {
            setFilteredManufacturers([]);
            return;
        }
        const filtered = groupedManufacturers[selectedAlphabet] || [];
        setFilteredManufacturers(filtered);
    }, [selectedAlphabet, groupedManufacturers]);

    // Total filtered products count
    const totalFilteredProducts = searchFilteredProducts.length;

    // Main filtering and sorting logic
    useEffect(() => {
        if (!Array.isArray(searchFilteredProducts) || searchFilteredProducts.length === 0) {
            setFilteredProducts([]);
            return;
        }

        // Apply sorting only
        const sortedProducts = [...searchFilteredProducts];

        if (sortBy === 'name_asc') {
            sortedProducts.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
        } else if (sortBy === 'name_desc') {
            sortedProducts.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
        } else if (sortBy === 'price_low') {
            sortedProducts.sort((a, b) => {
                const priceA = parseFloat(a.product_price) || 0;
                const priceB = parseFloat(b.product_price) || 0;
                return priceA - priceB;
            });
        } else if (sortBy === 'price_high') {
            sortedProducts.sort((a, b) => {
                const priceA = parseFloat(a.product_price) || 0;
                const priceB = parseFloat(b.product_price) || 0;
                return priceB - priceA;
            });
        } else if (sortBy === 'manufacturer') {
            sortedProducts.sort((a, b) =>
                (a.manufacturer_name || '').localeCompare(b.manufacturer_name || '')
            );
        } else if (sortBy === 'category') {
            sortedProducts.sort((a, b) =>
                (a.category || '').localeCompare(b.category || '')
            );
        } else { // 'newest'
            sortedProducts.sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                return dateB - dateA;
            });
        }

        setFilteredProducts(sortedProducts);

    }, [searchFilteredProducts, sortBy]);

    const handleAlphabetClick = (letter) => {
        if (selectedAlphabet === letter) {
            setSelectedAlphabet('');
        } else {
            setSelectedAlphabet(letter);
        }
    };

    const handleManufacturerClick = (manufacturer) => {
        if (onManufacturerFilter) {
            onManufacturerFilter(manufacturer);
        }
        setSelectedManufacturer(prev => prev === manufacturer ? '' : manufacturer);
        setSelectedAlphabet(''); // Close alphabet dropdown
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const resetFilters = () => {
        setSelectedAlphabet('');
        if (onManufacturerFilter) {
            onManufacturerFilter(null);
        }
        setSelectedManufacturer('');
        setSortBy('newest');
    };

    const hasManufacturers = (letter) => {
        const manufacturersInLetter = groupedManufacturers[letter] || [];
        return manufacturersInLetter.length > 0;
    };

    const uniqueCategories = useMemo(() => {
        if (!Array.isArray(searchFilteredProducts) || searchFilteredProducts.length === 0) return [];
        const categories = [...new Set(searchFilteredProducts
            .filter(p => p && p.category && p.category.trim() !== '')
            .map(p => p.category.trim())
        )];
        return categories.sort((a, b) => a.localeCompare(b));
    }, [searchFilteredProducts]);

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-[#F7F7F7] min-h-screen py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F37D2F] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-[#F7F7F7] min-h-screen py-8 flex items-center justify-center">
                <div className="text-center max-w-lg mx-4">
                    <div className="text-4xl mb-4 text-red-500">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[#F37D2F] text-white rounded-lg hover:bg-[#E56D1F]"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }

    // No products state
    if (!Array.isArray(processedProducts) || processedProducts.length === 0) {
        return (
            <div className="bg-[#F7F7F7] min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                        <div className="mx-auto max-w-md">
                            <div className="text-6xl mb-4 text-gray-300">📦</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                No Products Available
                            </h3>
                            <p className="text-gray-600 mb-6">
                                There are no products in the database yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main render
    return (
        <div className="bg-[#F7F7F7] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Our Products
                    </h1>
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} products
                        {selectedManufacturer && ` from ${selectedManufacturer}`}
                        {selectedManufacturer && manufacturerTotalCount &&
                            ` (${manufacturerTotalCount} total products available)`
                        }
                        {!selectedManufacturer && totalProductsCount &&
                            ` out of ${totalProductsCount} total products`
                        }
                        {searchQuery && ` matching "${searchQuery}"`}
                    </p>

                    {/* Active Filters */}
                    {(selectedAlphabet || selectedManufacturer || searchQuery) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Active filters:</span>
                            {selectedAlphabet && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                                    Letter: {selectedAlphabet}
                                    <button
                                        onClick={() => setSelectedAlphabet('')}
                                        className="ml-2 text-orange-600 hover:text-orange-800"
                                    >
                                        &times;
                                    </button>
                                </span>
                            )}
                            {selectedManufacturer && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                                    Brand: {selectedManufacturer}
                                    <button
                                        onClick={() => handleManufacturerClick(selectedManufacturer)}
                                        className="ml-2 text-orange-600 hover:text-orange-800"
                                    >
                                        &times;
                                    </button>
                                </span>
                            )}
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Search: {searchQuery}
                                    <Link
                                        href={route('products-page')}
                                        className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                        &times;
                                    </Link>
                                </span>
                            )}
                            <button
                                onClick={resetFilters}
                                className="text-sm text-gray-600 hover:text-[#F37D2F] font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Shows ALL manufacturers */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Filter by Brand
                                </h2>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {allManufacturers.length} brands
                                </span>
                            </div>

                            {/* Alphabet Grid */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#F37D2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Browse Alphabetically
                                </h3>
                                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2">
                                    {alphabets.map((letter) => (
                                        <button
                                            key={letter}
                                            onClick={() => handleAlphabetClick(letter)}
                                            disabled={!hasManufacturers(letter)}
                                            className={`h-10 flex items-center justify-center rounded-lg font-bold transition-all duration-300 relative
                                                ${!hasManufacturers(letter)
                                                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    : selectedAlphabet === letter
                                                        ? 'bg-[#F37D2F] text-white transform scale-105 shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-[#F37D2F] hover:text-white hover:shadow-md'
                                                }`}
                                            title={hasManufacturers(letter)
                                                ? `Brands starting with ${letter}`
                                                : `No brands starting with ${letter}`
                                            }
                                        >
                                            {letter}
                                            {hasManufacturers(letter) && (
                                                <span className="absolute -top-1 -right-1 bg-[#F37D2F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                    {groupedManufacturers[letter]?.length || 0}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Alphabet Manufacturers - Shows ALL manufacturers for that letter */}
                            {selectedAlphabet && filteredManufacturers.length > 0 && (
                                <div className="mt-6 animate-fadeIn">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-gray-700">
                                            <span className="text-[#F37D2F]">{selectedAlphabet}</span>
                                            <span className="text-gray-500 ml-2">
                                                ({filteredManufacturers.length} brand{filteredManufacturers.length !== 1 ? 's' : ''})
                                            </span>
                                        </h3>
                                        <button
                                            onClick={() => setSelectedAlphabet('')}
                                            className="text-xs text-gray-500 hover:text-[#F37D2F] flex items-center"
                                        >
                                            Close
                                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 shadow-inner">
                                        {filteredManufacturers.map((manufacturerName) => {
                                            const isSelected = selectedManufacturer === manufacturerName;

                                            return (
                                                <button
                                                    key={manufacturerName}
                                                    onClick={() => handleManufacturerClick(manufacturerName)}
                                                    className={`w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200
                                                        ${isSelected
                                                            ? 'bg-orange-50 text-[#F37D2F] font-semibold border-l-4 border-l-[#F37D2F]'
                                                            : 'text-gray-700 hover:text-[#F37D2F]'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex-1 text-left font-medium">
                                                            {manufacturerName}
                                                        </span>
                                                        <svg className={`w-4 h-4 ${isSelected ? 'text-[#F37D2F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Statistics */}
                            {/* Statistics */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Statistics</h4>
                                <div className="space-y-2">
                                    {/* Total Products from Database */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Products</span>
                                        <span className="font-semibold text-gray-900">
                                            {selectedManufacturer && manufacturerTotalCount
                                                ? manufacturerTotalCount  // Manufacturer filter applied
                                                : totalProductsCount !== null
                                                    ? totalProductsCount    // Total from database
                                                    : filteredProducts.length // Fallback to loaded products
                                            }
                                        </span>
                                    </div>

                                    {/* Total Brands */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Brands</span>
                                        <span className="font-semibold text-blue-600">{allManufacturers.length}</span>
                                    </div>

                                    {/* Categories */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Categories</span>
                                        <span className="font-semibold text-purple-600">{uniqueCategories.length}</span>
                                    </div>

                                    

                                    
                                    {/* Search results count (if search applied) */}
                                    {searchQuery && (
                                        <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                                            <span className="text-gray-700 font-medium">Search Matches</span>
                                            <span className="font-semibold text-blue-600">
                                                {filteredProducts.length}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Side - Product Grid */}
                    <div className="lg:w-3/4">
                        {/* Results Header */}
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {searchQuery && !selectedManufacturer
                                        ? `Search Results for "${searchQuery}"`
                                        : selectedManufacturer
                                            ? `${selectedManufacturer} Products`
                                            : 'All Products'
                                    }
                                </h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                                    {selectedManufacturer && manufacturerTotalCount &&
                                        ` out of ${manufacturerTotalCount} total products from ${selectedManufacturer}`
                                    }
                                    {!selectedManufacturer && totalProductsCount &&
                                        ` out of ${totalProductsCount} total products`
                                    }
                                    {searchQuery && ` matching "${searchQuery}"`}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Sorting selector */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:border-[#F37D2F] focus:ring-1 focus:ring-[#F37D2F] text-sm"
                                    >
                                        <option value="newest">Sort by: Newest</option>
                                        <option value="name_asc">Name: A to Z</option>
                                        <option value="name_desc">Name: Z to A</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="manufacturer">Manufacturer: A to Z</option>
                                        <option value="category">Category: A to Z</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        getDisplayImage={getDisplayImage}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
                                <div className="mx-auto max-w-md">
                                    <div className="text-6xl mb-4 text-gray-300">🔍</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        No Products Found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchQuery && selectedManufacturer
                                            ? `No products found for "${searchQuery}" and brand "${selectedManufacturer}". Try another search or clear filters.`
                                            : searchQuery
                                                ? `No products found for "${searchQuery}". Try another search or clear filters.`
                                                : selectedManufacturer
                                                    ? `No products found for brand "${selectedManufacturer}". Try another brand or clear filters.`
                                                    : 'No products match your current filters. Try a different search or clear filters.'
                                        }
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button
                                            onClick={resetFilters}
                                            className="px-6 py-3 bg-[#F37D2F] text-white font-semibold rounded-lg hover:bg-[#E56D1F] transition-colors duration-300 inline-flex items-center justify-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>Clear All Filters</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading indicator for more products */}
                        {isLoadingMore && (
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F37D2F]"></div>
                                    <span className="text-sm text-gray-500">
                                        {selectedManufacturer ? 'Loading manufacturer products...' : 'Loading more products...'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

// Product Card Component (unchanged)
function ProductCard({ product, getDisplayImage }) {
    if (!product) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
            {/* Product Image Section */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                {getDisplayImage(product)}

                {product.category && (
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                            {product.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Header */}
            <div className="p-5 pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded text-xs font-bold font-manrope whitespace-nowrap bg-green-100 text-green-800">
                                {product.availability || 'Call for availability'}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2 line-clamp-2">
                            {product.part_number || product.product_name || 'Unnamed Product'}
                        </h3>
                    </div>
                </div>

                {/* Manufacturer Badge */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm font-medium font-manrope text-gray-700 line-clamp-1">
                            {product.manufacturer_name || 'Unknown Brand'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="px-5 py-3 bg-gray-50 border-y border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <div className="text-gray-500 font-manrope mb-1">Model</div>
                        <div className="font-medium font-manrope text-gray-900 truncate">
                            {product.model_number || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 font-manrope mb-1">Condition</div>
                        <div className="font-medium font-manrope text-gray-900 truncate">
                            {product.condition || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Price and Actions */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {product.product_price ? (
                            <>
                                <div className="text-2xl font-black font-manrope text-[#F37D2F]">
                                    ${parseFloat(product.product_price).toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500">USD</div>
                            </>
                        ) : (
                            <div className="text-lg font-semibold font-manrope text-gray-500">
                                Price on request
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex space-x-3">
                    <Link href={route('product-details', product.id)} className="flex-1 px-4 py-3 bg-[#F37D2F] text-white font-semibold font-manrope rounded-lg hover:bg-[#E56D1F] transition-colors duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}