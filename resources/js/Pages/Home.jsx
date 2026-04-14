// import { useState, useEffect, useCallback, useRef } from 'react';
// import { usePage, router } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import ProductSection from '@/Components/ProductSectionComponent';
// import Footer from '@/Components/Footer';
// import HeroSection from '@/Components/HeroSectionHome';
// import ManufacturersCarousel from '@/Components/ManufacturerCarousel';
// import IntroSection from '@/Components/IntroSection';

// export default function Home({ products: initialProducts, manufacturers, auth }) {
//     const { searchQuery, hasMore: initialHasMore, nextPage: initialNextPage } = usePage().props;
    
//     const [allProducts, setAllProducts] = useState(initialProducts);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [hasMore, setHasMore] = useState(initialHasMore);
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [error, setError] = useState(null);
    
//     const loadingRef = useRef(false);
//     const observerRef = useRef(null);
//     const sentinelRef = useRef(null);

//     // Load more products function
//     const loadMore = useCallback(() => {
//         if (!hasMore || loadingMore || loadingRef.current) return;
        
//         loadingRef.current = true;
//         setLoadingMore(true);
        
//         const nextPageNumber = currentPage + 1;
        
//         router.get('/', 
//             { page: nextPageNumber, search: searchQuery },
//             {
//                 preserveState: true,
//                 preserveScroll: true,
//                 only: ['products', 'hasMore', 'nextPage'],
//                 onSuccess: (response) => {
//                     const newProducts = response.props.products;
//                     const moreAvailable = response.props.hasMore;
                    
//                     setAllProducts(prev => [...prev, ...newProducts]);
//                     setCurrentPage(nextPageNumber);
//                     setHasMore(moreAvailable);
//                     setLoadingMore(false);
//                     loadingRef.current = false;
//                 },
//                 onError: (errors) => {
//                     console.error('Error loading more products:', errors);
//                     setError('Failed to load more products');
//                     setLoadingMore(false);
//                     loadingRef.current = false;
//                 }
//             }
//         );
//     }, [hasMore, loadingMore, currentPage, searchQuery]);

//     // Setup intersection observer for infinite scroll
//     useEffect(() => {
//         if (!hasMore || loadingMore) return;
        
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && hasMore && !loadingMore) {
//                     loadMore();
//                 }
//             },
//             { threshold: 0.1, rootMargin: '100px' }
//         );
        
//         if (sentinelRef.current) {
//             observer.observe(sentinelRef.current);
//         }
        
//         return () => {
//             if (sentinelRef.current) {
//                 observer.unobserve(sentinelRef.current);
//             }
//         };
//     }, [hasMore, loadingMore, loadMore]);

//     // Reset when search query changes
//     useEffect(() => {
//         setAllProducts(initialProducts);
//         setCurrentPage(1);
//         setHasMore(initialHasMore);
//         setLoadingMore(false);
//         loadingRef.current = false;
//         setError(null);
//     }, [searchQuery, initialProducts, initialHasMore]);

//     const uniqueBrands = [...new Set(allProducts
//         .filter(p => p.manufacturer_name && p.manufacturer_name.trim() !== '')
//         .map(p => p.manufacturer_name.trim())
//     )];

//     return (
//         <>
//             <AuthenticatedLayout auth={auth}>
//                 <HeroSection />
                
//                 <ManufacturersCarousel 
//                     manufacturers={uniqueBrands} 
//                     allManufacturers={manufacturers}
//                 />
                
//                 <IntroSection />
                
//                 <ProductSection
//                     products={allProducts}
//                     manufacturers={manufacturers}
//                     searchQuery={searchQuery}
//                     isLoadingMore={loadingMore}
//                 />
                
//                 {/* Sentinel element for infinite scroll */}
//                 {hasMore && (
//                     <div 
//                         ref={sentinelRef}
//                         className="h-10 w-full flex items-center justify-center py-4"
//                     >
//                         {loadingMore && (
//                             <div className="flex items-center space-x-2">
//                                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#F37D2F]"></div>
//                                 <span className="text-sm text-gray-500">Loading more products...</span>
//                             </div>
//                         )}
//                     </div>
//                 )}
                
//                 {/* Error message */}
//                 {error && (
//                     <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
//                         {error}
//                         <button 
//                             onClick={() => setError(null)}
//                             className="ml-2 text-white hover:text-gray-200"
//                         >
//                             ×
//                         </button>
//                     </div>
//                 )}
                
//                 {/* End of products message */}
//                 {!hasMore && allProducts.length > 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                         <p>You've reached the end! No more products to load.</p>
//                         <p className="text-sm mt-1">Total products loaded: {allProducts.length}</p>
//                     </div>
//                 )}
//             </AuthenticatedLayout>
//             <Footer />
//         </>
//     );
// }




import { useState, useEffect, useCallback, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductSection from '@/Components/ProductSectionComponent';
import Footer from '@/Components/Footer';
import HeroSection from '@/Components/HeroSectionHome';
import ManufacturersCarousel from '@/Components/ManufacturerCarousel';
import IntroSection from '@/Components/IntroSection';
import axios from 'axios';

export default function Home({ 
    initialProducts, 
    manufacturers, 
    allManufacturers,
    groupedManufacturers,
    auth,
    searchQuery: initialSearchQuery,
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
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
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
            let url = '/load-more-products';
            let params = { 
                page: nextPageNumber, 
                search: searchQuery 
            };
            
            // If filtering by manufacturer, use different endpoint
            if (selectedManufacturer) {
                url = '/get-products-by-manufacturer';
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
        } else {
            // Apply filter - load products for selected manufacturer
            setIsFiltering(true);
            setSelectedManufacturer(manufacturer);
            setLoadingMore(true);
            
            try {
                const response = await axios.get('/get-products-by-manufacturer', {
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
                let url = '/load-more-products';
                let params = { page: 1, search: searchQuery };
                
                if (selectedManufacturer) {
                    url = '/get-products-by-manufacturer';
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
                <HeroSection />
                
                <ManufacturersCarousel 
                    manufacturers={allManufacturers} 
                    allManufacturers={manufacturers}
                />
                
                <IntroSection />
                
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
                        </p>
                    </div>
                )}
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}