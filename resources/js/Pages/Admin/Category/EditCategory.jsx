import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import SnackBar from '@/Components/SnackBar';
import React, { useEffect, useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditCategory({ category, products }) {
    // Get the first product with this category to show current image
    const categoryProduct = products.find(p => p.category === category) || {};

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        category: category || '',
        category_image: null, // New field for category image
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const [imagePreview, setImagePreview] = useState(categoryProduct?.image ? `/assets/products/${categoryProduct.image}` : null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (category) {
            setData('category', category);
        }
    }, [category]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('category_image', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeImage = () => {
        setData('category_image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('products.categories.update', { category }), {
            forceFormData: true,
            onSuccess: () => {
                setSnackbar({
                    show: true,
                    message: 'Category image updated successfully!',
                    type: 'success'
                });
            },
            onError: () => {
                setSnackbar({
                    show: true,
                    message: 'Error updating category image!',
                    type: 'error'
                });
            },
            preserveScroll: true
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title={`Edit ${category} Category`} />

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
                        <Link href={route('products.categories.index')} className="hover:text-white transition-colors">Categories</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Edit Category</span>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-white">
                                        Edit Category Image
                                    </h2>
                                    <p className="text-gray-300 text-sm mt-1">Update the image for category: "{category}"</p>
                                </div>

                                <form onSubmit={submit} className="p-6 bg-white">
                                    {/* Category Name (Read-only) */}
                                    <div className="mb-8">
                                        <InputLabel htmlFor="category" value="Category Name" />
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                value={data.category}
                                                readOnly
                                                disabled
                                                className="mt-1 block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-gray-700 font-semibold cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-gray-500 text-sm mt-2">
                                            Category name cannot be changed. Only the image can be updated.
                                        </p>
                                    </div>

                                    {/* Image Upload Field */}
                                    <div className="mb-8">
                                        <InputLabel htmlFor="category_image" value="Category Image *" />
                                        
                                        <div className="space-y-4">
                                            {/* Current Image Preview */}
                                            {categoryProduct.image && (
                                                <div className="mt-2">
                                                    <p className="text-gray-600 text-sm font-medium mb-3">Current Category Image:</p>
                                                    <div className="flex items-center space-x-6">
                                                        <div className="relative w-48 h-48 border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
                                                            <img 
                                                                src={`/assets/product/${categoryProduct.image}`} 
                                                                alt="Current category image" 
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                                                <p className="text-white text-xs">From product: {categoryProduct.name || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-600 text-sm max-w-xs">
                                                            <p className="mb-2">
                                                                This is the first image found for this category from your products.
                                                            </p>
                                                            <p>
                                                                Upload a new image to set a custom category image that will be used for display purposes.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* File Input for New Image */}
                                            <div className="relative mt-6">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="file"
                                                    id="category_image"
                                                    name="category_image"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    required
                                                    className="mt-1 block w-full pl-12 pr-4 py-3.5 border-2 border-dashed border-gray-300 rounded-lg shadow-sm focus:border-[#F37D2F] focus:ring-[#F37D2F] file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-[#F37D2F] file:to-[#FF9C4D] file:text-white hover:file:from-[#E56D1F] hover:file:to-[#FF8B3D] transition-all duration-300"
                                                />
                                            </div>

                                            {/* New Image Preview */}
                                            {imagePreview && data.category_image instanceof File && (
                                                <div className="mt-4">
                                                    <p className="text-gray-600 text-sm font-medium mb-3">New Image Preview:</p>
                                                    <div className="flex items-center space-x-6">
                                                        <div className="relative w-48 h-48 border-2 border-[#F37D2F] rounded-xl overflow-hidden shadow-lg">
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="New category image preview" 
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={removeImage}
                                                                className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300 shadow-md"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="text-green-600 text-sm max-w-xs">
                                                            <p className="font-semibold mb-1">Ready to update!</p>
                                                            <p>This image will replace the current category image.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Help Text */}
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                                <p className="text-blue-800 text-sm">
                                                    <span className="font-semibold">Note:</span> Uploading a new image will set a custom category image. 
                                                    This image will be used for display purposes and will not affect individual product images.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <InputError message={errors.category_image} className="mt-2" />
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                                        <Link
                                            href={route('products.categories.index')}
                                            className="px-8 py-3.5 text-gray-700 hover:text-gray-900 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md"
                                        >
                                            Cancel
                                        </Link>
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing || !data.category_image}
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    Update Category Image
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