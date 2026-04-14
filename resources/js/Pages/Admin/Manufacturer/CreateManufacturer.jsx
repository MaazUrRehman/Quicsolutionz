// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
// import Footer from '@/Components/Footer';
// import Snackbar from '@/Components/Snackbar';
// import React, { useState } from 'react';

// export default function CreateManufacturers() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         title: '',
//         description: '',
//     });

//     const [snackbar, setSnackbar] = useState({
//         show: false,
//         message: '',
//         type: 'success'
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('description', data.description);

//         post(route('manufacturers.store'), {
//             data: formData,
//             forceFormData: true,
//             preserveScroll: true,
//             preserveState: true, 
//             onSuccess: () => {
//                 reset();
//                 setSnackbar({
//                     show: true,
//                     message: 'Manufacturer created successfully!',
//                     type: 'success'
//                 });
//                 setTimeout(() => {
//                     router.visit(route('manufacturers.index'));
//                 }, 1500);
//             },
//             onError: (errors) => {
//                 console.log('Errors:', errors);
//                 setSnackbar({
//                     show: true,
//                     message: 'Error creating manufacturer!',
//                     type: 'error'
//                 });
//             },
//         });
//     };

//     const handleSnackbarClose = () => {
//         setSnackbar(prev => ({ ...prev, show: false }));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
//             <AuthenticatedLayout>
//                 <Head title="Create Manufacturer" />

//                 {/* Snackbar Component */}
//                 <Snackbar
//                     message={snackbar.message}
//                     type={snackbar.type}
//                     isVisible={snackbar.show}
//                     onClose={handleSnackbarClose}
//                     duration={3000}
//                 />

//                 {/* Breadcrumb */}
//                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-4 px-6">
//                     <div className="max-w-7xl mx-auto flex items-center space-x-2">
//                         <Link href="/" className="hover:text-white transition duration-300">Home</Link>
//                         <span>/</span>
//                         <Link href={route('manufacturers.index')} className="hover:text-white transition duration-300">Manufacturers</Link>
//                         <span>/</span>
//                         <span className="text-white font-semibold">Create Manufacturer</span>
//                     </div>
//                 </div>

//                 <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
//                     <div className="flex justify-center">
//                         <div className="w-full max-w-2xl">
//                             {/* Header */}
//                             <div className="text-center mb-12">
//                                 <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//                                     Create <span className="text-[#F37D2F]">Manufacturer</span>
//                                 </h1>
//                                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                                     Fill in the details below to add a new product manufacturer
//                                 </p>
//                             </div>

//                             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//                                 {/* Form Header */}
//                                 <div className="px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border-b border-gray-200">
//                                     <h2 className="text-2xl font-bold text-white">
//                                         Manufacturer Details
//                                     </h2>
//                                     <p className="text-gray-300 text-sm mt-2">Enter the manufacturer information</p>
//                                 </div>

//                                 {/* Form Body */}
//                                 <form onSubmit={submit} className="p-8 bg-white">
//                                     {/* Title Field */}
//                                     <div className="mb-8">
//                                         <label htmlFor="title" className="block text-gray-800 text-lg font-semibold mb-3">
//                                             Manufacturer Name <span className="text-red-600">*</span>
//                                         </label>
//                                         <div className="relative">
//                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                                                 </svg>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="title"
//                                                 name="title"
//                                                 value={data.title}
//                                                 onChange={(e) => setData('title', e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:border-[#F37D2F] transition-all duration-300 shadow-sm"
//                                                 placeholder="e.g. NVIDIA, Intel, AMD"
//                                                 required
//                                             />
//                                         </div>
//                                         {errors.title && (
//                                             <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
//                                         )}
//                                     </div>

//                                     {/* Description Field */}
//                                     <div className="mb-8">
//                                         <label htmlFor="description" className="block text-gray-800 text-lg font-semibold mb-3">
//                                             Description <span className="text-red-600">*</span>
//                                         </label>
//                                         <div className="relative">
//                                             <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
//                                                 <svg className="h-5 w-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                                                 </svg>
//                                             </div>
//                                             <textarea
//                                                 id="description"
//                                                 name="description"
//                                                 rows="4"
//                                                 value={data.description}
//                                                 onChange={(e) => setData('description', e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:border-[#F37D2F] transition-all duration-300 shadow-sm resize-vertical"
//                                                 placeholder="Describe the manufacturer, their products, or any relevant information..."
//                                                 required
//                                             ></textarea>
//                                         </div>
//                                         {errors.description && (
//                                             <p className="mt-2 text-sm text-red-600 font-medium">{errors.description}</p>
//                                         )}
//                                     </div>

