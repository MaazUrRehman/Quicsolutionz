// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, Link, usePage } from '@inertiajs/react';
// import Footer from '@/Components/Footer';
// import React from 'react';
// import ProductSection from '@/Components/ProductSectionComponent';

// export default function Products({ products, searchQuery = '' }) { // ✅ Destructure props
    
//     return (
//         <>
//             <AuthenticatedLayout>
//                 <Head title="Products - All Brands" />
//                 {/* Product Section Component */}
//                 <ProductSection
//                     products={products} // ✅ Products array pass kar rahe
//                     searchQuery={searchQuery}
//                 />
//             </AuthenticatedLayout>
//             <Footer />
//         </>
//     );
// }




// Pages/Products.jsx
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import ProductSection from '@/Components/ProductSectionComponent';
// import Footer from '@/Components/Footer';

// export default function Products({ auth, products, searchQuery, manufacturer, manufacturers }) {
//     return (
//         <>
//             <AuthenticatedLayout auth={auth} >
//                 <Head title="Products" />
//                 <ProductSection 
//                     products={products}
//                     searchQuery={searchQuery}
//                     manufacturer={manufacturer}
//                     manufacturers={manufacturers}
//                 />
//             </AuthenticatedLayout>
//             <Footer />
//         </>
//     );
// }











// Pages/Products.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductSection from '@/Components/ProductSectionComponent';
import Footer from '@/Components/Footer';
import axios from 'axios';

