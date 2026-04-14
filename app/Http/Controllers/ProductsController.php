<?php

namespace App\Http\Controllers;

use App\Models\products;
use App\Http\Requests\StoreproductsRequest;
use App\Http\Requests\UpdateproductsRequest;
use App\Models\manufacturer;
use Inertia\Inertia;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use Illuminate\Support\Str; 

class ProductsController extends Controller
{
    
    // public function index(Request $request)
    // {
    //     $manufacturers = Manufacturer::all();
    
    //     // Use cursor for memory-efficient loading
    //     $products = Products::select('id','product_name','manufacturer_name','category','product_price','model_number','part_number','availability','condition','description','image')
    //     ->cursor() // Uses generator pattern, memory efficient
    //     ->collect(); // Convert to collection
    
    //     return Inertia::render('Admin/Product/ShowProduct', [
    //         'products' => $products,
    //         'manufacturers' => $manufacturers,
    //         'totalProducts' => $products->count()
    //     ]);
    // }

    public function index(Request $request)
    {
        $manufacturers = Manufacturer::all();
        $searchTerm = $request->input('search', '');
        
        $query = Products::query();
        
        if (!empty($searchTerm)) {
            $query->where(function($q) use ($searchTerm) {
                $q->where('product_name', 'LIKE', "%{$searchTerm}%")
                ->orWhere('manufacturer_name', 'LIKE', "%{$searchTerm}%")
                ->orWhere('model_number', 'LIKE', "%{$searchTerm}%")
                ->orWhere('part_number', 'LIKE', "%{$searchTerm}%")
                ->orWhere('category', 'LIKE', "%{$searchTerm}%")
                ->orWhere('description', 'LIKE', "%{$searchTerm}%");
            });
        }
        
        $totalProducts = $query->count();
        $products = $query->orderBy('created_at', 'desc')
            ->limit(100)
            ->get();
        
        return Inertia::render('Admin/Product/ShowProduct', [
            'products' => $products,
            'manufacturers' => $manufacturers,
            'totalProducts' => $totalProducts,
            'searchTerm' => $searchTerm,
        ]);
    }






   
    
