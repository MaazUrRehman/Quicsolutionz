// import React, { useState, useMemo } from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, usePage, Link, useForm } from '@inertiajs/react';
// import Footer from '@/Components/Footer';
// import ConfirmationModal from '@/Components/ConfirmationModal';
// import Snackbar from '@/Components/Snackbar';

// export default function ShowProduct() {
//     const { products, manufacturers } = usePage().props;
//     const [showModal, setShowModal] = useState(false);
//     const [productToDelete, setProductToDelete] = useState(null);
//     const { delete: destroy, processing } = useForm();
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterCondition, setFilterCondition] = useState('all');
//     const [filterCategory, setFilterCategory] = useState('all');

//     // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(20); // 20 products per page

//     const [snackbar, setSnackbar] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const handleSnackbarClose = () => {
//         setSnackbar(prev => ({ ...prev, show: false }));
//     }

//     const handleDeleteOptimized = () => {
//         if (!productToDelete) return;

//         setShowModal(false);

//         destroy(route('products.destroy', productToDelete.id), {
//             preserveScroll: false,
//             onSuccess: () => {
//                 setSnackbar({
//                     show: true,
//                     message: 'Product deleted successfully!',
//                     type: 'success'
//                 });
//             },
//             onError: (errors) => {
//                 setSnackbar({
//                     show: true,
//                     message: 'Error deleting product!',
//                     type: 'error'
//                 });
//             },
//         });

//         setProductToDelete(null);
//     };

//     // Format currency
//     const formatCurrency = (amount) => {
//         if (!amount || amount === 'On Request') return 'On Request';
//         if (isNaN(amount)) return 'N/A';
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         }).format(parseFloat(amount));
//     };

//     // Get all unique categories from products
//     const allCategories = [...new Set(products.map(product => product.category).filter(Boolean))].sort();

//     // Filter products based on search, condition, and category
//     const filteredProducts = products.filter(product => {
//         const matchesSearch = searchTerm === '' ||
//             product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.part_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.manufacturer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.model_number?.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesCondition = filterCondition === 'all' || product.condition === filterCondition;
//         const matchesCategory = filterCategory === 'all' || product.category === filterCategory;

//         return matchesSearch && matchesCondition && matchesCategory;
//     });

//     // Sort products by creation date (newest first)
//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         return new Date(b.created_at) - new Date(a.created_at);
//     });

//     // Calculate pagination
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Go to next page
//     const nextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // Go to previous page
//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Generate page numbers
//     const getPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageButtons = 5;

//         if (totalPages <= maxPageButtons) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
//             let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

//             if (endPage - startPage + 1 < maxPageButtons) {
//                 startPage = Math.max(1, endPage - maxPageButtons + 1);
//             }

//             if (startPage > 1) {
//                 pageNumbers.push(1);
//                 if (startPage > 2) {
//                     pageNumbers.push('...');
//                 }
//             }

//             for (let i = startPage; i <= endPage; i++) {
//                 pageNumbers.push(i);
//             }

//             if (endPage < totalPages) {
//                 if (endPage < totalPages - 1) {
//                     pageNumbers.push('...');
//                 }
//                 pageNumbers.push(totalPages);
//             }
//         }

//         return pageNumbers;
//     };

//     // Get condition badge color
//     const getConditionColor = (condition) => {
//         switch (condition?.toLowerCase()) {
//             case 'new':
//                 return 'bg-green-100 text-green-800 border-green-200';
//             case 'used':
//                 return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'refurbished':
//                 return 'bg-orange-100 text-orange-800 border-orange-200';
//             default:
//                 return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     // Get availability badge color
//     const getAvailabilityColor = (availability) => {
//         if (availability?.toLowerCase().includes('in stock')) {
//             return 'bg-emerald-100 text-emerald-800 border-emerald-200';
//         } else if (availability?.toLowerCase().includes('out of stock')) {
//             return 'bg-red-100 text-red-800 border-red-200';
//         } else {
//             return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     // Get category badge color
//     const getCategoryColor = (category) => {
//         // Generate a consistent color based on category string
//         if (!category) return 'bg-gray-100 text-gray-800 border-gray-200';

