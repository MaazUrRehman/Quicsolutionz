
// // ProductDetails.jsx
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, usePage, router } from '@inertiajs/react';
// import Footer from '@/Components/Footer';
// import { useState, useEffect, useMemo } from 'react';
// import {
//     ArrowLeft,
//     ShoppingCart,
//     Heart,
//     Search,
//     Package,
//     Hash,
//     DollarSign,
//     CheckCircle,
//     XCircle,
//     FileText,
//     Tag,
//     Building,
//     BarChart,
//     Layers,
//     Truck,
//     Image

// } from 'lucide-react';

// export default function ProductDetails({
//     product,
//     allProducts = [], // Pass all products from backend
//     brands,
//     categories,
//     searchQuery = '',
//     manufacturers = [] // Add manufacturers data
// }) {
//     const { auth } = usePage().props;
//     const [quantity, setQuantity] = useState(1);

//     // State for recommended products (filtered in React)
//     const [recommendedProducts, setRecommendedProducts] = useState([]);

//     // Create manufacturers map for image lookup
//     const manufacturersMap = useMemo(() => {
//         if (!manufacturers || !Array.isArray(manufacturers)) {
//             return {};
//         }

//         const map = {};
//         manufacturers.forEach(manufacturer => {
//             if (manufacturer.title && manufacturer.title.trim()) {
//                 const key = manufacturer.title.trim().toLowerCase();
//                 map[key] = manufacturer.image;
//             }
//         });

//         return map;
//     }, [manufacturers]);

//     // Get product image URL
//     const getProductImageUrl = (product) => {
//         // 1. Pehle check karein agar product ki khud ki image hai
//         if (product.image && product.image.trim() !== '') {
//             return `/assets/product/${product.image}`;
//         }

//         // 2. Manufacturer se match karein
//         if (product.manufacturer_name && manufacturersMap) {
//             const manufacturerKey = product.manufacturer_name.trim().toLowerCase();
//             const manufacturerImage = manufacturersMap[manufacturerKey];
//             if (manufacturerImage && manufacturerImage.trim() !== '') {
//                 return `/assets/manufacturer/${manufacturerImage}`;
//             }
//         }

//         // 3. Agar kuch bhi nahi mila to null return karein
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

//         // Agar koi image nahi mili to placeholder dikhayein
//         return (
//             <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                 <span className="text-2xl text-gray-400">
//                     {product.product_name?.charAt(0) || 'P'}
//                 </span>
//             </div>
//         );
//     };

//     // Filter recommended products based on manufacturer_name
//     useEffect(() => {
//         if (product.manufacturer_name && allProducts.length > 0) {
//             const filtered = allProducts.filter(p =>
//                 p.id !== product.id &&
//                 p.manufacturer_name === product.manufacturer_name
//             );
//             // Limit to 6 products
//             setRecommendedProducts(filtered.slice(0, 6));
//         } else {
//             setRecommendedProducts([]);
//         }
//     }, [product, allProducts]);

//     // Alphabet array for sidebar
//     const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

//     // State for sidebar filters
//     const [selectedAlphabet, setSelectedAlphabet] = useState('');

//     // Get all unique manufacturers from products
//     const getAllBrandsFromProducts = () => {
//         const manufacturers = new Set();
//         allProducts.forEach(product => {
//             if (product.manufacturer_name) {
//                 manufacturers.add(product.manufacturer_name);
//             }
//         });
//         return Array.from(manufacturers);
//     };

//     const allBrandsFromProducts = getAllBrandsFromProducts();

//     // Group manufacturers by first letter
//     const groupedManufacturers = allBrandsFromProducts.reduce((acc, manufacturer) => {
//         const firstLetter = manufacturer.charAt(0).toUpperCase();
//         if (!acc[firstLetter]) {
//             acc[firstLetter] = [];
//         }
//         acc[firstLetter].push(manufacturer);
//         return acc;
//     }, {});

//     // Check if manufacturers exist for a letter
//     const hasManufacturers = (letter) => {
//         return groupedManufacturers[letter] && groupedManufacturers[letter].length > 0;
//     };

//     // Get manufacturers for selected alphabet
//     const filteredManufacturers = selectedAlphabet
//         ? (groupedManufacturers[selectedAlphabet] || [])
//         : [];

//     // Get product count for a manufacturer
//     const getProductCount = (manufacturer) => {
//         return allProducts.filter(p => p.manufacturer_name === manufacturer).length;
//     };

