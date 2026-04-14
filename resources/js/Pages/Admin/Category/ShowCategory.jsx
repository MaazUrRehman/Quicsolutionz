import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function ShowCategories() {
    const { products } = usePage().props;

    // Process products to get unique categories with their first image
    const uniqueCategories = useMemo(() => {
        const categoryMap = new Map();
        
        products.forEach(product => {
            if (product.category) {
                if (!categoryMap.has(product.category)) {
                    // Store the first product's image for this category
                    categoryMap.set(product.category, {
                        category: product.category,
                        image: product.image || null,
                        productId: product.id // Store product id for reference if needed
                    });
                }
            }
        });

        return Array.from(categoryMap.values());
    }, [products]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
            <AuthenticatedLayout>
                <Head title="Product Categories" />

                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 text-sm py-4 px-6">
                    <div className="max-w-7xl mx-auto flex items-center space-x-2">
                        <Link href="/" className="hover:text-white transition duration-300">Home</Link>
                        <span>/</span>
                        <span className="text-white font-semibold">Product Categories</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Product <span className="text-[#F37D2F]">Categories</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Browse all product categories with their representative images
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                        <table className="w-full table-auto text-sm text-center text-gray-800">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-800 via-gray-900 to-black">
                                    <th className="px-6 py-5 text-white font-bold text-lg">Image</th>
                                    <th className="px-6 py-5 text-white font-bold text-lg">Category</th>
                                    <th className="px-6 py-5 text-white font-bold text-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueCategories.map((categoryItem) => (
                                    <tr
                                        key={categoryItem.category}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center">
                                                {categoryItem.image ? (
                                                    <div className="w-20 h-20 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                                                        <img 
                                                            src={`/assets/product/${categoryItem.image}`} 
                                                            alt={categoryItem.category}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 rounded-xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-900 text-lg group-hover:text-[#F37D2F] transition-colors duration-300">
                                                    {categoryItem.category}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 space-x-3">
                                            <Link
                                                href={route('products.categories.edit', { category: categoryItem.category })}
                                                className="inline-flex items-center px-6 py-2.5 text-gray-700 hover:text-[#F37D2F] hover:border-[#F37D2F] hover:bg-orange-50 rounded-xl text-sm font-semibold transition-all duration-300 border border-gray-300 shadow-sm hover:shadow-md"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Category Image
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {uniqueCategories.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
                                <div className="text-6xl mb-4">📂</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                                <p className="text-gray-600 mb-6">No products with categories available yet</p>
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
            <Footer />
        </div>
    );
}