//         const colors = [
//             'bg-blue-100 text-blue-800 border-blue-200',
//             'bg-purple-100 text-purple-800 border-purple-200',
//             'bg-indigo-100 text-indigo-800 border-indigo-200',
//             'bg-teal-100 text-teal-800 border-teal-200',
//             'bg-pink-100 text-pink-800 border-pink-200',
//             'bg-cyan-100 text-cyan-800 border-cyan-200',
//             'bg-lime-100 text-lime-800 border-lime-200',
//             'bg-amber-100 text-amber-800 border-amber-200',
//         ];

//         // Create a simple hash from the category string
//         let hash = 0;
//         for (let i = 0; i < category.length; i++) {
//             hash = category.charCodeAt(i) + ((hash << 5) - hash);
//         }

//         const index = Math.abs(hash) % colors.length;
//         return colors[index];
//     };

//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     // Get image URL or placeholder
//     const getImageUrl = (product) => {
//         // 1. Pehle check karein agar product ki khud ki image hai
//         if (product.image) {
//             return `/assets/product/${product.image}`;
//         }

//         // 2. Manufacturer se match karein
//         if (product.manufacturer_name && manufacturers) {
//             const matchedManufacturer = manufacturers.find(
//                 manufacturer => manufacturer.title === product.manufacturer_name
//             );

//             if (matchedManufacturer && matchedManufacturer.image) {
//                 // Manufacturer image ka path adjust karein according to your structure
//                 return `/assets/manufacturer/${matchedManufacturer.image}`;
//             }
//         }


//         return null;
//     };

//     // Get image for display
//     const getDisplayImage = (product) => {
//         const imageUrl = getImageUrl(product);

//         if (imageUrl) {
//             return (
//                 <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
//                     <img
//                         src={imageUrl}
//                         alt={product.product_name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                             // Agar image load nahi hoti to placeholder dikhayein
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
//             <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
//                 <span className="text-2xl text-gray-400">
//                     {product.product_name?.charAt(0) || 'P'}
//                 </span>
//             </div>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//             <AuthenticatedLayout>
//                 <Head title="Products List" />

//                 {/* Breadcrumb */}
//                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-3 px-6">
//                     <div className="max-w-7xl mx-auto flex items-center space-x-2">
//                         <Link href={route('home')} className="hover:text-white transition-colors">Dashboard</Link>
//                         <span>/</span>
//                         <span className="text-white font-semibold">Products</span>
//                     </div>
//                 </div>

//                 {/* Snackbar Component */}
//                 <Snackbar
//                     message={snackbar.message}
//                     type={snackbar.type}
//                     isVisible={snackbar.show}
//                     onClose={handleSnackbarClose}
//                     duration={3000}
//                 />

//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                     {/* Header Section */}
//                     <div className="mb-8">
//                         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//                             <div>
//                                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                                     Product Inventory
//                                 </h1>
//                                 <p className="text-gray-600">
//                                     Manage and track your product catalog
//                                 </p>
//                             </div>
//                             <div className='flex items-center space-x-3'>
//                                 <Link
//                                     href={route('products.addexcel')}
//                                     className="inline-flex items-center px-5 py-2.5 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                     Add Excel File
//                                 </Link>
//                                 <Link
//                                     href={route('products.create')}
//                                     className="inline-flex items-center px-5 py-2.5 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                     Add New Product
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Filters and Search */}
//                         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//                             <div className="flex flex-col md:flex-row gap-4">
//                                 {/* Search Bar */}
//                                 <div className="flex-1">
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                             </svg>
//                                         </div>
//                                         <input
//                                             type="text"
//                                             placeholder="Search products by name, category, part number, manufacturer, or model..."
//                                             className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm"
//                                             value={searchTerm}
//                                             onChange={(e) => {
//                                                 setSearchTerm(e.target.value);
//                                                 setCurrentPage(1);
//                                             }}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Condition Filter */}
//                                 <div className="w-full md:w-48">
//                                     <select
//                                         value={filterCondition}
//                                         onChange={(e) => {
//                                             setFilterCondition(e.target.value);
//                                             setCurrentPage(1);
//                                         }}
//                                         className="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm"
//                                     >
//                                         <option value="all">All Conditions</option>
//                                         <option value="New">New</option>
//                                         <option value="Used">Used</option>
//                                         <option value="Refurbished">Refurbished</option>
//                                     </select>
//                                 </div>