//     // Handle alphabet click
//     const handleAlphabetClick = (letter) => {
//         if (hasManufacturers(letter)) {
//             setSelectedAlphabet(selectedAlphabet === letter ? '' : letter);
//         }
//     };

//     // Handle manufacturer click - navigate to products page with manufacturer filter
//     const handleManufacturerClick = (manufacturer) => {
//         // Navigate to products page with manufacturer filter
//         router.get(route('products-page'), {
//             manufacturer: manufacturer
//         });
//     };

//     // Product information cards data - Changed category in place of manufacturer
//     const productInfoCards = [

//         {
//             title: 'Manufacturer',
//             value: product.manufacturer_name,
//             icon: Tag,
//             color: 'text-red-600',
//             bgColor: 'bg-red-50'
//         },
//         {
//             title: 'Category',
//             value: product.category,
//             icon: Layers,
//             color: 'text-blue-600',
//             bgColor: 'bg-blue-50'
//         },
//         {
//             title: 'Model ',
//             value: product.model_number ? product.model_number : '-',
//             icon: Hash,
//             color: 'text-purple-600',
//             bgColor: 'bg-purple-50'
//         },
//     ];

//     // Specifications data
//     const specificationItems = [
//         { label: 'Condition', value: product.condition, icon: CheckCircle },
//         { label: 'Availability', value: product.availability, icon: Package },
//         { label: 'Payment', value: 'Paypal & Credit Card', icon: DollarSign },
//         { label: 'Delivery Time', value: '5 - 7 Days', icon: Truck },
//     ];

//     return (
//         <>
//             <AuthenticatedLayout auth={auth} header="Product Details">
//                 <Head title={`${product.product_name}`} />

//                 <div className="min-h-screen bg-gray-50 py-8">
//                     <div className="container mx-auto px-4">
//                         {/* Breadcrumb */}
//                         <div className="mb-6">
//                             <nav className="flex" aria-label="Breadcrumb">
//                                 <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                                     <li className="inline-flex items-center">
//                                         <Link
//                                             href={route('home')}
//                                             className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#F37D2F]"
//                                         >
//                                             Home
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <div className="flex items-center">
//                                             <span className="mx-2 text-gray-400">/</span>
//                                             <Link
//                                                 href={route('products-page')}
//                                                 className="text-sm font-medium text-gray-700 hover:text-[#F37D2F]"
//                                             >
//                                                 Products
//                                             </Link>
//                                         </div>
//                                     </li>
//                                     <li aria-current="page">
//                                         <div className="flex items-center">
//                                             <span className="mx-2 text-gray-400">/</span>
//                                             <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                                                 {product.product_name}
//                                             </span>
//                                         </div>
//                                     </li>
//                                 </ol>
//                             </nav>
//                         </div>

//                         <div className="flex flex-col lg:flex-row gap-8">
//                             {/* Left Sidebar - Filters */}
//                             <aside className="lg:w-1/4">
//                                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
//                                     <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
//                                         <h2 className="text-xl font-bold text-gray-900">
//                                             Filter by Brand
//                                         </h2>
//                                         <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                                             {allBrandsFromProducts.length} brands
//                                         </span>
//                                     </div>