export default function Products({ 
    auth, 
    initialProducts, 
    manufacturers, 
    allManufacturers,
    groupedManufacturers,
    searchQuery: initialSearchQuery,
    manufacturer: initialManufacturer,
    hasMore: initialHasMore,
    nextPage: initialNextPage,
    totalProductsCount
}) {
    const { searchQuery = '' } = usePage().props;
    
    const [allProducts, setAllProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(initialManufacturer || null);
    const [isFiltering, setIsFiltering] = useState(false);
    const [manufacturerTotalCount, setManufacturerTotalCount] = useState(null);
    
    const loadingRef = useRef(false);
    const sentinelRef = useRef(null);

    // Load more products function (for infinite scroll)
    const loadMore = useCallback(async () => {
        if (!hasMore || loadingMore || loadingRef.current || isFiltering) return;
        
        loadingRef.current = true;
        setLoadingMore(true);
        
        try {
            const nextPageNumber = currentPage + 1;
            let url = '/load-more-products-products';
            let params = { 
                page: nextPageNumber, 
                search: searchQuery 
            };
            
            // If filtering by manufacturer, use different endpoint
            if (selectedManufacturer) {
                url = '/get-products-by-manufacturer-products';
                params = {
                    page: nextPageNumber,
                    manufacturer: selectedManufacturer,
                    search: searchQuery
                };
            }
            
            const response = await axios.get(url, { params });
            
            const newProducts = response.data.products;
            const moreAvailable = response.data.hasMore;
            
            setAllProducts(prev => [...prev, ...newProducts]);
            setCurrentPage(nextPageNumber);
            setHasMore(moreAvailable);
            
            if (selectedManufacturer && response.data.totalCount) {
                setManufacturerTotalCount(response.data.totalCount);
            }
        } catch (err) {
            console.error('Error loading more products:', err);
            setError('Failed to load more products');
        } finally {
            setLoadingMore(false);
            loadingRef.current = false;
        }
    }, [hasMore, loadingMore, currentPage, searchQuery, selectedManufacturer, isFiltering]);

    // Filter by manufacturer
    const filterByManufacturer = async (manufacturer) => {
        if (selectedManufacturer === manufacturer) {
            // Clear filter - reset to initial state
            setSelectedManufacturer(null);
            setAllProducts(initialProducts);
            setCurrentPage(1);
            setHasMore(initialHasMore);
            setManufacturerTotalCount(null);
            
            // Update URL without reloading
            window.history.pushState({}, '', route('products-page'));
        } else {
            // Apply filter - load products for selected manufacturer
            setIsFiltering(true);
            setSelectedManufacturer(manufacturer);
            setLoadingMore(true);
            
            try {
                const response = await axios.get('/get-products-by-manufacturer-products', {
                    params: { 
                        manufacturer: manufacturer, 
                        page: 1,
                        search: searchQuery 
                    }
                });
                
                setAllProducts(response.data.products);
                setCurrentPage(1);
                setHasMore(response.data.hasMore);
                setManufacturerTotalCount(response.data.totalCount);
                setError(null);
                
                // Update URL with manufacturer parameter
                window.history.pushState({}, '', route('products-page', { manufacturer: manufacturer, search: searchQuery }));
            } catch (err) {
                console.error('Error filtering products:', err);
                setError('Failed to load products for this manufacturer');
            } finally {
                setIsFiltering(false);
                setLoadingMore(false);
            }
        }
    };

    // Setup intersection observer for infinite scroll
    useEffect(() => {
        if (!hasMore || loadingMore || isFiltering) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore && !isFiltering) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );
        
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }
        
        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [hasMore, loadingMore, loadMore, isFiltering]);

    // Reset when search query changes
    useEffect(() => {
        const resetProducts = async () => {
            setIsFiltering(true);
            try {
                let url = '/load-more-products-products';
                let params = { page: 1, search: searchQuery };
                
                if (selectedManufacturer) {
                    url = '/get-products-by-manufacturer-products';
                    params = {
                        page: 1,
                        manufacturer: selectedManufacturer,
                        search: searchQuery
                    };
                }
                
                const response = await axios.get(url, { params });
                setAllProducts(response.data.products);
                setCurrentPage(1);
                setHasMore(response.data.hasMore);
                
                if (selectedManufacturer && response.data.totalCount) {
                    setManufacturerTotalCount(response.data.totalCount);
                }
            } catch (err) {
                console.error('Error resetting products:', err);
            } finally {
                setIsFiltering(false);
            }
        };
        
        if (searchQuery !== initialSearchQuery) {
            resetProducts();
        }
    }, [searchQuery]);

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Products - All Brands" />
                
                <ProductSection
                    products={allProducts}
                    allManufacturers={allManufacturers}
                    groupedManufacturers={groupedManufacturers}
                    manufacturers={manufacturers}
                    searchQuery={searchQuery}
                    isLoadingMore={loadingMore || isFiltering}
                    selectedManufacturer={selectedManufacturer}
                    onManufacturerFilter={filterByManufacturer}
                    manufacturerTotalCount={manufacturerTotalCount}
                    totalProductsCount={totalProductsCount}
                />
                
                {/* Sentinel element for infinite scroll */}
                {hasMore && !isFiltering && (
                    <div 
                        ref={sentinelRef}
                        className="h-10 w-full flex items-center justify-center py-4"
                    >
                        {loadingMore && (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F37D2F]"></div>
                                <span className="text-sm text-gray-500">Loading more products...</span>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Error message */}
                {error && (
                    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                        {error}
                        <button 
                            onClick={() => setError(null)}
                            className="ml-2 text-white hover:text-gray-200"
                        >
                            ×
                        </button>
                    </div>
                )}
                
                {/* End of products message */}
                {!hasMore && allProducts.length > 0 && !isFiltering && (
                    <div className="text-center py-8 text-gray-500">
                        <p>You've reached the end! No more products to load.</p>
                        <p className="text-sm mt-1">
                            Total products loaded: {allProducts.length}
                            {selectedManufacturer && manufacturerTotalCount && 
                                ` out of ${manufacturerTotalCount} total products from ${selectedManufacturer}`
                            }
                            {!selectedManufacturer && totalProductsCount && 
                                ` out of ${totalProductsCount} total products`
                            }
                        </p>
                    </div>
                )}
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}