//                                 {/* Category Filter */}
//                                 <div className="w-full md:w-48">
//                                     <select
//                                         value={filterCategory}
//                                         onChange={(e) => {
//                                             setFilterCategory(e.target.value);
//                                             setCurrentPage(1);
//                                         }}
//                                         className="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm"
//                                     >
//                                         <option value="all">All Categories</option>
//                                         {allCategories.map((category) => (
//                                             <option key={category} value={category}>
//                                                 {category}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Results Count */}
//                             <div className="mt-4 text-sm text-gray-600">
//                                 Showing {currentProducts.length} of {sortedProducts.length} filtered products (Total: {products.length})
//                                 <span className="ml-4 text-xs text-gray-500">
//                                     Page {currentPage} of {totalPages}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Products Grid/Table View Toggle */}
//                     <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-8">
//                         {currentProducts.length > 0 ? (
//                             <>
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead>
//                                             <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//                                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                                                     Product Details
//                                                 </th>
//                                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                                                     Manufacturer & Category
//                                                 </th>
//                                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                                                     Price & Stock
//                                                 </th>
//                                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                                                     Identification
//                                                 </th>
//                                                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                                                     Actions
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-gray-100">
//                                             {currentProducts.map((product) => {
//                                                 return (
//                                                     <tr
//                                                         key={product.id}
//                                                         className="hover:bg-gray-50 transition-colors duration-200 group"
//                                                     >
//                                                         {/* Product Details */}
//                                                         <td className="px-6 py-5">
//                                                             <div className="flex items-start space-x-4">
//                                                                 <div className="flex-shrink-0">
//                                                                     {getDisplayImage(product)}
//                                                                 </div>
//                                                                 <div className="flex-1 min-w-0">
//                                                                     <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-1">
//                                                                         {product.product_name || 'Unnamed Product'}
//                                                                     </h3>
//                                                                     <p className="text-sm text-gray-600 line-clamp-2">
//                                                                         {product.description || 'No description available'}
//                                                                     </p>
//                                                                     <div className="flex flex-wrap gap-2 mt-2">
//                                                                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(product.condition)}`}>
//                                                                             {product.condition || 'N/A'}
//                                                                         </span>
//                                                                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(product.availability)}`}>
//                                                                             {product.availability || 'Stock Unknown'}
//                                                                         </span>
//                                                                     </div>
//                                                                     <div className="text-xs text-gray-400 mt-2">
//                                                                         Added: {formatDate(product.created_at)}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </td>

//                                                         {/* Manufacturer & Category */}
//                                                         <td className="px-6 py-5">
//                                                             <div className="space-y-3">
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Manufacturer
//                                                                     </div>
//                                                                     <div className="text-sm font-medium text-gray-900">
//                                                                         {product.manufacturer_name || 'N/A'}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Category
//                                                                     </div>
//                                                                     {product.category ? (
//                                                                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(product.category)}`}>
//                                                                             {product.category}
//                                                                         </span>
//                                                                     ) : (
//                                                                         <span className="text-sm text-gray-500">No category</span>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         </td>

//                                                         {/* Price & Stock */}
//                                                         <td className="px-6 py-5">
//                                                             <div className="space-y-3">
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Price
//                                                                     </div>
//                                                                     <div className="text-2xl font-bold text-orange-600">
//                                                                         {formatCurrency(product.product_price)}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Availability
//                                                                     </div>
//                                                                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(product.availability)}`}>
//                                                                         {product.availability || 'Stock Unknown'}
//                                                                     </span>
//                                                                 </div>
//                                                             </div>
//                                                         </td>

//                                                         {/* Identification */}
//                                                         <td className="px-6 py-5">
//                                                             <div className="space-y-3">
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Model Number
//                                                                     </div>
//                                                                     <div className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
//                                                                         {product.model_number || 'N/A'}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div>
//                                                                     <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
//                                                                         Part Number
//                                                                     </div>
//                                                                     <div className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
//                                                                         {product.part_number || 'N/A'}
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </td>