    public function create()
    {
        return Inertia::render('Admin/Product/CreateProduct', [
            'manufacturers' => manufacturer::all(),
        ]);
    }

    
    public function store(StoreproductsRequest $request)
    {
        try{
            $validated = $request->validated();

        if ($request->hasFile('image')) {
                $filename = time() . '_' . $validated['product_name'] . '_' . $validated['category'] . '.' . $request->image->extension();
                $request->image->move(public_path('assets/product'), $filename);
                $validated['image'] = $filename;
            }

        products::create([
            'product_name' => $validated['product_name'],
            'manufacturer_name' => $validated['manufacturer_name'],
            'category' => $validated['category'],
            'product_price' => $validated['product_price'],
            'model_number' => $validated['model_number'],
            'part_number' => $validated['part_number'],
            'availability' => $validated['availability'],
            'condition' => $validated['condition'],
            'description' => $validated['description'],
            'image' => $validated['image'],
        ]);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
        }catch(\Exception $e){
            \Log::error('Error creating product', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            dd($e->getMessage());

            return redirect()->back()
                ->with('error', 'An error occurred while creating the product. Please try again.');
        }
    }

    
    public function show(products $products)
    {
        //
    }


    public function edit(products $product)
    {
        
        return inertia('Admin/Product/UpdateProduct', [
            'product' => $product,
            'manufacturers' => manufacturer::all(),
        ]);
    }

    


    public function update(UpdateproductsRequest $request, products $product)
    {
        
        $validated = $request->validated();

        // Agar new image upload hui hai
        if ($request->boolean('remove_image')) {
            if ($product->image) {
                $oldImagePath = public_path('assets/product/' . $product->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // DB me null set
            $validated['image'] = null;
        }
        
        elseif ($request->hasFile('image')) {

            // New image save
            $imageName = time() . '_' . $validated['product_name'] . '_' . $validated['category'] . '.' . $request->image->extension();
            $request->image->move(public_path('assets/product'), $imageName);

            $validated['image'] = $imageName;
        } 
        else {
            // 🚨 VERY IMPORTANT
            unset($validated['image']); // image ko update se hata do
        }

        $product->update($validated);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product updated successfully');
    }





    public function destroy(products $product)
    {
        if ($product->image && file_exists(public_path('assets/product/' . $product->image))) {
            unlink(public_path('assets/product/' . $product->image));
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }

    public function createExcel()
    {
        return Inertia::render('Admin/Product/AddExcel');
    }

    


   public function import(Request $request)
{
    try {
        set_time_limit(0);
        ini_set('memory_limit', '512M');

        $request->validate([
            'excel_file' => 'required|file|mimes:xlsx,xls,csv|max:10240', // 10MB
        ]);

        $file = $request->file('excel_file');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();

        $highestRow = $sheet->getHighestDataRow();
        $highestColumn = $sheet->getHighestDataColumn();
        $highestColumnIndex = Coordinate::columnIndexFromString($highestColumn);

        $rows = [];

        for ($row = 1; $row <= $highestRow; $row++) {
            $rowData = [];

            for ($col = 1; $col <= $highestColumnIndex; $col++) {
                $cellCoordinate = Coordinate::stringFromColumnIndex($col) . $row;
                $value = $sheet->getCell($cellCoordinate)->getValue();
                $rowData[] = trim((string) $value);
            }

            $rows[] = $rowData;
        }

        if (count($rows) < 2) {
            return back()->with([
                'error' => 'The Excel file is empty or has no data rows.',
                'import_errors' => ['The Excel file is empty or has no data rows.']
            ]);
        }

        // Field mappings (flexible column names)
        $fieldMappings = [
            'product_name' => [
                'product_name', 'product name', 'productname', 'product-name', 'PRODUCT NAME',
                'Product Name', 'Product_Name', 'PRODUCT_NAME', 'product'
            ],
            'manufacturer_name' => [
                'manufacturer_name', 'manufacturer name', 'manufacturername', 'manufacturer', 
                'Manufacturer', 'MANUFACTURER', 'Manufacturer_Name'
            ],
            'category' => [
                'category', 'categories', 'product category', 'product_category', 'Category', 
                'CATEGORY', 'product-category'
            ],
            'product_price' => [
                'product_price', 'product price', 'price', 'Price', 'PRICE', 'product-price',
                'Product_Price', 'PRODUCT PRICE'
            ],
            'model_number' => [
                'model_number', 'model number', 'model', 'model-no', 'model_no', 'Model Number', 
                'MODEL NUMBER', 'MODEL_NUMBER', 'Model'
            ],
            'part_number' => [
                'part_number', 'part number', 'part', 'part-no', 'part_no', 'Part Number', 
                'PART NUMBER', 'PART_NUMBER'
            ],
            'availability' => ['availability', 'available', 'Availability', 'AVAILABILITY'],
            'condition' => ['condition', 'Condition', 'CONDITION'],
            'description' => ['description', 'Description', 'DESCRIPTION'],
            'image' => ['image', 'img', 'Image', 'IMAGE'],
        ];

        $requiredFields = [
            'product_name' => 'Product Name',
            'manufacturer_name' => 'Manufacturer Name',
            'category' => 'Category',
            'condition' => 'Condition',
            'part_number' => 'Part Number'
        ];

        // Map headers
        $header = $rows[0];
        $mappedHeader = [];
        $unmatchedColumns = [];
        
        foreach ($header as $index => $columnName) {
            $originalColumn = $columnName;
            $normalizedColumn = strtolower(trim(preg_replace('/[^a-z0-9]/i', ' ', $columnName)));
            $normalizedColumn = preg_replace('/\s+/', ' ', $normalizedColumn);
            
            $found = false;
            foreach ($fieldMappings as $field => $variations) {
                foreach ($variations as $variation) {
                    $normalizedVariation = strtolower(trim(preg_replace('/[^a-z0-9]/i', ' ', $variation)));
                    $normalizedVariation = preg_replace('/\s+/', ' ', $normalizedVariation);
                    
                    if ($normalizedColumn === $normalizedVariation) {
                        $mappedHeader[] = $field;
                        $found = true;
                        break 2;
                    }
                }
            }
            
            if (!$found) {
                $mappedHeader[] = null;
                $unmatchedColumns[] = $originalColumn;
            }
        }

        // Column mismatch error
        if (!empty($unmatchedColumns)) {
            $errorMessage = 'Unrecognized columns: ' . implode(', ', array_slice($unmatchedColumns, 0, 3));
            if (count($unmatchedColumns) > 3) $errorMessage .= '...';
            $errorMessage .= '. Expected: Product Name, Manufacturer, Category, Condition, Part Number';
            
            return back()->with([
                'error' => $errorMessage,
                'import_errors' => [$errorMessage]
            ]);
        }

        // Filter valid columns only
        $validIndices = [];
        $validHeader = [];
        foreach ($mappedHeader as $index => $field) {
            if ($field !== null) {
                $validIndices[] = $index;
                $validHeader[] = $field;
            }
        }

        $importedCount = 0;
        $errors = [];
        $partNumbers = [];

        for ($i = 1; $i < count($rows); $i++) {
            $rowNumber = $i + 1;
            $rowData = $rows[$i];
            $rowErrors = [];

            // Filter row data
            $filteredRow = [];
            foreach ($validIndices as $index) {
                $filteredRow[] = $rowData[$index] ?? '';
            }

            $row = array_combine($validHeader, $filteredRow);

            // Validate required fields
            foreach ($requiredFields as $field => $displayName) {
                if (empty(trim($row[$field] ?? ''))) {
                    $rowErrors[] = "{$displayName} is required";
                }
            }

            // Part number uniqueness
            if (!empty($row['part_number'])) {
                $partNumber = trim($row['part_number']);
                if (in_array($partNumber, $partNumbers)) {
                    $rowErrors[] = "Part number '{$partNumber}' is duplicated";
                } else {
                    $existing = products::where('part_number', $partNumber)->first();
                    if ($existing) {
                        $rowErrors[] = "Part number '{$partNumber}' already exists";
                    }
                    $partNumbers[] = $partNumber;
                }
            }

            if (!empty($rowErrors)) {
                $errors[] = "Row {$rowNumber}: " . implode(', ', $rowErrors);
                continue;
            }

            // Additional validation & create
            try {
                if (!empty($row['product_price']) && !is_numeric($row['product_price'])) {
                    $errors[] = "Row {$rowNumber}: Price must be numeric";
                    continue;
                }

                products::create([
                    'product_name' => $row['product_name'] ?? null,
                    'manufacturer_name' => $row['manufacturer_name'] ?? null,
                    'category' => $row['category'] ?? null,
                    'product_price' => $row['product_price'] ?? null,
                    'model_number' => $row['model_number'] ?? null,
                    'part_number' => $row['part_number'] ?? null,
                    'availability' => $row['availability'] ?? null,
                    'condition' => $row['condition'] ?? null,
                    'description' => $row['description'] ?? null,
                    'image' => $row['image'] ?? null,
                ]);

                $importedCount++;
            } catch (\Exception $e) {
                $errors[] = "Row {$rowNumber}: " . $e->getMessage();
                \Log::error("Import row {$rowNumber} failed: " . $e->getMessage());
            }
        }

        // Final response
        if (!empty($errors)) {
            $errorCount = count($errors);
            $message = $importedCount > 0 
                ? "{$importedCount} products imported successfully. {$errorCount} rows failed."
                : "No products imported. {$errorCount} rows failed.";
            
            return back()->with([
                'error' => $message,
                'import_errors' => $errors
            ]);
        }

        return back()->with('success', $importedCount . ' products imported successfully!');

    } catch (\Exception $e) {
        \Log::error('Import failed: ' . $e->getMessage());
        return back()->with([
            'error' => 'Import failed: ' . $e->getMessage(),
            'import_errors' => ['Import failed: ' . $e->getMessage()]
        ]);
    }
}




    public function showCategory()
    {
        $products = products::whereNotNull('category')->get();
        return Inertia::render('Admin/Category/ShowCategory', [
            'products' => $products,
        ]);       
    }


    

    public function editCategory($category)
    {
        
        $products = products::where('category', $category)->get();
        
        return inertia('Admin/Category/EditCategory', [
            'category' => $category,
            'products' => $products
        ]);
    }

    public function updateCategory(Request $request, $category)
    {
        $request->validate([
            'category_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($request->hasFile('category_image')) {

            $image = $request->file('category_image');
            $imageName = time() . '_' . Str::slug($category) . '.' . $image->extension();

            // Save image
            $image->move(public_path('assets/product'), $imageName);

            
            // 🔥 UPDATE ALL PRODUCTS OF THIS CATEGORY
            products::where('category', $category)->update([
                'image' => $imageName
            ]);

            return redirect()->route('products.categories.index')
                ->with('success', 'Category aur us category ke tamam products ki images update ho gayi hain!');
        }

        return back()->with('error', 'Image upload failed.');
    }



}