//                                     {/* Alphabet Grid */}
//                                     <div className="mb-6">
//                                         <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
//                                             <svg className="w-4 h-4 mr-2 text-[#F37D2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                             </svg>
//                                             Browse Alphabetically
//                                         </h3>
//                                         <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2">
//                                             {alphabets.map((letter) => (
//                                                 <button
//                                                     key={letter}
//                                                     onClick={() => handleAlphabetClick(letter)}
//                                                     disabled={!hasManufacturers(letter)}
//                                                     className={`h-10 flex items-center justify-center rounded-lg font-bold transition-all duration-300 relative
//                                                         ${!hasManufacturers(letter)
//                                                             ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
//                                                             : selectedAlphabet === letter
//                                                                 ? 'bg-[#F37D2F] text-white transform scale-105 shadow-lg'
//                                                                 : 'bg-gray-100 text-gray-700 hover:bg-[#F37D2F] hover:text-white hover:shadow-md'
//                                                         }`}
//                                                     title={hasManufacturers(letter)
//                                                         ? `Brands starting with ${letter}`
//                                                         : `No brands starting with ${letter}`
//                                                     }
//                                                 >
//                                                     {letter}
//                                                     {hasManufacturers(letter) && (
//                                                         <span className="absolute -top-1 -right-1 bg-[#F37D2F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                                                             {groupedManufacturers[letter]?.length || 0}
//                                                         </span>
//                                                     )}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Selected Alphabet Manufacturers Dropdown */}
//                                     {selectedAlphabet && filteredManufacturers.length > 0 && (
//                                         <div className="mt-6 animate-fadeIn">
//                                             <div className="flex items-center justify-between mb-3">
//                                                 <h3 className="text-sm font-semibold text-gray-700">
//                                                     <span className="text-[#F37D2F]">{selectedAlphabet}</span>
//                                                     <span className="text-gray-500 ml-2">
//                                                         ({filteredManufacturers.length} brand{filteredManufacturers.length !== 1 ? 's' : ''})
//                                                     </span>
//                                                 </h3>
//                                                 <button
//                                                     onClick={() => setSelectedAlphabet('')}
//                                                     className="text-xs text-gray-500 hover:text-[#F37D2F] flex items-center"
//                                                 >
//                                                     Close
//                                                     <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                             <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 shadow-inner">
//                                                 {filteredManufacturers.map((manufacturer) => {
//                                                     const productCount = getProductCount(manufacturer);

//                                                     return (
//                                                         <button
//                                                             key={manufacturer}
//                                                             onClick={() => handleManufacturerClick(manufacturer)}
//                                                             className="w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 text-gray-700 hover:text-[#F37D2F]"
//                                                         >
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className="flex-1 text-left">{manufacturer}</span>
//                                                                 <div className="flex items-center space-x-2">
//                                                                     <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
//                                                                         {productCount}
//                                                                     </span>
//                                                                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                                     </svg>
//                                                                 </div>
//                                                             </div>
//                                                         </button>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Statistics */}
//                                     <div className="mt-8 pt-6 border-t border-gray-200">
//                                         <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//                                             <BarChart className="w-4 h-4 mr-2 text-[#F37D2F]" />
//                                             Statistics
//                                         </h4>
//                                         <div className="space-y-2">
//                                             <div className="flex justify-between text-sm">
//                                                 <span className="text-gray-600">Total Products</span>
//                                                 <span className="font-semibold text-gray-900">{allProducts.length}</span>
//                                             </div>
//                                             <div className="flex justify-between text-sm">
//                                                 <span className="text-gray-600">Manufacturers</span>
//                                                 <Link
//                                                     href={route('products-page')}
//                                                     className="font-semibold text-[#F37D2F] hover:underline"
//                                                 >
//                                                     {allBrandsFromProducts.length} brands
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </aside>

//                             {/* Main Content */}
//                             <div className="lg:w-3/4">
//                                 {/* Product Header - Manufacturer in front of product name */}
//                                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
//                                     <div className="flex justify-between items-start">
//                                         <div>

//                                             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                                                 {product.part_number}
//                                             </h1>
//                                             {/* Manufacturer in front of product name */}
//                                             {product.manufacturer_name && (
//                                                 <div className="flex items-center mb-2">
//                                                     <Building className="w-5 h-5 text-gray-400 mr-2" />
//                                                     <span className="text-lg font-semibold text-gray-700">
//                                                         {product.manufacturer_name}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-2xl font-bold text-[#F37D2F] mb-1">
//                                                 {product.product_price ? `$${product.product_price}` : 'Price on Request'}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Product Information Cards - Category instead of manufacturer */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                                     {productInfoCards.map((card, index) => (
//                                         <div
//                                             key={index}
//                                             className={`${card.bgColor} rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:shadow-md`}
//                                         >
//                                             <div className="flex items-center mb-3">
//                                                 <div className={`p-2 rounded-lg ${card.bgColor.replace('50', '100')} mr-3`}>
//                                                     <card.icon className={`w-5 h-5 ${card.color}`} />
//                                                 </div>
//                                                 <span className="text-sm font-medium text-gray-600">{card.title}</span>
//                                             </div>
//                                             <p className="text-lg font-semibold text-gray-900 truncate">
//                                                 {card.value || 'N/A'}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                                     {/* Product Image - In place of description */}
//                                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//                                         <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
//                                             <Image className="w-5 h-5 text-[#F37D2F] mr-2" />
//                                             <h3 className="text-xl font-bold text-gray-900">Product Image</h3>
//                                         </div>
//                                         <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100">
//                                             {getDisplayImage(product)}