//                                                         {/* Actions */}
//                                                         <td className="px-6 py-5">
//                                                             <div className="flex flex-col space-y-2">
//                                                                 <Link
//                                                                     href={route('products.edit', product.id)}
//                                                                     className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-colors hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//                                                                 >
//                                                                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                                                     </svg>
//                                                                     Edit
//                                                                 </Link>
//                                                                 <button
//                                                                     onClick={() => {
//                                                                         setProductToDelete(product);
//                                                                         setShowModal(true);
//                                                                     }}
//                                                                     disabled={processing}
//                                                                     className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-colors border border-red-300 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                                 >
//                                                                     {processing && productToDelete?.id === product.id ? (
//                                                                         <span className="flex items-center">
//                                                                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                                             </svg>
//                                                                             Deleting...
//                                                                         </span>
//                                                                     ) : (
//                                                                         'Delete'
//                                                                     )}
//                                                                 </button>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 {/* Pagination Controls */}
//                                 {totalPages > 1 && (
//                                     <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
//                                         {/* Page info */}
//                                         <div className="mb-4 md:mb-0">
//                                             <p className="text-sm text-gray-700">
//                                                 Showing{' '}
//                                                 <span className="font-medium">
//                                                     {indexOfFirstProduct + 1}
//                                                 </span>{' '}
//                                                 to{' '}
//                                                 <span className="font-medium">
//                                                     {Math.min(indexOfLastProduct, sortedProducts.length)}
//                                                 </span>{' '}
//                                                 of{' '}
//                                                 <span className="font-medium">{sortedProducts.length}</span>{' '}
//                                                 results
//                                             </p>
//                                         </div>

//                                         {/* Pagination buttons */}
//                                         <div className="flex items-center space-x-2">
//                                             {/* Previous button */}
//                                             <button
//                                                 onClick={prevPage}
//                                                 disabled={currentPage === 1}
//                                                 className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                                                     currentPage === 1
//                                                         ? 'text-gray-400 cursor-not-allowed bg-gray-100'
//                                                         : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
//                                                 }`}
//                                             >
//                                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                                                 </svg>
//                                                 Previous
//                                             </button>

//                                             {/* Page numbers */}
//                                             <div className="hidden sm:flex items-center space-x-1">
//                                                 {getPageNumbers().map((page, index) => (
//                                                     page === '...' ? (
//                                                         <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
//                                                             ...
//                                                         </span>
//                                                     ) : (
//                                                         <button
//                                                             key={page}
//                                                             onClick={() => paginate(page)}
//                                                             className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                                                                 currentPage === page
//                                                                     ? 'bg-orange-600 text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
//                                                                     : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
//                                                             }`}
//                                                         >
//                                                             {page}
//                                                         </button>
//                                                     )
//                                                 ))}
//                                             </div>

//                                             {/* Next button */}
//                                             <button
//                                                 onClick={nextPage}
//                                                 disabled={currentPage === totalPages}
//                                                 className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                                                     currentPage === totalPages
//                                                         ? 'text-gray-400 cursor-not-allowed bg-gray-100'
//                                                         : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
//                                                 }`}
//                                             >
//                                                 Next
//                                                 <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </button>
//                                         </div>

//                                         {/* Page size info */}
//                                         <div className="mt-4 md:mt-0 text-sm text-gray-500">
//                                             <span className="font-medium">{productsPerPage}</span> products per page
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             /* Empty State */
//                             <div className="text-center py-16">
//                                 <div className="max-w-md mx-auto">
//                                     <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
//                                         <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                                         </svg>
//                                     </div>
//                                     <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
//                                     <p className="text-gray-600 mb-6">
//                                         {searchTerm || filterCondition !== 'all' || filterCategory !== 'all'
//                                             ? 'Try adjusting your search or filters'
//                                             : 'Get started by adding your first product'}
//                                     </p>
//                                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                         <Link
//                                             href={route('products.create')}
//                                             className="inline-flex items-center justify-center px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//                                         >
//                                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                             </svg>
//                                             Add First Product
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Summary Stats */}
//                     {currentProducts.length > 0 && (
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                                 <div className="text-2xl font-bold text-gray-900 mb-1">
//                                     {sortedProducts.length}
//                                 </div>
//                                 <div className="text-sm text-gray-600">Total Products</div>
//                             </div>
//                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                                 <div className="text-2xl font-bold text-green-600 mb-1">
//                                     {sortedProducts.filter(p => p.condition?.toLowerCase() === 'new').length}
//                                 </div>
//                                 <div className="text-sm text-gray-600">New Items</div>
//                             </div>
//                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                                 <div className="text-2xl font-bold text-yellow-600 mb-1">
//                                     {sortedProducts.filter(p => p.condition?.toLowerCase() === 'used').length}
//                                 </div>
//                                 <div className="text-sm text-gray-600">Used Items</div>
//                             </div>
//                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                                 <div className="text-2xl font-bold text-orange-600 mb-1">
//                                     {sortedProducts.filter(p => p.condition?.toLowerCase() === 'refurbished').length}
//                                 </div>
//                                 <div className="text-sm text-gray-600">Refurbished</div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </AuthenticatedLayout>

