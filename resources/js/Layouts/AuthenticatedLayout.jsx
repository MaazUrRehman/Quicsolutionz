import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = user?.email === 'support@quicsol.com';

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);

    // Get current path
    const currentPath = window.location.pathname;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Close search suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchSuggestions(false);
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper function to check if a route is active
    const isActive = (href, patterns) => {
        if (!currentPath) return false;

        // If patterns array is provided, check each pattern
        if (patterns) {
            return patterns.some(pattern => currentPath.includes(pattern));
        }

        // If href is provided, check if current path matches href
        if (href) {
            const routePath = new URL(href, window.location.origin).pathname;
            return currentPath === routePath || currentPath.startsWith(routePath + '/');
        }

        return false;
    };

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to products page with search query
            router.get('/products-page', { search: searchQuery.trim() });
            setShowSearchSuggestions(false);
            setIsSearchFocused(false);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setShowSearchSuggestions(false);
    };

    // Get navigation items based on user type
    const getNavItems = () => {
        if (isAdmin) {
            return [
                {
                    name: 'HOME',
                    href: route('home'),
                    active: isActive(route('home'))
                },
                {
                    name: 'MANUFACTURERS',
                    href: route('manufacturers.index'),
                    active: isActive(null, ['manufacturers']),
                },
                {
                    name: 'CATEGORIES',
                    href: route('products.categories.index'),
                    active: isActive(null, ['categories']),
                },
                {
                    name: 'PRODUCTS',
                    href: route('products.index'),
                    active: isActive(null, ['products']),
                },
            ];
        }

        // For regular users or non-logged in users
        return [
            {
                name: 'HOME',
                href: route('home'),
                active: currentPath === '/' || currentPath === '/home' || currentPath === ''
            },
            {
                name: 'ABOUT US',
                href: route('aboutus'),
                active: isActive(null, ['aboutus', 'about'])
            },
            {
                name: 'PRODUCTS',
                href: route('products-page'),
                active: isActive(null, ['products'])
            },
            {
                name: 'REQUEST QUOTE',
                href: route('requestquote'),
                active: isActive(null, ['quote', 'requestquote'])
            },
        ];
    };

    const navItems = getNavItems();

    return (
        <div className="min-h-screen bg-[#F7F7F7]">
            {/* Navigation with Orange Accents */}
            <nav className="bg-[#F7F7F7] border-b border-gray-200 shadow-lg">
                {/* Top Row - Search Bar and Contact Info */}
                <div className="bg-[#F7F7F7] py-3 px-4">
                    <div className="mx-auto w-[75%] px-8 flex flex-col md:flex-row md:items-center md:justify-between">
                        {/* Logo - Left most */}
                        <div className="flex-shrink-0">
                            <Link href={route('home')}>
                                <ApplicationLogo className="block h-14 w-auto text-gray-800" />
                            </Link>
                        </div>

                        {/* Right side container - User actions and Search */}
                        <div className="flex items-center justify-end space-x-4 md:space-x-6">
                            {/* Search Bar - Second (with space) */}
                            <div className="relative w-full md:w-80 lg:w-96" ref={searchRef}>
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => {
                                            setIsSearchFocused(true);
                                            setShowSearchSuggestions(true);
                                        }}
                                        placeholder="Search products.."
                                        className="w-full pl-10 pr-12 py-1 rounded-lg border-2 border-[#F37D2F]/30 bg-white text-gray-900 placeholder-gray-500 focus:border-[#F37D2F] focus:ring-2 focus:ring-[#F37D2F] focus:ring-opacity-30 transition-all duration-300 shadow-sm"
                                        aria-label="Search products"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-[#F37D2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={clearSearch}
                                            className="absolute inset-y-0 right-0 pr-10 flex items-center"
                                            aria-label="Clear search"
                                        >
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 h-full bg-[#F37D2F] text-white px-4 rounded-r-lg hover:bg-[#E56D1F] transition-colors font-semibold shadow-sm"
                                        aria-label="Search"
                                    >
                                        Search
                                    </button>
                                </form>

                                {/* Search Suggestions */}
                                {showSearchSuggestions && searchQuery && (
                                    <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                            <span className="text-sm font-semibold text-gray-700">
                                                Press Enter or click Search for "{searchQuery}"
                                            </span>
                                        </div>
                                        <div className="p-2">
                                            <div className="text-xs text-gray-500 px-2 py-1">
                                                Search across all products, brands, and categories
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            
                            {/* User Actions - First */}
                            <div className="flex items-center space-x-1">
                                {!user ? (
                                    <>
                                        <a
                                            href={route('login')}
                                            className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#F37D2F] hover:bg-orange-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-orange-200"
                                            title="Sign In"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                                                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#F37D2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a
                                            href={route('register')}
                                            className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#F37D2F] hover:bg-orange-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-orange-200"
                                            title="Create Account"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                                                <svg className="w-5 h-5 text-gray-500 group-hover:text-[#F37D2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                </svg>
                                            </div>
                                        </a>
                                    </>
                                ) : isAdmin ? (
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-orange-200"
                                        title="Sign Out"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                                            <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                    </ResponsiveNavLink>
                                ) : (
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group border border-transparent hover:border-orange-200"
                                        title="Sign Out"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                                            <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                    </ResponsiveNavLink>
                                )}
                            </div>

                            
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center rounded-xl p-3 text-gray-500 hover:text-[#F37D2F] hover:bg-orange-50 transition duration-300 border border-gray-300 hover:border-orange-200"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Row */}
                <div className=" bg-[#F7F7F7]">
                    <div className="mx-auto w-[70%] sm:px-8 lg:px-40">
                        <div className="flex h-16 justify-between items-center">

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex lg:items-center lg:space-x-1 lg:ml-12">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-5 font-semibold transition-all duration-300 h-14 rounded-md
                                                ${item.active
                                                ? 'text-orange-400  font-montserrat  bg-orange-100 border hover:text-orange-400 border-orange-400'
                                                : 'text-gray-700 font-montserrat hover:text-orange-400 hover:bg-orange-100'
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            {item.name}
                                        </span>
                                    </NavLink>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden ${showingNavigationDropdown ? 'block' : 'hidden'} border-t border-gray-200 bg-white shadow-lg`}>
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <ResponsiveNavLink
                                key={item.name}
                                href={item.href}
                                active={item.active}
                                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#F37D2F] hover:bg-orange-50 rounded-xl transition-all duration-300 border border-transparent hover:border-orange-200"
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.name}</span>
                                    {item.active && (
                                        <span className="w-2 h-2 bg-[#F37D2F] rounded-full animate-pulse"></span>
                                    )}
                                </div>
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    {/* Mobile User Section */}
                    <div className="pt-6 pb-4 border-t border-gray-200">
                        {!user ? (
                            <div className="px-4 space-y-3">
                                <ResponsiveNavLink
                                    href={route('login')}
                                    className="w-full text-center bg-[#F37D2F] text-white hover:bg-[#E56D1F] px-6 py-3 rounded-xl font-bold transition-all duration-300 border border-[#F37D2F] hover:border-[#E56D1F]"
                                >
                                    Sign In
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('register')}
                                    className="w-full text-center border border-gray-300 text-gray-700 hover:text-[#F37D2F] hover:bg-orange-50 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:border-orange-200"
                                >
                                    Create Account
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <>
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#F37D2F] to-[#FF9C4D] rounded-full flex items-center justify-center">
                                            <span className="text-white font-black text-sm">
                                                {isAdmin ? 'A' : user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                {user.email}
                                                {isAdmin && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-2 px-4">
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                        className="block px-4 py-3 text-gray-700 hover:text-[#F37D2F] hover:bg-orange-50 rounded-xl transition-all duration-300"
                                    >
                                        Profile Settings
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300"
                                    >
                                        Sign Out
                                    </ResponsiveNavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-[#F7F7F7] border-b border-gray-200 shadow-sm">
                    <div className="mx-auto max-w-[65%] px-4 py-8 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-black text-gray-900">
                            {header}
                        </h1>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="bg-[#F7F7F7]">
                <div className="min-h-screen p-0 m-0">
                    {children}
                </div>
            </main>
        </div>
    );
}