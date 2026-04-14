// import React, { useState } from 'react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, usePage, Link, useForm, router } from '@inertiajs/react';
// import Footer from '@/Components/Footer';
// import ConfirmationModal from '@/Components/ConfirmationModal';
// import Snackbar from '@/Components/Snackbar';

// export default function ShowManufacturers() {
//     const { manufacturers } = usePage().props;
//     const [showModal, setShowModal] = useState(false);
//     const [manufacturerToDelete, setManufacturerToDelete] = useState(null);
//     const { delete: destroy, processing } = useForm();

//     const [snackbar, setSnackbar] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const handleSnackbarClose = () => {
//         setSnackbar(prev => ({ ...prev, show: false }));
//     }

//     const handleDeleteOptimized = () => {
//         if (!manufacturerToDelete) return;
        
//         console.log('Optimized delete called');
        
//         // Immediately close modal and show loading
//         setShowModal(false);
        
//         destroy(route('manufacturers.destroy', manufacturerToDelete.id), {
//             preserveScroll: false,
//             onSuccess: () => {
//                 setSnackbar({
//                     show: true,
//                     message: 'Manufacturer deleted successfully!',
//                     type: 'success'
//                 });
//             },
//             onError: (errors) => {
//                 setSnackbar({
//                     show: true,
//                     message: 'Error deleting manufacturer!',
//                     type: 'error'
//                 });
//             },
//         });
        
//         setManufacturerToDelete(null);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
//             <AuthenticatedLayout>
//                 <Head title="Manufacturers List" />

//                 {/* Breadcrumb */}
//                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-4 px-6">
//                     <div className="max-w-7xl mx-auto flex items-center space-x-2">
//                         <Link href="/" className="hover:text-white transition duration-300">Home</Link>
//                         <span>/</span>
//                         <span className="text-white font-semibold">Manufacturers</span>
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

//                 <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
//                     {/* Header */}
//                     <div className="text-center mb-12">
//                         <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//                             Product <span className="text-[#F37D2F]">Manufacturers</span>
//                         </h1>
//                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                             Manage your product manufacturers and organize your inventory efficiently
//                         </p>
//                     </div>

//                     {/* Add New Manufacturer Button */}
//                     <div className="flex justify-end mb-4">
//                         <Link
//                             href={route('manufacturers.create')}
//                             className="px-8 py-3.5 bg-[#F37D2F] hover:bg-orange-600 text-white rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-orange-600"
//                         >
//                             <span className="flex items-center">
//                                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                 </svg>
//                                 Add New Manufacturer
//                             </span>
//                         </Link>
//                     </div>

//                     <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
//                         <table className="w-full table-auto text-sm text-center text-gray-800">
//                             <thead>
//                                 <tr className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
//                                     <th className="px-6 py-5 text-white font-bold text-lg">Title</th>
//                                     <th className="px-6 py-5 text-white font-bold text-lg">Description</th>
//                                     <th className="px-6 py-5 text-white font-bold text-lg">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {manufacturers.map((manufacturer) => (
//                                     <tr
//                                         key={manufacturer.id}
//                                         className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
//                                     >
//                                         <td className="px-6 py-5 font-semibold text-gray-900 text-base group-hover:text-[#F37D2F] transition-colors duration-300">
//                                             <div className="flex items-center justify-center">
//                                                 <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                                                 </svg>
//                                                 {manufacturer.title}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-5 max-w-md">
//                                             {manufacturer.description ? (
//                                                 <span className="text-gray-700 text-base leading-relaxed">{manufacturer.description}</span>
//                                             ) : (
//                                                 <span className="text-gray-400 italic text-base">No description provided</span>
//                                             )}
//                                         </td>
//                                         <td className="px-6 py-5 space-x-3">
//                                             <Link
//                                                 href={route('manufacturers.edit', manufacturer.id)}
//                                                 className="inline-flex items-center px-6 py-2.5 text-gray-700 hover:text-[#F37D2F] hover:border-[#F37D2F] hover:bg-orange-50 rounded-xl text-sm font-semibold transition-all duration-300 border border-gray-300 shadow-sm hover:shadow-md"
//                                             >
//                                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                                 </svg>
//                                                 Edit
//                                             </Link>
//                                             <button
//                                                 onClick={() => {
//                                                     setManufacturerToDelete(manufacturer);
//                                                     setShowModal(true);
//                                                 }}
//                                                 disabled={processing}
//                                                 className="inline-flex items-center px-6 py-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-md border border-red-300 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                                             >
//                                                 {processing && manufacturerToDelete?.id === manufacturer.id ? (
//                                                     <span className="flex items-center">
//                                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                         </svg>
//                                                         Deleting...
//                                                     </span>
//                                                 ) : (
//                                                     <>
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                                         </svg>
//                                                         Delete
//                                                     </>
//                                                 )}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

                    

//                     {/* Empty State */}
//                     {manufacturers.length === 0 && (
//                         <div className="text-center py-12">
//                             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
//                                 <div className="text-6xl mb-4">🏭</div>
//                                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No Manufacturers Found</h3>
//                                 <p className="text-gray-600 mb-6">Get started by creating your first product manufacturer</p>
//                                 <Link
//                                     href={route('manufacturers.create')}
//                                     className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
//                                 >
//                                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                     </svg>
//                                     Create First Manufacturer
//                                 </Link>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </AuthenticatedLayout>
            