//             {/* Confirmation Modal */}
//             <ConfirmationModal
//                 show={showModal}
//                 title="Confirm Product Deletion"
//                 message="Are you sure you want to delete this product? This action cannot be undone and will remove all associated data."
//                 onConfirm={handleDeleteOptimized}
//                 onCancel={() => {
//                     setShowModal(false);
//                     setProductToDelete(null);
//                 }}
//                 processing={processing}
//             />

//             <Footer />
//         </div>
//     );
// }




import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import ConfirmationModal from '@/Components/ConfirmationModal';
import Snackbar from '@/Components/Snackbar';

export default function ShowProduct() {
    const {
        products: initialProducts,
        manufacturers,
        totalProducts: initialTotalProducts,
        searchTerm: initialSearchTerm
    } = usePage().props;

    const [products, setProducts] = useState(initialProducts || []);
    const [totalProducts, setTotalProducts] = useState(initialTotalProducts || 0);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    // Update state when props change
    useEffect(() => {
        setProducts(initialProducts || []);
        setTotalProducts(initialTotalProducts || 0);
        setSearchTerm(initialSearchTerm || '');
    }, [initialProducts, initialTotalProducts, initialSearchTerm]);

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    }

    // Function to search products - SIMPLE AND WORKING
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            router.reload();
            return;
        }

        setLoading(true);
        
        // Simply navigate to products page with search query
        router.visit('/products', {
            method: 'get',
            data: { search: searchTerm },
            preserveState: false,
            preserveScroll: true,
            onFinish: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                setSnackbar({
                    show: true,
                    message: 'Error searching products',
                    type: 'error'
                });
            }
        });
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Reset/Clear search
    const clearSearch = () => {
        setSearchTerm('');
        router.visit('/products', {
            method: 'get',
            preserveState: false,
            preserveScroll: true,
        });
    };

    const handleDeleteOptimized = () => {
        if (!productToDelete) return;

        setShowModal(false);

        destroy(route('products.destroy', productToDelete.id), {
            preserveScroll: false,
            onSuccess: () => {
                setSnackbar({
                    show: true,
                    message: 'Product deleted successfully!',
                    type: 'success'
                });
                // Refresh the page
                router.reload();
            },
            onError: (errors) => {
                setSnackbar({
                    show: true,
                    message: 'Error deleting product!',
                    type: 'error'
                });
            },
        });

        setProductToDelete(null);
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount || amount === 'On Request') return 'On Request';
        if (isNaN(amount)) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(amount));
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get condition badge color
    const getConditionColor = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'new':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'used':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'refurbished':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get availability badge color
    const getAvailabilityColor = (availability) => {
        if (availability?.toLowerCase().includes('in stock')) {
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        } else if (availability?.toLowerCase().includes('out of stock')) {
            return 'bg-red-100 text-red-800 border-red-200';
        } else {
            return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get category badge color
    const getCategoryColor = (category) => {
        if (!category) return 'bg-gray-100 text-gray-800 border-gray-200';

        const colors = [
            'bg-blue-100 text-blue-800 border-blue-200',
            'bg-purple-100 text-purple-800 border-purple-200',
            'bg-indigo-100 text-indigo-800 border-indigo-200',
            'bg-teal-100 text-teal-800 border-teal-200',
            'bg-pink-100 text-pink-800 border-pink-200',
            'bg-cyan-100 text-cyan-800 border-cyan-200',
            'bg-lime-100 text-lime-800 border-lime-200',
            'bg-amber-100 text-amber-800 border-amber-200',
        ];

        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            hash = category.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    // Get image URL or placeholder
    const getImageUrl = (product) => {
        if (product.image) {
            return `/assets/product/${product.image}`;
        }

        if (product.manufacturer_name && manufacturers) {
            const matchedManufacturer = manufacturers.find(
                manufacturer => manufacturer.title === product.manufacturer_name
            );

            if (matchedManufacturer && matchedManufacturer.image) {
                return `/assets/manufacturer/${matchedManufacturer.image}`;
            }
        }

        return null;
    };

    // Get image for display
    const getDisplayImage = (product) => {
        const imageUrl = getImageUrl(product);

        if (imageUrl) {
            return (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={imageUrl}
                        alt={product.product_name}
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
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-2xl text-gray-400">
                    {product.product_name?.charAt(0) || 'P'}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <AuthenticatedLayout>
                <Head title="Products List" />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-3 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href={route('home')} className="hover:text-white transition-colors">Dashboard</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Products</span>
                    </div>
                </div>

                {/* Snackbar Component */}
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    isVisible={snackbar.show}
                    onClose={handleSnackbarClose}
                    duration={3000}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Product Inventory
                                </h1>
                                <p className="text-gray-600">
                                    Manage and track your product catalog
                                </p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <Link
                                    href={route('products.addexcel')}
                                    className="inline-flex items-center px-5 py-2.5 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Excel File
                                </Link>
                                <Link
                                    href={route('products.create')}
                                    className="inline-flex items-center px-5 py-2.5 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Product
                                </Link>
                            </div>
                        </div>

                        {/* Search Bar with Button */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search products by name, category, part number, manufacturer, or model..."
                                            className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSearch}
                                        disabled={loading}
                                        className="px-6 py-2 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-md font-medium transition-colors flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Searching...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                Search
                                            </>
                                        )}
                                    </button>

                                    {searchTerm && (
                                        <button
                                            onClick={clearSearch}
                                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 text-sm text-gray-600">
                                Showing {products?.length || 0} of {totalProducts} products
                                {totalProducts > 100 && (
                                    <span className="ml-2 text-xs text-orange-600">
                                        (Showing first 100 results)
                                    </span>
                                )}
                                {searchTerm && (
                                    <span className="ml-2 text-xs text-blue-600">
                                        Search results for: "{searchTerm}"
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Products Table - Same as before */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-8">
                        {products.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Product Details
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Manufacturer & Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Price & Stock
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Identification
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Actions
                                            </th>
                                         </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-50 transition-colors duration-200 group"
                                            >
                                                {/* Product Details */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0">
                                                            {getDisplayImage(product)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                                                                {product.product_name || 'Unnamed Product'}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                                {product.description || 'No description available'}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(product.condition)}`}>
                                                                    {product.condition || 'N/A'}
                                                                </span>
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(product.availability)}`}>
                                                                    {product.availability || 'Stock Unknown'}
                                                                </span>
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-2">
                                                                Added: {formatDate(product.created_at)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                 </td>

                                                {/* Manufacturer & Category */}
                                                <td className="px-6 py-5">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Manufacturer
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.manufacturer_name || 'N/A'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Category
                                                            </div>
                                                            {product.category ? (
                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(product.category)}`}>
                                                                    {product.category}
                                                                </span>
                                                            ) : (
                                                                <span className="text-sm text-gray-500">No category</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                 </td>

                                                {/* Price & Stock */}
                                                <td className="px-6 py-5">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Price
                                                            </div>
                                                            <div className="text-2xl font-bold text-orange-600">
                                                                {formatCurrency(product.product_price)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Availability
                                                            </div>
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(product.availability)}`}>
                                                                {product.availability || 'Stock Unknown'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                 </td>

                                                {/* Identification */}
                                                <td className="px-6 py-5">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Model Number
                                                            </div>
                                                            <div className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                                                                {product.model_number || 'N/A'}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                                Part Number
                                                            </div>
                                                            <div className="text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                                                                {product.part_number || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                 </td>

                                                {/* Actions */}
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col space-y-2">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md transition-colors hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setProductToDelete(product);
                                                                setShowModal(true);
                                                            }}
                                                            disabled={processing}
                                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-colors border border-red-300 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                 </td>
                                             </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchTerm
                                            ? `No products found matching "${searchTerm}"`
                                            : 'Get started by adding your first product'}
                                    </p>
                                    {searchTerm && (
                                        <button
                                            onClick={clearSearch}
                                            className="inline-flex items-center justify-center px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium shadow-sm hover:shadow transition-colors"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* Confirmation Modal */}
            <ConfirmationModal
                show={showModal}
                title="Confirm Product Deletion"
                message="Are you sure you want to delete this product? This action cannot be undone and will remove all associated data."
                onConfirm={handleDeleteOptimized}
                onCancel={() => {
                    setShowModal(false);
                    setProductToDelete(null);
                }}
                processing={processing}
            />

            <Footer />
        </div>
    );
}