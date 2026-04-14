<?php

namespace App\Http\Controllers;
use App\Models\products;
use App\Models\Manufacturer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PagesController extends Controller
{
    // public function homeView(Request $request)
    // {
    //     $manufacturers = Manufacturer::all();
        
    //     // Use cursor for memory-efficient loading
    //     $products = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image')
    //         ->cursor() // Uses generator pattern, memory efficient
    //         ->collect(); // Convert to collection
        
    //     return Inertia::render('Home', [
    //         'products' => $products,
    //         'manufacturers' => $manufacturers,
    //         'searchQuery' => $request->input('search', ''),
    //         'totalProducts' => $products->count(),
    //     ]);
    // }


    public function homeView(Request $request)
    {
        $manufacturers = Manufacturer::all();
        
        // Get ALL unique manufacturer names from Products table (for sidebar)
        $allManufacturersFromProducts = Products::select('manufacturer_name')
            ->whereNotNull('manufacturer_name')
            ->where('manufacturer_name', '!=', '')
            ->distinct()
            ->orderBy('manufacturer_name')
            ->pluck('manufacturer_name')
            ->toArray();
        
        // Group manufacturers by alphabet
        $groupedManufacturers = [];
        $alphabets = range('A', 'Z');
        foreach ($alphabets as $letter) {
            $groupedManufacturers[$letter] = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($letter) {
                return !empty($brand) && strtoupper(substr($brand, 0, 1)) === $letter;
            }));
        }
        
        // Add non-alphabetic brands to '#'
        $nonAlphabetic = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($alphabets) {
            if (empty($brand)) return false;
            $firstChar = strtoupper(substr($brand, 0, 1));
            return !in_array($firstChar, $alphabets);
        }));
        
        if (!empty($nonAlphabetic)) {
            $groupedManufacturers['#'] = $nonAlphabetic;
        }
        
        // Get initial 500 products for display
        $initialProducts = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at')
            ->orderBy('id')
            ->limit(500)
            ->get();
        
        $totalProductsCount = Products::count();
        
        return Inertia::render('Home', [
            'initialProducts' => $initialProducts,
            'manufacturers' => $manufacturers,
            'allManufacturers' => $allManufacturersFromProducts,
            'groupedManufacturers' => $groupedManufacturers,
            'searchQuery' => $request->input('search', ''),
            'hasMore' => $totalProductsCount > 500,
            'nextPage' => 2,
            'totalProductsCount' => $totalProductsCount,
        ]);
    }
    
    // Load more products for infinite scroll
    public function loadMoreProducts(Request $request)
    {
        $page = $request->input('page', 2);
        $perPage = 500;
        $searchQuery = $request->input('search', '');
        $manufacturer = $request->input('manufacturer', '');
        
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at');
        
        // Apply manufacturer filter if specified
        if (!empty($manufacturer)) {
            $query->where('manufacturer_name', $manufacturer);
        }
        
        // Apply search if needed
        if (!empty($searchQuery)) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('product_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('manufacturer_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('part_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('category', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        $products = $query->orderBy('id')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
        
        $totalProducts = $query->count();
        $hasMore = ($page * $perPage) < $totalProducts;
        
        return response()->json([
            'products' => $products,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'totalCount' => $totalProducts,
        ]);
    }
    
    // Get products by manufacturer (with pagination support)
    public function getProductsByManufacturer(Request $request)
    {
        $manufacturer = $request->input('manufacturer');
        $page = $request->input('page', 1);
        $perPage = 500;
        $searchQuery = $request->input('search', '');
        
        if (empty($manufacturer)) {
            return response()->json(['error' => 'Manufacturer is required'], 400);
        }
        
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at')
            ->where('manufacturer_name', $manufacturer);
        
        // Apply search if needed
        if (!empty($searchQuery)) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('product_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('part_number', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        $products = $query->orderBy('id')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
        
        $totalProducts = $query->count();
        $hasMore = ($page * $perPage) < $totalProducts;
        
        return response()->json([
            'products' => $products,
            'manufacturer' => $manufacturer,
            'totalCount' => $totalProducts,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'currentPage' => $page,
        ]);
    }





    
    


    // public function productsView(Request $request)
    // {
    //     // Get search query from request
    //     $searchQuery = $request->input('search', '');
        
    //     // Get manufacturer filter from request
    //     $manufacturer = $request->input('manufacturer', '');
        
    //     // Build query with filters
    //     $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image');
        
    //     // Apply search filter if exists
    //     if (!empty($searchQuery)) {
    //         $query->where(function($q) use ($searchQuery) {
    //             $q->where('product_name', 'LIKE', "%{$searchQuery}%")
    //               ->orWhere('manufacturer_name', 'LIKE', "%{$searchQuery}%")
    //               ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
    //               ->orWhere('part_number', 'LIKE', "%{$searchQuery}%")
    //               ->orWhere('description', 'LIKE', "%{$searchQuery}%")
    //               ->orWhere('category', 'LIKE', "%{$searchQuery}%");
    //         });
    //     }
        
    //     // Apply manufacturer filter if exists
    //     if (!empty($manufacturer)) {
    //         $query->where('manufacturer_name', 'LIKE', "%{$manufacturer}%");
    //     }
        
    //     // Use cursor for memory-efficient loading
    //     $products = $query->cursor()->collect();
        
    //     $manufacturers = Manufacturer::all();
        
    //     return Inertia::render('Products', [
    //         'products' => $products,
    //         'searchQuery' => $searchQuery,
    //         'manufacturer' => $manufacturer,
    //         'manufacturers' => $manufacturers,
    //         'totalProducts' => $products->count(),
    //     ]);
    // }





















    public function productsView(Request $request)
    {
        // Get search query and manufacturer filter from request
        $searchQuery = $request->input('search', '');
        $manufacturer = $request->input('manufacturer', '');
        
        // Get all manufacturers for sidebar (from Manufacturers table)
        $manufacturers = Manufacturer::all();
        
        // Get ALL unique manufacturer names from Products table (for sidebar filtering)
        $allManufacturersQuery = Products::select('manufacturer_name')
            ->whereNotNull('manufacturer_name')
            ->where('manufacturer_name', '!=', '');
        
        // Apply search to manufacturer list if needed
        if (!empty($searchQuery)) {
            $allManufacturersQuery->where(function($q) use ($searchQuery) {
                $q->where('manufacturer_name', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        $allManufacturersFromProducts = $allManufacturersQuery
            ->distinct()
            ->orderBy('manufacturer_name')
            ->pluck('manufacturer_name')
            ->toArray();
        
        // Group manufacturers by alphabet
        $groupedManufacturers = [];
        $alphabets = range('A', 'Z');
        foreach ($alphabets as $letter) {
            $groupedManufacturers[$letter] = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($letter) {
                return !empty($brand) && strtoupper(substr($brand, 0, 1)) === $letter;
            }));
        }
        
        // Add non-alphabetic brands to '#'
        $nonAlphabetic = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($alphabets) {
            if (empty($brand)) return false;
            $firstChar = strtoupper(substr($brand, 0, 1));
            return !in_array($firstChar, $alphabets);
        }));
        
        if (!empty($nonAlphabetic)) {
            $groupedManufacturers['#'] = $nonAlphabetic;
        }
        
        // Build query for initial products
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at');
        
        // Apply search filter if exists
        if (!empty($searchQuery)) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('product_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('manufacturer_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('part_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('description', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('category', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        // Apply manufacturer filter if exists
        if (!empty($manufacturer)) {
            $query->where('manufacturer_name', $manufacturer);
        }
        
        // Get total count for pagination info
        $totalProductsCount = $query->count();
        
        // Get initial 500 products only
        $initialProducts = $query->orderBy('id')
            ->limit(500)
            ->get();
        
        $hasMore = $totalProductsCount > 500;
        
        return Inertia::render('Products', [
            'initialProducts' => $initialProducts,
            'manufacturers' => $manufacturers,
            'allManufacturers' => $allManufacturersFromProducts,
            'groupedManufacturers' => $groupedManufacturers,
            'searchQuery' => $searchQuery,
            'manufacturer' => $manufacturer,
            'hasMore' => $hasMore,
            'nextPage' => 2,
            'totalProductsCount' => $totalProductsCount,
        ]);
    }
    
    // Load more products for products page
    public function loadMoreProductsForProducts(Request $request)
    {
        $page = $request->input('page', 2);
        $perPage = 500;
        $searchQuery = $request->input('search', '');
        $manufacturer = $request->input('manufacturer', '');
        
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at');
        
        // Apply search filter if exists
        if (!empty($searchQuery)) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('product_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('manufacturer_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('part_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('description', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('category', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        // Apply manufacturer filter if exists
        if (!empty($manufacturer)) {
            $query->where('manufacturer_name', $manufacturer);
        }
        
        $products = $query->orderBy('id')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
        
        $totalProducts = $query->count();
        $hasMore = ($page * $perPage) < $totalProducts;
        
        return response()->json([
            'products' => $products,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'totalCount' => $totalProducts,
        ]);
    }
    
    // Get products by manufacturer for products page
    public function getProductsByManufacturerForProducts(Request $request)
    {
        $manufacturer = $request->input('manufacturer');
        $page = $request->input('page', 1);
        $perPage = 500;
        $searchQuery = $request->input('search', '');
        
        if (empty($manufacturer)) {
            return response()->json(['error' => 'Manufacturer is required'], 400);
        }
        
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image', 'created_at')
            ->where('manufacturer_name', $manufacturer);
        
        // Apply search if needed
        if (!empty($searchQuery)) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('product_name', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('model_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('part_number', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('description', 'LIKE', "%{$searchQuery}%")
                  ->orWhere('category', 'LIKE', "%{$searchQuery}%");
            });
        }
        
        $products = $query->orderBy('id')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
        
        $totalProducts = $query->count();
        $hasMore = ($page * $perPage) < $totalProducts;
        
        return response()->json([
            'products' => $products,
            'manufacturer' => $manufacturer,
            'totalCount' => $totalProducts,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'currentPage' => $page,
        ]);
    }






    public function requestQuoteView()
    {
        return Inertia::render('RequestQuote');
    }

    

    public function requestQuoteForProduct(products $product)
    {
        return Inertia::render('ProductRequestQuote', [
            'product' => $product
        ]);
    }

    public function aboutView()
    {
        return Inertia::render('About');
    }

    // public function productDetailsView($id)
    // {
    //     $product = products::findOrFail($id);
        
    //     // Get ALL products for client-side filtering
    //     $allProducts = products::all();
        
    //     // Get unique manufacturers for filters
    //     $brands = products::select('manufacturer_name')
    //         ->whereNotNull('manufacturer_name')
    //         ->where('manufacturer_name', '!=', '')
    //         ->distinct()
    //         ->get()
    //         ->map(function($item, $key) {
    //             return [
    //                 'id' => $key + 1,
    //                 'name' => $item->manufacturer_name
    //             ];
    //         });
        
    //     // Get manufacturers data for images
    //     $manufacturers = Manufacturer::select('title', 'image')->get();
        
    //     return Inertia::render('ProductDetails', [
    //         'product' => $product,
    //         'allProducts' => $allProducts,
    //         'brands' => $brands,
    //         'manufacturers' => $manufacturers, // Add this line
    //     ]);
    // }






    public function productDetailsView($id)
    {
        $product = Products::findOrFail($id);
        
        // Get manufacturers data for images
        $manufacturers = Manufacturer::select('title', 'image')->get();
        
        // Get ALL unique manufacturer names from Products table (for sidebar)
        // Yeh lightweight query hai - sirf manufacturer names le rahe hain
        $allManufacturersFromProducts = Products::select('manufacturer_name')
            ->whereNotNull('manufacturer_name')
            ->where('manufacturer_name', '!=', '')
            ->distinct()
            ->orderBy('manufacturer_name')
            ->pluck('manufacturer_name')
            ->toArray();
        
        // Get total products count (lightweight count query)
        $totalProductsCount = Products::count();
        
        // Group manufacturers by alphabet for sidebar
        $groupedManufacturers = [];
        $alphabets = range('A', 'Z');
        foreach ($alphabets as $letter) {
            $groupedManufacturers[$letter] = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($letter) {
                return !empty($brand) && strtoupper(substr($brand, 0, 1)) === $letter;
            }));
        }
        
        // Add non-alphabetic brands to '#'
        $nonAlphabetic = array_values(array_filter($allManufacturersFromProducts, function($brand) use ($alphabets) {
            if (empty($brand)) return false;
            $firstChar = strtoupper(substr($brand, 0, 1));
            return !in_array($firstChar, $alphabets);
        }));
        
        if (!empty($nonAlphabetic)) {
            $groupedManufacturers['#'] = $nonAlphabetic;
        }
        
        // Get ONLY products from the same manufacturer (for recommendations)
        // Limited to 6 products initially
        $recommendedProducts = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','image')
            ->where('manufacturer_name', $product->manufacturer_name)
            ->where('id', '!=', $product->id)
            ->limit(6)
            ->get();
        
        // Get total count of same manufacturer products
        $sameManufacturerTotalCount = Products::where('manufacturer_name', $product->manufacturer_name)
            ->where('id', '!=', $product->id)
            ->count();
        
        return Inertia::render('ProductDetails', [
            'product' => $product,
            'manufacturers' => $manufacturers,
            'allManufacturers' => $allManufacturersFromProducts,
            'groupedManufacturers' => $groupedManufacturers,
            'totalProductsCount' => $totalProductsCount,
            'recommendedProducts' => $recommendedProducts,
            'sameManufacturerTotalCount' => $sameManufacturerTotalCount,
        ]);
    }
    
    // API endpoint to load more recommended products (for "View All" functionality)
    public function loadMoreRecommendedProducts(Request $request)
    {
        $manufacturerName = $request->input('manufacturer');
        $excludeId = $request->input('exclude_id');
        $page = $request->input('page', 1);
        $perPage = 12;
        
        $query = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','image')
            ->where('manufacturer_name', $manufacturerName);
        
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        
        $products = $query->orderBy('id')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
        
        $totalCount = $query->count();
        $hasMore = ($page * $perPage) < $totalCount;
        
        return response()->json([
            'products' => $products,
            'hasMore' => $hasMore,
            'nextPage' => $page + 1,
            'totalCount' => $totalCount,
        ]);
    }


    
}
