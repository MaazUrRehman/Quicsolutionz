<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\MailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [PagesController::class, 'homeView'])->name('home');
Route::get('/aboutus', [PagesController::class, 'aboutView'])->name('aboutus');
Route::get('/products-page', [PagesController::class, 'productsView'])->name('products-page');
Route::get('/request-quote', [PagesController::class, 'requestQuoteView'])->name('requestquote');
Route::get('/product/{id}', [PagesController::class, 'productDetailsView'])->name('product-details');
Route::get('/request-quote-for-product/{product}', [PagesController::class, 'requestQuoteForProduct'])->name('requestQuoteForProduct');

Route::get('/load-more-products', [PagesController::class, 'loadMoreProducts']);
Route::get('/get-products-by-manufacturer', [PagesController::class, 'getProductsByManufacturer']);

Route::get('/load-more-products-products', [PagesController::class, 'loadMoreProductsForProducts']);
Route::get('/get-products-by-manufacturer-products', [PagesController::class, 'getProductsByManufacturerForProducts']);

Route::get('/load-more-recommended-products', [PagesController::class, 'loadMoreRecommendedProducts']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/manufacturers', [ManufacturerController::class, 'index'])->name('manufacturers.index');
    Route::get('/manufacturers/create', [ManufacturerController::class, 'create'])->name('manufacturers.create');
    Route::post('/manufacturers', [ManufacturerController::class, 'store'])->name('manufacturers.store');
    Route::get('/manufacturers/{manufacturer}', [ManufacturerController::class, 'show'])->name('manufacturers.show');
    Route::get('/manufacturers/{manufacturer}/edit', [ManufacturerController::class, 'edit'])->name('manufacturers.edit');
    Route::put('/manufacturers/{manufacturer}', [ManufacturerController::class, 'update'])->name('manufacturers.update');
    Route::delete('/manufacturers/{manufacturer}', [ManufacturerController::class, 'destroy'])->name('manufacturers.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/products/addexcel', [ProductsController::class, 'createExcel'])->name('products.addexcel');

    Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductsController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductsController::class, 'store'])->name('products.store');
    Route::get('/products/{product}', [ProductsController::class, 'show'])->name('products.show');
    Route::get('/products/{product}/edit', [ProductsController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductsController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductsController::class, 'destroy'])->name('products.destroy');

    
    
    Route::get('/categories', [ProductsController::class, 'showCategory'])->name('products.categories.index');
    Route::get('/categories/{category}/edit', [ProductsController::class, 'editCategory'])->name('products.categories.edit');
    Route::put('/categories/{category}', [ProductsController::class, 'updateCategory'])->name('products.categories.update');
    
    Route::post('/products/import', [ProductsController::class, 'import'])->name('products.import');

});

Route::post('/send-direct-request-quote', [MailController::class, 'sendDirectRequestQuote'])->name('sendDirectRequestQuote');
Route::post('/send-product-request-quote', [MailController::class, 'sendProductRequestQuote'])->name('sendProductRequestQuote');

require __DIR__.'/auth.php';