//                                             {/* Category Badge on Image */}
//                                             {product.category && (
//                                                 <div className="absolute top-4 left-4">
//                                                     <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
//                                                         {product.category}
//                                                     </span>
//                                                 </div>
//                                             )}

//                                             {/* Manufacturer Badge on Image (if using manufacturer image) */}
//                                             {(!product.image && product.manufacturer_name) && (
//                                                 <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
//                                                     <span className="text-sm font-medium text-gray-700">
//                                                         {product.manufacturer_name}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Product Specifications */}
//                                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//                                         <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
//                                             <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
//                                             <h3 className="text-xl font-bold text-gray-900">Product Specifications</h3>
//                                         </div>
//                                         <div className="space-y-4">
//                                             {specificationItems.map((item, index) => (
//                                                 <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
//                                                     <div className="flex items-center">
//                                                         <item.icon className="w-4 h-4 text-gray-400 mr-2" />
//                                                         <span className="text-gray-700">{item.label}</span>
//                                                     </div>
//                                                     <span className="font-medium text-gray-900">
//                                                         {item.value || 'N/A'}
//                                                     </span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Warranty Information */}
//                                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//                                         <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
//                                             <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
//                                             <h3 className="text-xl font-bold text-gray-900">Warranty</h3>
//                                         </div>
//                                         <div className="prose max-w-none">
//                                             <p className="text-gray-600 leading-relaxed">
//                                                 We offer a standard 30-day warranty on the majority of products, providing dependable coverage and support. Terms may vary some units qualify for extended or shorter periods and any adjustments are confirmed in advance based on customer requirements and product condition.
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Payment and Delivery */}
//                                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//                                         <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
//                                             <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
//                                             <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
//                                         </div>
//                                         <div className="prose max-w-none">
//                                             <p className="text-gray-600 leading-relaxed">
//                                                 {product.description || 'No description available for this product.'}
//                                             </p>
//                                         </div>
//                                     </div>


//                                 </div>

//                                 {/* Action Section */}
//                                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
//                                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                                         <div>
//                                             <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to order?</h3>
//                                             <p className="text-gray-600">Request this product and our team will contact you shortly.</p>
//                                         </div>

//                                         <div className="flex items-center space-x-4">
//                                             {/* Action Buttons */}
//                                             <div className="flex items-center space-x-3">
//                                                 <button
//                                                     onClick={() => router.get(route('requestQuoteForProduct', { product: product.id }))}
//                                                     className="bg-[#F37D2F] hover:bg-[#e66d1f] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
//                                                 >
//                                                     Request Quote
//                                                 </button>

//                                                 <Link
//                                                     href={route('products-page')}
//                                                     className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
//                                                 >
//                                                     Back to Products
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Recommended Products Section - Added at bottom */}
//                                 {recommendedProducts.length > 0 && (
//                                     <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
//                                         <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
//                                             <h2 className="text-2xl font-bold text-gray-900">
//                                                 More from {product.manufacturer_name}
//                                             </h2>
//                                             <span className="text-sm text-gray-500">
//                                                 {recommendedProducts.length} other products
//                                             </span>
//                                         </div>

//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                             {recommendedProducts.map((recProduct) => (
//                                                 <Link
//                                                     key={recProduct.id}
//                                                     href={route('product-details', recProduct.id)}
//                                                     className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-[#F37D2F]"
//                                                 >
//                                                     {/* Product Image */}
//                                                     <div className="relative h-40 rounded-lg overflow-hidden bg-gray-100 mb-4">
//                                                         {getDisplayImage(recProduct)}
//                                                         {recProduct.category && (
//                                                             <div className="absolute top-2 left-2">
//                                                                 <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded">
//                                                                     {recProduct.category}
//                                                                 </span>
//                                                             </div>
//                                                         )}
//                                                     </div>

