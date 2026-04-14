



import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import SnackBar from '@/Components/SnackBar';
import React, { useEffect, useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UpdateManufacturers({ manufacturer }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: manufacturer?.title || '',
        category: manufacturer?.category ?? '',
        image: null,
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const [imagePreview, setImagePreview] = useState(manufacturer?.image ? `/storage/${manufacturer.image}` : null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (manufacturer) {
            setData(prev => ({
                ...prev,
                title: manufacturer.title,
                category: manufacturer.category,
            }));
        }
    }, [manufacturer]);

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
        setImagePreview(null); // Clear preview
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
    e.preventDefault();

    post(route('manufacturers.update', manufacturer.id), {
        forceFormData: true,
        onSuccess: () => {
            setSnackbar({
                show: true,
                message: 'Manufacturer updated successfully!',
                type: 'success'
            });
        },
        onError: () => {
            setSnackbar({
                show: true,
                message: 'Error updating manufacturer!',
                type: 'error'
            });
        },
        preserveScroll: true
    });
};



    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };

    // Category options - same as create form
    const categoryOptions = [
        { value: '', label: 'Select a category' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Computer Hardware', label: 'Computer Hardware' },
        { value: 'Software', label: 'Software' },
        { value: 'Networking', label: 'Networking' },
        { value: 'Peripherals', label: 'Peripherals' },
        { value: 'Components', label: 'Components' },
        { value: 'Storage', label: 'Storage' },
        { value: 'Other', label: 'Other' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title="Edit Manufacturer" />

                <SnackBar
                    message={snackbar.message}
                    type={snackbar.type}
                    isVisible={snackbar.show}
                    onClose={handleSnackbarClose}
                    duration={3000}
                />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-3 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href={route('home')} className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={route('manufacturers.index')} className="hover:text-white transition-colors">Manufacturers</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Edit Manufacturer</span>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-white">
                                        Edit Manufacturer
                                    </h2>
                                    <p className="text-gray-300 text-sm mt-1">Update the details for "{manufacturer?.title}"</p>
                                </div>

                                <form onSubmit={submit} className="p-6 bg-white">
                                    {/* Title Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="title" value="Manufacturer Name *" />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full pl-10"
                                                autoComplete="off"
                                                onChange={(e) => setData('title', e.target.value)}
                                                
                                            />
                                        </div>
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    {/* Category Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="category" value="Category" />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <TextInput
                                                id="category"
                                                name="category"
                                                value={data.category}
                                                className="mt-1 block w-full pl-10"
                                                autoComplete="off"
                                                onChange={(e) => setData('category', e.target.value)}
                                                
                                            />
                                        </div>
                                        <InputError message={errors.category} className="mt-2" />
                                    </div>

                                    {/* Image Upload Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="image" value="Manufacturer Logo/Image" />
                                        
                                        <div className="space-y-4">
                                            {/* Current Image Preview */}
                                            {manufacturer.image && (
                                                <div className="mt-2">
                                                    <p className="text-gray-600 text-sm font-medium mb-2">Current Image:</p>
                                                    <div className="relative w-40 h-40 border-2 border-gray-200 rounded-lg overflow-hidden">
                                                        <img 
                                                            src={`/assets/manufacturer/${manufacturer.image}`} 
                                                            alt="Current manufacturer logo" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-gray-500 text-sm mt-2">
                                                        Leave empty to keep current image. Upload new image to replace.
                                                    </p>
                                                </div>
                                            )}

                                            {/* File Input */}
                                            <div className="relative mt-4">
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
                                                    className="mt-1 block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F37D2F] file:text-white hover:file:bg-[#E56D1F]"
                                                />
                                            </div>

                                            {/* New Image Preview */}
                                            {imagePreview && data.image instanceof File && (
                                                <div className="mt-2">
                                                    <p className="text-gray-600 text-sm font-medium mb-2">New Image Preview:</p>
                                                    <div className="relative w-40 h-40 border-2 border-gray-200 rounded-lg overflow-hidden">
                                                        <img 
                                                            src={imagePreview} 
                                                            alt="New manufacturer logo preview" 
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
                                                Upload a new logo/image to replace the current one. Supported formats: JPG, PNG, GIF. Max size: 5MB.
                                            </p>
                                        </div>
                                        
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                                        <Link
                                            href={route('manufacturers.index')}
                                            className="px-8 py-3.5 text-gray-700 hover:text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md"
                                        >
                                            Cancel
                                        </Link>
                                        <PrimaryButton
                                            onClick={() => setSnackbar({ show: true, message: 'Manufacturer updated successfully!', type: 'success' })}
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
                                                    Updating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Update Manufacturer
                                                </span>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <Footer />
        </div>
    );
}