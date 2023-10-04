<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\StoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//headers : 
//'Content-type' : 'application/json',
// Accept:application/json
// Authorization:'Bearer '+ Token this for protected routes
//body:
// each route has its own required body



//Public routes

Route::post('/login', [AuthController::class, 'login']);
Route::post('password/email', [AuthController::class, 'sendResetLinkEmail']);

//Protected routes

Route::middleware(['auth:api'])->group(function () {

    Route::get('logout', [AuthController::class, 'logout']);

    // API routes for Client model
    Route::controller(ClientController::class, 'clients')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/orders', 'getOrders');
        Route::get('/{id}/reciepts', 'getReciepts');
        Route::get('/{id}/address', 'getAddress');
        Route::post('/{id}/address', 'createAddress');
        Route::put('/{id}/address', 'updateAddress');
        Route::delete('/{id}/address', 'deleteAddress');
        Route::get('/{id}/stores', 'getStores');
        Route::get('/{id}/cards', 'getCards');
        Route::get('/{id}/rewards', 'getRewards');
    });

    // API routes for Card model
    Route::controller(CardController::class, 'cards')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/store', 'getStore');
        Route::get('/{id}/client', 'getClient');
        Route::get('/{id}/rewards', 'getRewards');
    });

    // API routes for Order model
    Route::controller(OrderController::class, 'orders')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/client', 'getClient');
        Route::get('/{id}/reciept', 'getReciept');
        Route::get('/{id}/store', 'getStore');
        Route::get('/{id}/products', 'getProducts');
        Route::post('/{id}/products', 'attachProduct');
        Route::put('/{id}/products/{productId}', 'updateProduct');
        Route::delete('/{id}/products/{productId}', 'detachProduct');
    });

    // API routes for Product model
    Route::controller(ProductController::class, 'products')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/store', 'getStore');
        Route::get('/{id}/orders', 'getOrders');
        Route::get('/{id}/photos', 'getPhotos');
    });

    // API routes for Reciept model
    Route::controller(RecieptController::class, 'reciepts')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/order', 'getOrder');
    });

    // API routes for Reward model
    Route::controller(RewardController::class, 'rewards')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/card', 'getCard');
    });

    // API routes for Store model
    Route::controller(StoreController::class, 'stores')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{id}', 'show');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
        Route::get('/{id}/address', 'getAddress');
        Route::post('/{id}/address', 'createAddress');
        Route::put('/{id}/address', 'updateAddress');
        Route::delete('/{id}/address', 'deleteAddress');
        Route::get('/{id}/clients', 'getClients');
        Route::get('/{id}/clients_with_cards', 'getClientsWithCards');
        Route::get('/{id}/products', 'getProducts');
        Route::get('/{id}/orders', 'getOrders');
        Route::get('/{id}/reciepts', 'getReciepts');
    });
});