//                                                     <div className="flex items-start justify-between mb-3">
//                                                         <div className="flex-1">
//                                                             <h3 className="font-semibold text-gray-900 group-hover:text-[#F37D2F] truncate mb-1">
//                                                                 {recProduct.product_name}
//                                                             </h3>
//                                                             <p className="text-sm text-gray-500 truncate">
//                                                                 {recProduct.manufacturer_name}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <div className="space-y-2">
//                                                         <div className="flex justify-between items-center">
//                                                             <div>
//                                                                 <p className="text-lg font-bold text-[#F37D2F]">
//                                                                     {recProduct.product_price ? `$${recProduct.product_price}` : 'On Request'}
//                                                                 </p>
//                                                                 <p className="text-xs text-gray-500">
//                                                                     USD
//                                                                 </p>
//                                                             </div>
//                                                             <button
//                                                                 className="bg-[#F37D2F] hover:bg-[#e66d1f] text-white text-xs font-semibold py-2 px-2 rounded-lg transition duration-200 flex items-center gap-2"
//                                                             >
//                                                                 View Details
//                                                             </button>
//                                                         </div>
//                                                     </div>


//                                                 </Link>
//                                             ))}
//                                         </div>

//                                         {recommendedProducts.length > 6 && (
//                                             <div className="mt-6 text-center">
//                                                 <Link
//                                                     href={route('products-page', { manufacturer: product.manufacturer_name })}
//                                                     className="inline-flex items-center text-[#F37D2F] font-medium hover:underline"
//                                                 >
//                                                     View all {recommendedProducts.length} products from {product.manufacturer_name}
//                                                     <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
//                                                 </Link>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AuthenticatedLayout>
//             <Footer />
//         </>
//     );
// }




















// ProductDetails.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    ArrowLeft,
    ShoppingCart,
    Heart,
    Search,
    Package,
    Hash,
    DollarSign,
    CheckCircle,
    XCircle,
    FileText,
    Tag,
    Building,
    BarChart,
    Layers,
    Truck,
    Image

} from 'lucide-react';

