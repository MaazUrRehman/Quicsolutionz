import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Snackbar from '@/Components/Snackbar';
import React, { useState } from 'react';

export default function CreateProduct({ manufacturers }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_name: '',
        manufacturer_name: '',
        category: '',
        product_price: '',
        model_number: '',
        part_number: '',
        availability: '',
        condition: '',
        description: '',
        image: null, // Added image field
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            product_price: data.product_price === '' || data.product_price === null ? 'On Request' : data.product_price,
            description: data.description || null, // Make sure description is null if empty
        };

        // Use post with FormData for file upload
        const formData = new FormData();
        Object.keys(payload).forEach(key => {
            if (payload[key] !== null && payload[key] !== undefined) {
                formData.append(key, payload[key]);
            }
        });

        post(route('products.store'), {
            data: formData,
            preserveScroll: true,
            preserveState: true,
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                reset();
                setSnackbar({
                    show: true,
                    message: 'Product created successfully!',
                    type: 'success'
                });
                setTimeout(() => {
                    router.visit(route('products.index'));
                }, 2000);
            },
            onError: (errors) => {
                console.log('Errors:', errors);
                setSnackbar({
                    show: true,
                    message: 'Error creating product! Please check the form.',
                    type: 'error'
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title="Create Product" />

                {/* Snackbar Component */}
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    isVisible={snackbar.show}
                    onClose={handleSnackbarClose}
                    duration={3000}
                />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-3 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href={route('home')} className="hover:text-white transition-colors">Dashboard</Link>
                        <span>/</span>
                        <Link href={route('products.index')} className="hover:text-white transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Create Product</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Add New Product
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Fill in the product details below. All fields are required except Price, Description, and Image (optional).
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                                {/* Form Header */}
                                <div className="px-6 py-5 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                                    <h2 className="text-xl font-bold text-white">
                                        Product Information
                                    </h2>
                                    <p className="text-gray-300 text-sm mt-1">Enter all required product details</p>
                                </div>

                                {/* Form Body */}
                                <form onSubmit={submit} className="p-6 md:p-8">
                                    <div className="space-y-8">
                                        {/* Basic Information */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Basic Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Product Name */}
                                                <div>
                                                    <label htmlFor="product_name" className="block text-gray-700 font-medium mb-2">
                                                        Product Name <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="product_name"
                                                        name="product_name"
                                                        value={data.product_name}
                                                        onChange={(e) => setData('product_name', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        placeholder="Enter product name"
                                                    />
                                                    {errors.product_name && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.product_name}</p>
                                                    )}
                                                </div>

                                                {/* Manufacturer Name */}
                                                <div>
                                                    <label htmlFor="manufacturer_name" className="block text-gray-700 font-medium mb-2">
                                                        Manufacturer Name <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        id="manufacturer_name"
                                                        name="manufacturer_name"
                                                        value={data.manufacturer_name}
                                                        onChange={(e) => setData('manufacturer_name', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        required
                                                    >
                                                        <option value="">Select Brand</option>
                                                        {manufacturers && manufacturers.map((manufacturer) => (
                                                            <option key={manufacturer.id} value={manufacturer.title}>
                                                                {manufacturer.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.manufacturer_name && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.manufacturer_name}</p>
                                                    )}
                                                </div>

                                                {/* Category - ADDED FIELD */}
                                                <div>
                                                    <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                                                        Category <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="category"
                                                        name="category"
                                                        value={data.category}
                                                        onChange={(e) => setData('category', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        placeholder="Enter product category"
                                                        required
                                                    />
                                                    {errors.category && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.category}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        
                                        {/* Pricing & Stock */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Pricing & Stock Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Product Price */}
                                                <div>
                                                    <label htmlFor="product_price" className="block text-gray-700 font-medium mb-2">
                                                        Price (USD)
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            min="0"
                                                            id="product_price"
                                                            name="product_price"
                                                            value={data.product_price}
                                                            onChange={(e) => setData('product_price', e.target.value)}
                                                            className="w-full pl-8 pr-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">Leave blank to display "On Request" to users.</p>
                                                    {errors.product_price && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.product_price}</p>
                                                    )}
                                                </div>

                                                {/* Availability */}
                                                <div>
                                                    <label htmlFor="availability" className="block text-gray-700 font-medium mb-2">
                                                        Availability <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="availability"
                                                        name="availability"
                                                        value={data.availability}
                                                        onChange={(e) => setData('availability', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        placeholder="Enter product availability"
                                                    />
                                                    {errors.availability && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.availability}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Identification */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Product Identification
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Model Number */}
                                                <div>
                                                    <label htmlFor="model_number" className="block text-gray-700 font-medium mb-2">
                                                        Model Number <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="model_number"
                                                        name="model_number"
                                                        value={data.model_number}
                                                        onChange={(e) => setData('model_number', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        placeholder="Enter model number"
                                                    />
                                                    {errors.model_number && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.model_number}</p>
                                                    )}
                                                </div>

                                                {/* Part Number */}
                                                <div>
                                                    <label htmlFor="part_number" className="block text-gray-700 font-medium mb-2">
                                                        Part Number <span className="text-red-600">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="part_number"
                                                        name="part_number"
                                                        value={data.part_number}
                                                        onChange={(e) => setData('part_number', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        placeholder="Enter part number"
                                                        required
                                                    />
                                                    {errors.part_number && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.part_number}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Product Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Condition */}
                                                <div>
                                                    <label htmlFor="condition" className="block text-gray-700 font-medium mb-2">
                                                        Condition <span className="text-red-600">*</span>
                                                    </label>
                                                    <select
                                                        id="condition"
                                                        name="condition"
                                                        value={data.condition}
                                                        onChange={(e) => setData('condition', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm"
                                                        required
                                                    >
                                                        <option value="">Select Condition</option>
                                                        <option value="Used">Used</option>
                                                        <option value="Refurbished">Refurbished</option>
                                                        <option value="New">New</option>
                                                    </select>
                                                    {errors.condition && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.condition}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Description
                                            </h3>
                                            <div>
                                                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                                    Product Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="4"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-md border-gray-300 focus:border-[#F37D2F] focus:ring-[#F37D2F] shadow-sm resize-vertical"
                                                    placeholder="Describe the product features, specifications, and other relevant information..."
                                                ></textarea>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Optional: Provide detailed information about the product
                                                </p>
                                                {errors.description && (
                                                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.description}</p>
                                                )}
                                            </div>
                                        </div>


                                        {/* Product Image - ADDED FIELD */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                                Product Image
                                            </h3>
                                            <div className="grid grid-cols-1 gap-6">
                                                <div>
                                                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                                                        Product Image
                                                    </label>
                                                    <div className="mt-1 flex items-center">
                                                        <label htmlFor="image" className="cursor-pointer">
                                                            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F37D2F] transition-colors">
                                                                {data.image ? (
                                                                    <div className="p-4 text-center">
                                                                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <p className="mt-2 text-sm text-gray-600">
                                                                            {data.image.name}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 mt-1">
                                                                            Click to change image
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="p-4 text-center">
                                                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <p className="mt-2 text-sm text-gray-600">
                                                                            Click to upload product image
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 mt-1">
                                                                            PNG, JPG, GIF up to 10MB
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <input
                                                                type="file"
                                                                id="image"
                                                                name="image"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Optional: Upload a product image. Supported formats: JPG, PNG, GIF.
                                                    </p>
                                                    {errors.image && (
                                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.image}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
                                        <Link
                                            href={route('products.index')}
                                            className="px-5 py-2.5 text-gray-600 hover:text-gray-900 rounded-md font-medium transition-colors hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
                                        >
                                            Cancel
                                        </Link>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    reset();
                                                    setData('image', null);
                                                }}
                                                className="px-5 py-2.5 text-gray-600 hover:text-gray-900 rounded-md font-medium transition-colors hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
                                            >
                                                Reset Form
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSnackbar({ show: true, message: 'Product added successfully!', type: 'success' });
                                                }}
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-2.5 bg-gradient-to-r from-[#F37D2F] to-[#FF9C4D] hover:from-[#E56D1F] hover:to-[#FF8B3D] text-white rounded-md font-medium shadow-sm hover:shadow transition-colors transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#F37D2F] focus:ring-offset-2"
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
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                        Create Product
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Form Guidelines */}
                            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Form Guidelines
                                </h3>
                                <ul className="space-y-2 text-sm text-orange-700">
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        All fields marked with <span className="text-red-600 font-medium">*</span> are required
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Provide accurate model and part numbers for proper identification
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Price, Description, and Image fields are optional
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Leave price blank to display "On Request"
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Supported image formats: JPG, PNG, GIF (max 10MB)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <Footer />
        </div>
    );
}