//                                     {/* Form Actions */}
//                                     <div className="flex items-center justify-between pt-8 border-t border-gray-200">
//                                         <Link
//                                             href={route('manufacturers.index')}
//                                             className="px-8 py-3.5 text-gray-700 hover:text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md"
//                                         >
//                                             Cancel
//                                         </Link>
//                                         <button
//                                             onClick={() => setSnackbar({ show: true, message: 'Manufacturer added successfully!', type: 'success' })}
//                                             type="submit"
//                                             disabled={processing}
//                                             className="px-10 py-3.5 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-orange-600 hover:shadow-xl"
//                                         >
//                                             {processing ? (
//                                                 <span className="flex items-center">
//                                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                     </svg>
//                                                     Creating...
//                                                 </span>
//                                             ) : (
//                                                 <span className="flex items-center">
//                                                     <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                     </svg>
//                                                     Create Manufacturer
//                                                 </span>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>

//                             {/* Additional Info */}
//                             <div className="mt-8 text-center">
//                                 <p className="text-gray-600 text-sm">
//                                     Need help? Contact our support team for assistance with manufacturer creation.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </AuthenticatedLayout>

//             <Footer />
//         </div>
//     );
// }
























import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Snackbar from '@/Components/Snackbar';
import React, { useState, useRef } from 'react';

export default function CreateManufacturers() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: '',
        image: null,
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('manufacturers.store'), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
                setSnackbar({
                    show: true,
                    message: 'Manufacturer created successfully!',
                    type: 'success'
                });
                setTimeout(() => {
                    router.visit(route('manufacturers.index'));
                }, 1500);
            },
            onError: (errors) => {
                console.log('Errors:', errors);
                setSnackbar({
                    show: true,
                    message: 'Error creating manufacturer!',
                    type: 'error'
                });
            },
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title="Create Manufacturer" />

                {/* Snackbar Component */}
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    isVisible={snackbar.show}
                    onClose={handleSnackbarClose}
                    duration={3000}
                />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-4 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href="/" className="hover:text-white transition duration-300">Home</Link>
                        <span>/</span>
                        <Link href={route('manufacturers.index')} className="hover:text-white transition duration-300">Manufacturers</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Create Manufacturer</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Create <span className="text-[#F37D2F]">Manufacturer</span>
                                </h1>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Fill in the details below to add a new product manufacturer
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                {/* Form Header */}
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-white">
                                        Manufacturer Details
                                    </h2>
                                    <p className="text-gray-300 text-sm mt-2">Enter the manufacturer information</p>
                                </div>

                                {/* Form Body */}
                                <form onSubmit={submit} className="p-8 bg-white">
                                    {/* Title Field */}
                                    <div className="mb-8">
                                        <label htmlFor="title" className="block text-gray-800 text-lg font-semibold mb-3">
                                            Manufacturer Name <span className="text-red-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:border-[#F37D2F] transition-all duration-300 shadow-sm"
                                                placeholder="e.g. NVIDIA, Intel, AMD"
                                                required
                                            />
                                        </div>
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Category Field */}
                                    <div className="mb-8">
                                        <label htmlFor="category" className="block text-gray-800 text-lg font-semibold mb-3">
                                            Category
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:border-[#F37D2F] transition-all duration-300 shadow-sm"
                                                placeholder="e.g. Cable, Port, USB"
                                            />
                                        </div>
                                        {errors.category && (
                                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.category}</p>
                                        )}
                                    </div>

                                    {/* Image Upload Field */}
                                    <div className="mb-8">
                                        <label htmlFor="image" className="block text-gray-800 text-lg font-semibold mb-3">
                                            Manufacturer Logo/Image <span className="text-red-600">*</span>
                                        </label>

                                        <div className="space-y-4">
                                            {/* File Input */}
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    className="w-full pl-10 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:border-[#F37D2F] transition-all duration-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F37D2F] file:text-white hover:file:bg-[#E56D1F]"
                                                    required={!imagePreview}
                                                />
                                            </div>

                                            {/* Image Preview */}
                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <p className="text-gray-600 text-sm font-medium mb-2">Image Preview:</p>
                                                    <div className="relative w-40 h-40 border-2 border-gray-200 rounded-xl overflow-hidden">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Help Text */}
                                            <p className="text-gray-500 text-sm">
                                                Upload a logo or image representing the manufacturer. Supported formats: JPG, PNG, GIF. Max size: 5MB.
                                            </p>
                                        </div>

                                        {errors.image && (
                                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.image}</p>
                                        )}
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                                        <Link
                                            href={route('manufacturers.index')}
                                            className="px-8 py-3.5 text-gray-700 hover:text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            onClick={() => setSnackbar({ show: true, message: 'Manufacturer added successfully!', type: 'success' })}
                                            type="submit"
                                            disabled={processing}
                                            className="px-10 py-3.5 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-orange-600 hover:shadow-xl"
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Create Manufacturer
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-600 text-sm">
                                    Need help? Contact our support team for assistance with manufacturer creation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <Footer />
        </div>
    );
}