export default function ProductDetails({
    auth,
    product,
    manufacturers = [],
    allManufacturers = [],
    groupedManufacturers = {},
    totalProductsCount = 0,
    recommendedProducts: initialRecommendedProducts = [],
    sameManufacturerTotalCount: initialSameManufacturerTotalCount = 0
}) {
    const [quantity, setQuantity] = useState(1);
    const [recommendedProducts, setRecommendedProducts] = useState(initialRecommendedProducts);
    const [sameManufacturerTotalCount, setSameManufacturerTotalCount] = useState(initialSameManufacturerTotalCount);
    const [loadingMore, setLoadingMore] = useState(false);
    const [viewAllMode, setViewAllMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Create manufacturers map for image lookup
    const manufacturersMap = useMemo(() => {
        if (!manufacturers || !Array.isArray(manufacturers)) {
            return {};
        }

        const map = {};
        manufacturers.forEach(manufacturer => {
            if (manufacturer.title && manufacturer.title.trim()) {
                const key = manufacturer.title.trim().toLowerCase();
                map[key] = manufacturer.image;
            }
        });

        return map;
    }, [manufacturers]);

    // Get product image URL
    const getProductImageUrl = (productItem) => {
        if (productItem.image && productItem.image.trim() !== '') {
            return `/assets/product/${productItem.image}`;
        }

        if (productItem.manufacturer_name && manufacturersMap) {
            const manufacturerKey = productItem.manufacturer_name.trim().toLowerCase();
            const manufacturerImage = manufacturersMap[manufacturerKey];
            if (manufacturerImage && manufacturerImage.trim() !== '') {
                return `/assets/manufacturer/${manufacturerImage}`;
            }
        }

        return null;
    };

    // Get display image component
    const getDisplayImage = (productItem) => {
        const imageUrl = getProductImageUrl(productItem);

        if (imageUrl) {
            return (
                <div className="w-full h-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={productItem.product_name || 'Product Image'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
                                placeholder.innerHTML = `<span class="text-2xl text-gray-400">${productItem.product_name?.charAt(0) || 'P'}</span>`;
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
                    {productItem.product_name?.charAt(0) || 'P'}
                </span>
            </div>
        );
    };

    // Load more recommended products
    const loadMoreRecommended = async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        try {
            const nextPage = currentPage + 1;
            const response = await axios.get('/load-more-recommended-products', {
                params: {
                    manufacturer: product.manufacturer_name,
                    exclude_id: product.id,
                    page: nextPage
                }
            });

            setRecommendedProducts(prev => [...prev, ...response.data.products]);
            setHasMore(response.data.hasMore);
            setCurrentPage(nextPage);
        } catch (error) {
            console.error('Error loading more products:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Handle View All toggle
    const handleViewAll = () => {
        if (!viewAllMode && sameManufacturerTotalCount > 6) {
            // Load all products when clicking View All
            setViewAllMode(true);
            setCurrentPage(1);
            setHasMore(true);
            // Reset to initial 6 products and then load more
            setRecommendedProducts(initialRecommendedProducts);
        } else if (viewAllMode) {
            // Back to limited view
            setViewAllMode(false);
            setRecommendedProducts(initialRecommendedProducts);
            setCurrentPage(1);
            setHasMore(false);
        }
    };

    // Alphabet array for sidebar
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // State for sidebar filters
    const [selectedAlphabet, setSelectedAlphabet] = useState('');
    const [filteredManufacturers, setFilteredManufacturers] = useState([]);

    // Update filtered manufacturers when alphabet changes
    useEffect(() => {
        if (!selectedAlphabet) {
            setFilteredManufacturers([]);
            return;
        }
        const filtered = groupedManufacturers[selectedAlphabet] || [];
        setFilteredManufacturers(filtered);
    }, [selectedAlphabet, groupedManufacturers]);

    // Check if manufacturers exist for a letter
    const hasManufacturers = (letter) => {
        const manufacturersInLetter = groupedManufacturers[letter] || [];
        return manufacturersInLetter.length > 0;
    };

    // Handle alphabet click
    const handleAlphabetClick = (letter) => {
        if (hasManufacturers(letter)) {
            setSelectedAlphabet(selectedAlphabet === letter ? '' : letter);
        }
    };

    // Handle manufacturer click - navigate to products page with manufacturer filter
    const handleManufacturerClick = (manufacturer) => {
        router.get(route('products-page'), {
            manufacturer: manufacturer
        });
    };

    // Product information cards
    const productInfoCards = [
        {
            title: 'Manufacturer',
            value: product.manufacturer_name,
            icon: Tag,
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            title: 'Category',
            value: product.category,
            icon: Layers,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Model Number',
            value: product.model_number ? product.model_number : '-',
            icon: Hash,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
    ];

    // Specifications data
    const specificationItems = [
        { label: 'Condition', value: product.condition, icon: CheckCircle },
        { label: 'Availability', value: product.availability, icon: Package },
        { label: 'Payment', value: 'Paypal & Credit Card', icon: DollarSign },
        { label: 'Delivery Time', value: '5 - 7 Days', icon: Truck },
    ];

    return (
        <>
            <AuthenticatedLayout auth={auth} header="Product Details">
                <Head title={`${product.product_name}`} />

                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="container mx-auto px-4">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link
                                            href={route('home')}
                                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#F37D2F]"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="mx-2 text-gray-400">/</span>
                                            <Link
                                                href={route('products-page')}
                                                className="text-sm font-medium text-gray-700 hover:text-[#F37D2F]"
                                            >
                                                Products
                                            </Link>
                                        </div>
                                    </li>
                                    <li aria-current="page">
                                        <div className="flex items-center">
                                            <span className="mx-2 text-gray-400">/</span>
                                            <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                {product.product_name}
                                            </span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Sidebar - Optimized Filters (No heavy queries) */}
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

                                    {/* Selected Alphabet Manufacturers Dropdown */}
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
                                            <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 shadow-inner">
                                                {filteredManufacturers.map((manufacturerName) => (
                                                    <button
                                                        key={manufacturerName}
                                                        onClick={() => handleManufacturerClick(manufacturerName)}
                                                        className="w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 text-gray-700 hover:text-[#F37D2F]"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex-1 text-left">{manufacturerName}</span>
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Statistics - Using lightweight data */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <BarChart className="w-4 h-4 mr-2 text-[#F37D2F]" />
                                            Statistics
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Total Products</span>
                                                <span className="font-semibold text-gray-900">{totalProductsCount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Total Brands</span>
                                                <Link
                                                    href={route('products-page')}
                                                    className="font-semibold text-[#F37D2F] hover:underline"
                                                >
                                                    {allManufacturers.length} brands
                                                </Link>
                                            </div>
                                            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                                                <span className="text-gray-600">Same Brand Products</span>
                                                <span className="font-semibold text-green-600">{sameManufacturerTotalCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <div className="lg:w-3/4">
                                {/* Product Header */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {product.part_number}
                                            </h1>
                                            {product.manufacturer_name && (
                                                <div className="flex items-center mb-2">
                                                    <Building className="w-5 h-5 text-gray-400 mr-2" />
                                                    <span className="text-lg font-semibold text-gray-700">
                                                        {product.manufacturer_name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-[#F37D2F] mb-1">
                                                {product.product_price ? `$${product.product_price}` : 'Price on Request'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Information Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                    {productInfoCards.map((card, index) => (
                                        <div
                                            key={index}
                                            className={`${card.bgColor} rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:shadow-md`}
                                        >
                                            <div className="flex items-center mb-3">
                                                <div className={`p-2 rounded-lg ${card.bgColor.replace('50', '100')} mr-3`}>
                                                    <card.icon className={`w-5 h-5 ${card.color}`} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">{card.title}</span>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900 truncate">
                                                {card.value || 'N/A'}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Product Image */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                        <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                                            <Image className="w-5 h-5 text-[#F37D2F] mr-2" />
                                            <h3 className="text-xl font-bold text-gray-900">Product Image</h3>
                                        </div>
                                        <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100">
                                            {getDisplayImage(product)}

                                            {product.category && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                                                        {product.category}
                                                    </span>
                                                </div>
                                            )}

                                            {(!product.image && product.manufacturer_name) && (
                                                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {product.manufacturer_name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Specifications */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                        <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                                            <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
                                            <h3 className="text-xl font-bold text-gray-900">Product Specifications</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {specificationItems.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                                                    <div className="flex items-center">
                                                        <item.icon className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-700">{item.label}</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {item.value || 'N/A'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Warranty Information */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                        <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                                            <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
                                            <h3 className="text-xl font-bold text-gray-900">Warranty</h3>
                                        </div>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-600 leading-relaxed">
                                                We offer a standard 30-day warranty on the majority of products, providing dependable coverage and support. Terms may vary some units qualify for extended or shorter periods and any adjustments are confirmed in advance based on customer requirements and product condition.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                        <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                                            <FileText className="w-5 h-5 text-[#F37D2F] mr-2" />
                                            <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
                                        </div>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-600 leading-relaxed">
                                                {product.description || 'No description available for this product.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Section */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to order?</h3>
                                            <p className="text-gray-600">Request this product and our team will contact you shortly.</p>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => router.get(route('requestQuoteForProduct', { product: product.id }))}
                                                    className="bg-[#F37D2F] hover:bg-[#e66d1f] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
                                                >
                                                    Request Quote
                                                </button>

                                                <Link
                                                    href={route('products-page')}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
                                                >
                                                    Back to Products
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommended Products Section - Optimized */}
                                {/* Recommended Products Section - Updated with direct link to products page */}
                                {recommendedProducts.length > 0 && (
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
                                        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                More from {product.manufacturer_name}
                                            </h2>
                                            <span className="text-sm text-gray-500">
                                                {sameManufacturerTotalCount} products available
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {recommendedProducts.map((recProduct) => (
                                                <Link
                                                    key={recProduct.id}
                                                    href={route('product-details', recProduct.id)}
                                                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-[#F37D2F]"
                                                >
                                                    <div className="relative h-40 rounded-lg overflow-hidden bg-gray-100 mb-4">
                                                        {getDisplayImage(recProduct)}
                                                        {recProduct.category && (
                                                            <div className="absolute top-2 left-2">
                                                                <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded">
                                                                    {recProduct.category}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900 group-hover:text-[#F37D2F] truncate mb-1">
                                                                {recProduct.product_name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {recProduct.manufacturer_name}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <p className="text-lg font-bold text-[#F37D2F]">
                                                                    {recProduct.product_price ? `$${recProduct.product_price}` : 'On Request'}
                                                                </p>
                                                                <p className="text-xs text-gray-500">USD</p>
                                                            </div>
                                                            <button className="bg-[#F37D2F] hover:bg-[#e66d1f] text-white text-xs font-semibold py-2 px-2 rounded-lg transition duration-200 flex items-center gap-2">
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* View All Button - Direct link to products page with manufacturer filter */}
                                        {sameManufacturerTotalCount > 6 && (
                                            <div className="mt-6 text-center">
                                                <Link
                                                    href={route('products-page', { manufacturer: product.manufacturer_name })}
                                                    className="inline-flex items-center px-6 py-3 bg-[#F37D2F] text-white font-semibold rounded-lg hover:bg-[#e66d1f] transition-colors duration-300 group"
                                                >
                                                    <span>View all {sameManufacturerTotalCount} products from {product.manufacturer_name}</span>
                                                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}