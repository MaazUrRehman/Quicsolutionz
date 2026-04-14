import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import React from 'react';
import { 
    Package, 
    Hash, 
    Tag, 
    Building, 
    DollarSign,
    CheckCircle,
    FileText,
    ArrowLeft
} from 'lucide-react';

export default function ProductRequestQuote({ product }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        fromEmail: '',
        subject: `Quote Request for ${product?.product_name || ''}`,
        message: `I'm interested in purchasing: ${product?.product_name || ''}

Please provide information on:
- Your best price for this item
- Available quantity
- Delivery time to my location
- Payment terms
- Any minimum order quantity requirements

Additional Requirements:`,
        telephone: '',
        // Add product details to form data
        productName: product?.product_name || '',
        manufacturerName: product?.manufacturer_name || '',
        modelNo: product?.model_number || '',
        partNo: product?.part_number || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sendProductRequestQuote'), {  // Changed to sendProductRequestQuote
            preserveScroll: true,
            onSuccess: () => {
                // Clear form fields after successful submission
                setData({
                    fromEmail: '',
                    subject: `Quote Request for ${product?.product_name || ''}`,
                    message: `I'm interested in purchasing: ${product?.product_name || ''}

Please provide information on:
- Your best price for this item
- Available quantity
- Delivery time to my location
- Payment terms
- Any minimum order quantity requirements

Additional Requirements:`,
                    telephone: '',
                    // Keep product details as they're fixed
                    productName: product?.product_name || '',
                    manufacturerName: product?.manufacturer_name || '',
                    modelNo: product?.model_number || '',
                    partNo: product?.part_number || '',
                });
            }
        });
    };

    // Product information cards
    const productInfoCards = [
        {
            title: 'Manufacturer',
            value: product?.manufacturer_name,
            icon: Building,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            title: 'Model Number',
            value: product?.model_number,
            icon: Hash,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Part Number',
            value: product?.part_number,
            icon: Tag,
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            title: 'Price',
            value: product?.product_price ? `$${product.product_price}` : 'N/A',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
    ];

    // Specifications
    const specificationItems = [
        { label: 'Condition', value: product?.condition, icon: CheckCircle },
        { label: 'Availability', value: product?.availability, icon: Package },
    ];

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Request Quote" />
                
                <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <Link 
                                        href={route('product-details', product?.id)}
                                        className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium mb-2"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1" />
                                        Back to Product
                                    </Link>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Request Quote for {product?.product_name}
                                    </h1>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-orange-600">
                                        ${product?.product_price || 'N/A'}
                                    </div>
                                    <p className="text-sm text-gray-500">Product Price</p>
                                </div>
                            </div>
                            <p className="text-lg text-gray-600">
                                Get personalized pricing and additional information for this product
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Product Details */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden sticky top-24">
                                    {/* Product Header */}
                                    <div className="bg-orange-600 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-white">
                                                    Product Details
                                                </h2>
                                                <p className="text-orange-100 text-sm">
                                                    You're requesting a quote for
                                                </p>
                                            </div>
                                            <div className="bg-white rounded-full p-2">
                                                <Package className="w-6 h-6 text-orange-600" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        {/* Product Name */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {product?.product_name}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                {product?.description || 'No description available'}
                                            </p>
                                        </div>

                                        {/* Product Information Cards */}
                                        <div className="space-y-4 mb-6">
                                            {productInfoCards.map((card, index) => (
                                                <div
                                                    key={index}
                                                    className={`${card.bgColor} rounded-lg border border-gray-200 p-4`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-lg ${card.bgColor.replace('50', '100')} mr-3`}>
                                                            <card.icon className={`w-4 h-4 ${card.color}`} />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-medium text-gray-600">{card.title}</span>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {card.value || 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Specifications */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                                Specifications
                                            </h4>
                                            <div className="space-y-3">
                                                {specificationItems.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <item.icon className="w-4 h-4 text-gray-400 mr-2" />
                                                            <span className="text-sm text-gray-600">{item.label}</span>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {item.value || 'N/A'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Warranty & Delivery */}
                                        <div className="border-t border-gray-200 pt-6 mt-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-sm text-gray-600">Warranty</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">30 Days</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600">Delivery Time</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">5-7 Days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Help Tips */}
                                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Tips for Best Results
                                    </h3>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-start">
                                            <span className="text-orange-500 font-bold mr-2">•</span>
                                            Mention your required quantity
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-orange-500 font-bold mr-2">•</span>
                                            Specify delivery timeframe
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-orange-500 font-bold mr-2">•</span>
                                            Include any special requirements
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-orange-500 font-bold mr-2">•</span>
                                            Provide complete contact information
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                                    {/* Form Header */}
                                    <div className="bg-orange-600 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-white">
                                                    Contact Supplier
                                                </h2>
                                                <p className="text-orange-100 text-sm">
                                                    Please fill in your details below
                                                </p>
                                            </div>
                                            <div className="bg-white rounded-full p-2">
                                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Section */}
                                    <form onSubmit={submit} className="p-6 space-y-6">
                                        {/* From Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                From Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.fromEmail}
                                                onChange={e => setData('fromEmail', e.target.value)}
                                                placeholder="Enter your Email ID"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                required
                                            />
                                            {errors.fromEmail && (
                                                <p className="text-red-500 text-sm mt-1">{errors.fromEmail}</p>
                                            )}
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                placeholder="Quote Request"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                required
                                            />
                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                rows={8}
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-vertical"
                                                required
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Telephone */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Telephone *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.telephone}
                                                onChange={e => setData('telephone', e.target.value)}
                                                placeholder="Area - Local Number - Ext"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                                required
                                            />
                                            {errors.telephone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
                                            )}
                                        </div>

                                        {/* Hidden fields for product details */}
                                        <input type="hidden" name="productName" value={data.productName} />
                                        <input type="hidden" name="manufacturerName" value={data.manufacturerName} />
                                        <input type="hidden" name="modelNo" value={data.modelNo} />
                                        <input type="hidden" name="partNo" value={data.partNo} />

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <button 
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processing ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending Request...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                        Send Quote Request
                                                    </span>
                                                )}
                                            </button>
                                        </div>

                                        {/* Success Message */}
                                        {recentlySuccessful && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Quote request sent successfully!
                                            </div>
                                        )}
                                    </form>
                                </div>

                                {/* Additional Information */}
                                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
                                                    <span className="font-bold">1</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Request Sent</h4>
                                                    <p className="text-sm text-gray-600">Your request is sent directly to the supplier</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
                                                    <span className="font-bold">2</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Supplier Response</h4>
                                                    <p className="text-sm text-gray-600">Supplier reviews and responds with quote</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
                                                    <span className="font-bold">3</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Receive Quote</h4>
                                                    <p className="text-sm text-gray-600">Get detailed pricing and terms via email</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
                                                    <span className="font-bold">4</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Place Order</h4>
                                                    <p className="text-sm text-gray-600">Proceed with order if satisfied with quote</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}