//             <ConfirmationModal
//                 show={showModal}
//                 title="Confirm Deletion"
//                 message="Are you sure you want to delete this manufacturer? This action cannot be undone."
//                 onConfirm={handleDeleteOptimized}
//                 onCancel={() => {
//                     setShowModal(false);
//                     setManufacturerToDelete(null);
//                 }}
//                 processing={processing}
//             />
            
//             <Footer />
//         </div>
//     );
// }




import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import ConfirmationModal from '@/Components/ConfirmationModal';
import Snackbar from '@/Components/Snackbar';

export default function ShowManufacturers() {
    const { manufacturers } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [manufacturerToDelete, setManufacturerToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    }

    const handleDeleteOptimized = () => {
        if (!manufacturerToDelete) return;
        
        console.log('Optimized delete called');
        
        // Immediately close modal and show loading
        setShowModal(false);
        
        destroy(route('manufacturers.destroy', manufacturerToDelete.id), {
            preserveScroll: false,
            onSuccess: () => {
                setSnackbar({
                    show: true,
                    message: 'Manufacturer deleted successfully!',
                    type: 'success'
                });
            },
            onError: (errors) => {
                setSnackbar({
                    show: true,
                    message: 'Error deleting manufacturer!',
                    type: 'error'
                });
            },
        });
        
        setManufacturerToDelete(null);
    };

    // Category badge color mapping
    const getCategoryColor = (category) => {
        const colors = {
            'Electronics': 'bg-blue-100 text-blue-800',
            'Computer Hardware': 'bg-purple-100 text-purple-800',
            'Software': 'bg-green-100 text-green-800',
            'Networking': 'bg-indigo-100 text-indigo-800',
            'Peripherals': 'bg-yellow-100 text-yellow-800',
            'Components': 'bg-red-100 text-red-800',
            'Storage': 'bg-teal-100 text-teal-800',
            'Other': 'bg-gray-100 text-gray-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title="Manufacturers List" />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-4 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href="/" className="hover:text-white transition duration-300">Home</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Manufacturers</span>
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

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Product <span className="text-[#F37D2F]">Manufacturers</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Manage your product manufacturers and organize your inventory efficiently
                        </p>
                    </div>

                    {/* Add New Manufacturer Button */}
                    <div className="flex justify-end mb-8">
                        <Link
                            href={route('manufacturers.create')}
                            className="px-8 py-3.5 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-orange-600"
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Manufacturer
                            </span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                        <table className="w-full table-auto text-sm text-center text-gray-800">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                                    <th className="px-6 py-5 text-white font-bold text-lg">Logo</th>
                                    <th className="px-6 py-5 text-white font-bold text-lg">Manufacturer</th>
                                    <th className="px-6 py-5 text-white font-bold text-lg">Category</th>
                                    <th className="px6 py-5 text-white font-bold text-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturers.map((manufacturer) => (
                                    <tr
                                        key={manufacturer.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center">
                                                {manufacturer.image ? (
                                                    <div className="w-16 h-16 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                                                        <img 
                                                            src={`/assets/manufacturer/${manufacturer.image}`} 
                                                            alt={manufacturer.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-900 text-lg group-hover:text-[#F37D2F] transition-colors duration-300">
                                                    {manufacturer.title}
                                                </div>
                                                {manufacturer.description && (
                                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                        {manufacturer.description}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {manufacturer.category ? (
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(manufacturer.category)}`}>
                                                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    {manufacturer.category}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Uncategorized</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 space-x-3">
                                            <Link
                                                href={route('manufacturers.edit', manufacturer.id)}
                                                className="inline-flex items-center px-6 py-2.5 text-gray-700 hover:text-[#F37D2F] hover:border-[#F37D2F] hover:bg-orange-50 rounded-xl text-sm font-semibold transition-all duration-300 border border-gray-300 shadow-sm hover:shadow-md"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setManufacturerToDelete(manufacturer);
                                                    setShowModal(true);
                                                }}
                                                disabled={processing}
                                                className="inline-flex items-center px-6 py-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-md border border-red-300 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processing && manufacturerToDelete?.id === manufacturer.id ? (
                                                    <span className="flex items-center">
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Deleting...
                                                    </span>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {manufacturers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
                                <div className="text-6xl mb-4">🏭</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Manufacturers Found</h3>
                                <p className="text-gray-600 mb-6">Get started by creating your first product manufacturer</p>
                                <Link
                                    href={route('manufacturers.create')}
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create First Manufacturer
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
            
            <ConfirmationModal
                show={showModal}
                title="Confirm Deletion"
                message="Are you sure you want to delete this manufacturer? This action cannot be undone."
                onConfirm={handleDeleteOptimized}
                onCancel={() => {
                    setShowModal(false);
                    setManufacturerToDelete(null);
                }}
                processing={processing}
            />
            
            <Footer />
        </div>
    );
}